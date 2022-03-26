import express from 'express';
import jwt from '../util/jwt.js'
import sequelize from '../db.js';
import { Op } from 'sequelize'
const { wallet, exchange, coin, user } = sequelize.models
const router = express.Router();

//// admin stuff
router.post('/', jwt.verifyAdmin, async (req, res) => {
   try {
      await wallet.create(req.body)
      return res.status(200).send("Created wallet successfully")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.patch('/', jwt.verifyAdmin, async (req, res) => {
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

////////////////////////////////////////////////

//// user stuff

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

router.post('/myown', async (req, res) => {
   try {
      await wallet.create({
         userUsername: req.user.username,
         balance: 0,
         coinName: req.body.coinName
      })
      return res.status(200).send("Created wallet successfully")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.patch('/myown', async (req, res) => {
   try {
      const { coinName, balance } = req.body

      const findCoin = await coin.findOne({
         where: {
            name: coinName
         }
      })

      if (!findCoin) return res.status(404).send("Coin is not exist")

      console.log(balance)
      console.log(req.user.username)

      const findWallet = await wallet.findOne({
         where: {
            userUsername: req.user.username,
            coinName: coinName
         }
      })

      if (!findWallet) {
         await wallet.create({
            userUsername: req.user.username,
            coinName: coinName,
            balance: balance
         })
      } else {
         await wallet.update({
            balance: balance
         }, {
            where: {
               userUsername: req.user.username,
               coinName: coinName
            }
         })
      }

      return res.status(200).send("Updated wallet successfully")
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

      const desWallet = await wallet.findOne({
         where: {
            coinName: desCoinName,
            userUsername: desUsername
         }
      })

      if (!srcWallet) return res.status(400).send('Source wallet not found')
      if (srcBalance > srcWallet.balance) return res.status(400).send('Not enough balance!')

      //if destination user does not have wallet, then create one for them.
      if (!desWallet) {
         const findDesUser = await user.findOne({ where: { username: desUsername } })
         if (!findDesUser) return res.status(400).send('Destination wallet not found')
         const isDesCoinExist = await coin.findOne({
            where: {
               name: desCoinName
            }
         })
         if (!isDesCoinExist) return res.status(400).send('Coin not found')
         await wallet.create({
            coinName: desCoinName,
            userUsername: desUsername,
            balance: 0
         })
      }

      let rate = 1
      if (srcCoinName !== desCoinName) {
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

         if (!findExchange) return res.status(400).send('Exchange not found')
         // primaryCoin is a source
         if (findExchange.primaryCoin === srcCoinName) rate = findExchange.rate
         // secondaryCoin is a source
         else if (findExchange.secondaryCoin === srcCoinName) rate = 1 / findExchange.rate
      }

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