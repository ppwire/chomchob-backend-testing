import express from 'express';
import sequelize from '../db.js';
import jwt from '../util/jwt.js'
const { coin, exchange } = sequelize.models
const router = express.Router();

router.post('/', jwt.verifyAdmin, async (req, res) => {
   try {
      const { name } = req.body
      const findNewCoin = await coin.findOne({
         where: {
            name: name
         }
      })
      if (findNewCoin) return res.status(400).send("Duplicate coin found")
      const findCoin = await coin.findAll()
      if (findCoin.length > 0) {
         for (const coin of findCoin) {
            await exchange.create({
               primaryCoin: name,
               secondaryCoin: coin.name,
               rate: 1
            })
         }
      }
      await coin.create(req.body)
      return res.status(200).send('Created coin successfully')
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.get('/', async (req, res) => {
   try {
      let result
      if (Object.keys(req.query).length !== 0) {
         result = await coin.findOne({
            where: req.query
         })
      } else {
         result = await coin.findAll()
         console.log('test')
      }
      return res.send(result)
   } catch (error) {
      console.error(err)
      return res.sendStatus(500)
   }
})

export default router