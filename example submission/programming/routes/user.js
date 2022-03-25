import express from 'express';
import sequelize from '../db.js';
import crypto from 'crypto'
import jwt from '../util/jwt.js'
import 'dotenv/config'
const router = express.Router()
const { user } = sequelize.models

router.post('/', async (req, res) => {
   try {
      const { username, password, role } = req.body
      const isDuplicate = await user.findOne({
         where: {
            username: username,
         }
      })
      if (isDuplicate) return res.status(400).send('Duplicate username')
      const hashPassword = crypto.scryptSync(password, process.env.SALT, 20).toString(`hex`)
      await user.create({
         username: username,
         password: hashPassword,
         role: (role) ? role : 'user'
      })
      return res.status(200).send('Created user successfully')
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

router.get('/', jwt.authenticateToken, jwt.verifyAdmin, async (req, res) => {
   try {
      const result = await user.findAll()
      return res.send(result)
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})
export default router;