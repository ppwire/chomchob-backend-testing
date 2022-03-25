import express from 'express';
import jwt from '../util/jwt.js'
import sequelize from '../db.js';
import 'dotenv/config'
const { user } = sequelize.models
const router = express.Router()

router.post('/', async (req, res) => {
   try {
      const { username, password } = req.body
      const userResult = await user.findOne({ where: { username: username } })
      if (!userResult) return res.status(400).send('Username or password is incorrect')
      if (!jwt.verifyPassword(userResult.password, password)) return res.status(400).send('Username or password is incorrect')
      const token = jwt.generateJwtToken({ username: userResult.username, role: userResult.role })
      return res.send(token)
   } catch (err) {
      console.error(err)
      return res.sendStatus(500)
   }
})

export default router;