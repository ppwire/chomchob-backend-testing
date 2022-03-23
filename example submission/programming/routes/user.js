import express from 'express';
import User from '../models/user.js'
import crypto from 'crypto'
import 'dotenv/config'
const user = express.Router()

user.post('/', async (req, res) => {
   const { username, password } = req.body
   const isDuplicate = await User.findOne({
      where: {
         username: username,
         isActive: true
      }
   })
   if (isDuplicate)  return res.status(400).send('Duplicate username')
   const hashPassword = crypto.scryptSync(password, process.env.SALT, 20).toString(`hex`)
   await User.create({
      username: username,
      password: hashPassword
   })
   res.status(200).send('Created user successfully')
})

user.get('/', async (req, res) => {
   const result = await User.findAll()
   res.send(result)
})
export default user;