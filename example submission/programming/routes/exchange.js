import express from 'express';
import sequelize from '../db.js';
import { Op } from 'sequelize'
const { exchange } = sequelize.models
const router = express.Router()

router.get('/', async (req, res) => {
   try {
      const findExchange = await exchange.findAll()
      return res.send(findExchange)
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.patch('/', async (req, res) => {
   try {
      const { primaryCoin, secondaryCoin, rate } = req.body

      const findExchange = await exchange.findOne({
         where: {
            [Op.or]: [
               {
                  primaryCoin: primaryCoin,
                  secondaryCoin: secondaryCoin
               },
               {
                  primaryCoin: secondaryCoin,
                  secondaryCoin: primaryCoin
               }
            ]
         }
      })

      if (!findExchange) return res.sendStatus(404)

      if (findExchange.primaryCoin === primaryCoin) {
         findExchange.rate = rate
      } else {
         findExchange.rate = 1 / rate
      }
      await findExchange.save()
      return res.status(200).send("Update exchange completed")
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

export default router