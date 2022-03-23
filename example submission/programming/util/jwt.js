import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto'
import 'dotenv/config'

export default {
   generateJwtToken(key) {
      return jsonwebtoken.sign(key, process.env.SECRET)
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
   verifyPassword(validPassword, password) {
      const hashPassword = crypto.scryptSync(password, process.env.SALT, 20).toString(`hex`)
      console.log(validPassword)
      console.log(hashPassword)
      return validPassword === hashPassword
   }
}