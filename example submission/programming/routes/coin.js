import express from 'express';
import sequelize from '../db.js';
import jwt from '../util/jwt.js'
const { coin } = sequelize.models
const router = express.Router();

router.post('/', jwt.verifyAdmin, async (req, res) => {
   try {
      await coin.create(req.body)
      res.status(200).send('Created coin successfully')
   } catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

export default router