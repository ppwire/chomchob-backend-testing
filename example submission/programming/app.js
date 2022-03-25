import express from 'express'
import auth from './routes/auth.js'
import user from './routes/user.js'
import coin from './routes/coin.js'
import wallet from './routes/wallet.js'
import exchange from './routes/exchange.js'
import jwt from './util/jwt.js'
import 'dotenv/config'

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/auth', auth)
app.use('/user', user)
app.use('/coin', jwt.authenticateToken, coin)
app.use('/wallet', jwt.authenticateToken, wallet)
app.use('/exchange', jwt.authenticateToken, exchange)
export default app
