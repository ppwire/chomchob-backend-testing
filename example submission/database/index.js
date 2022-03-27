import express from 'express';
import sequelize from './db.js';
import Item from './models/item.js';
import Promotion from './models/promotion.js';
import Bundle from './models/bundle.js'
import Code from './models/code.js'
import Customer from './models/customer.js'
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }))

Promotion.hasOne(Item)
Item.belongsTo(Promotion)
Bundle.hasMany(Item)
Item.belongsTo(Bundle)

Code.belongsTo(Item, { as: 'item' })
Code.belongsTo(Bundle, { as: 'bundle' })
Code.belongsTo(Customer, { as: 'customer' })

sequelize.sync({ force: true })

app.get('/', (req, res) => {
   res.send('test')
})

app.listen(port, () => {
   console.log('server is listening on port ' + port)
})