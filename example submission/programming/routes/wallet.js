import express from 'express';
import jwt from '../util/jwt.js'
import sequelize from '../db.js';
import { Op } from 'sequelize'
const { wallet, exchange, coin } = sequelize.models
const router = express.Router();

router.post('/', jwt.verifyAdmin, async (req, res) => {
   try {
      await wallet.create(req.body)
      return res.status(200).send("Created wallet successfully")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.put('/', jwt.verifyAdmin, async (req, res) => {
   try {
      const { coinName, userUsername } = req.body

      const findCoin = await coin.findOne({
         where: {
            name: coinName
         }
      })

      if (!findCoin) return res.status(404).send("Coin is not exist")

      await wallet.update(req.body, {
         where: {
            userUsername: userUsername,
            coinName: coinName
         }
      })

      return res.status(200).send("Updated wallet successfully")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.get('/', jwt.verifyAdmin, async (req, res) => {
   try {
      let result
      if (Object.keys(req.query).length !== 0) {
         result = await wallet.findOne({
            where: req.query
         })
      } else {
         result = await wallet.findAll()
      }
      return res.status(200).send(result)
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.get('/myown', async (req, res) => {
   try {
      const result = await wallet.findOne({
         where: {
            userUsername: req.user.username
         }
      })
      return res.status(200).send(result)
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
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
            [Op.or]: [
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
      // primaryCoin is a source
      if (findExchange.primaryCoin === srcCoinName) rate = findExchange.rate
      // secondaryCoin is a source
      else if (findExchange.secondaryCoin === srcCoinName) rate = 1 / findExchange.rate

      srcWallet.balance = srcWallet.balance - srcBalance
      desWallet.balance = desWallet.balance + (srcBalance * rate)

      await srcWallet.save()
      await desWallet.save()

      return res.status(200).send("Tranfered completed")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

export default router