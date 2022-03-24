import express from 'express';
import jwt from '../util/jwt.js'
import sequelize from '../db.js';
const { Op } = require('@sequelize/core');
const { wallet, exchange } = sequelize.models
const router = express.Router();

router.post('/', jwt.verifyAdmin, async (req, res) => {
   try {
      await wallet.create(req.body)
      res.status(200).send("Created wallet successfully")
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

router.put('/', jwt.verifyAdmin, async (req, res) => {
   try {
      const result = await wallet.update(req.body, {
         where: {
            userUsername: req.body.userUsername,
            coinName: req.body.coinName
         }
      })
      if (result) res.status(200).send("Updated wallet successfully")
      else res.status.send("Nothing has updated")
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

router.get('/', jwt.verifyAdmin, async (req, res) => {
   try {
      let result
      if (req.query) {
         result = await wallet.findOne({
            where: req.query
         })
      } else {
         result = await wallet.findAll()
      }
      res.status(200).send(result)
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

router.post('/transfer', async (req, res) => {
   try {
      const { srcCoinName, srcBalance, desCoinName, desUsername } = req.body

      const srcWallet = await wallet.findOne({
         where: {
            coinName: srcCoinName,
            userUsername: req.user.username
         }
      })

      if (!srcWallet) return res.status(404).send('Source wallet not found')
      if (srcBalance > srcWallet.balance) return res.status(400).send('Not enough balance!')

      const desWallet = await wallet.findOne({
         where: {
            coinName: desCoinName,
            userUsername: desUsername
         }
      })

      if (!desWallet) return res.status(404).send('Destination wallet not found')

      const findExchange = await exchange.findOne({
         where: {
            [Op.and]: [
               {
                  primaryCoin: srcCoinName,
                  secondaryCoin: desCoinName
               },
               {
                  primaryCoin: desCoinName,
                  secondaryCoin: srcCoinName
               }
            ]
         }
      })

      let rate
      if (!findExchange) return res.status(404).send('Exchange not found')
      if (findExchange.primaryCoin === srcCoinName) rate = findExchange.rate
      else if (findExchange.secondaryCoin === srcCoinName) rate = 1 / findExchange.rate

      srcWallet.balance = srcWallet.balance - srcBalance
      desWallet.balance = desWallet.balance + (srcBalance * rate)

      await srcWallet.save()
      await desWallet.save()

      res.status(200).send("Tranfered completed")
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

export default router