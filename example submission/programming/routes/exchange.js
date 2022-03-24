import e from 'express';
import express from 'express';
import sequelize from '../db';
import jwt from '../util/jwt.js';
const { Op } = require('@sequelize/core');
const { exchange } = sequelize.models
const router = express.Router()

router.get('/', jwt.verifyAdmin, async (req, res) => {
   try {
      const findExchange = await exchange.findAll()
      res.send(findExchange)
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

router.put('/', jwt.verifyAdmin, async (req, res) => {
   try {
      const { primaryCoin, secondaryCoin, rate } = req.body

      const findExchange = await exchange.findOne({
         where: {
            [Op.and]: [
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
      res.status(200).send("Update exchange completed")
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

export default router