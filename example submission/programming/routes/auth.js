import express from 'express';
import jwt from '../util/jwt.js'
import User from '../models/user.js'
import 'dotenv/config'

const auth = express.Router()

auth.post('/', async (req, res) => {
   const { username, password } = req.body
   const user = await User.findOne({ where: { username: username } })
   if (!user) return res.status(400).send('Username or password is incorrect')
   if (!jwt.verifyPassword(user.password, password)) return res.status(400).send('Username or password is incorrect')
   const token = jwt.generateJwtToken(username)
   res.send(token)
})

export default auth;