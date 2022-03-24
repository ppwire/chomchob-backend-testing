import express from 'express'
import auth from './routes/auth.js'
import user from './routes/user.js'
import coin from './routes/coin.js'
import jwt from './util/jwt.js'
import 'dotenv/config'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.get('/', (req, res) => {
   res.send('test')
})

app.use('/auth', auth)
app.use('/user', user)
app.use('/coin', jwt.authenticateToken, coin)
export default app
