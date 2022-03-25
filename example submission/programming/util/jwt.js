import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto'
import sequelize from '../db.js'
import 'dotenv/config'

const { user } = sequelize.models

export default {
   generateJwtToken(key) {
      return jsonwebtoken.sign(key, process.env.SECRET, {
         expiresIn: "1h"
      })
   },

   authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split('Bearer ')[1]
      if (token == null) return res.sendStatus(401)
      jsonwebtoken.verify(token, process.env.SECRET, (err, user) => {
         console.log(err)
         if (err) return res.sendStatus(403)
         req.user = user
         next()
      })
   },



   verifyAdmin(req, res, next) {
      if (req.user.role !== 'admin') return res.sendStatus(403)
      const findUser = user.findOne({ where: { username: req.user.username, isActive: 1 } })
      if (!findUser) return res.sendStatus(404)
      next()
   },

   verifyPassword(validPassword, password) {
      const hashPassword = crypto.scryptSync(password, process.env.SALT, 20).toString(`hex`)
      console.log(validPassword)
      console.log(hashPassword)
      return validPassword === hashPassword
   }
}