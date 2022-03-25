import express from 'express';
import sequelize from './db.js';
import Item from './models/item.js';
import Product from './models/product.js';
import Customer from './models/customer.js'
import CustomerProduct from './models/customerProduct.js'
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }))

Item.hasMany(Product)
Product.belongsTo(Item)

Customer.belongsToMany(Product, { through: CustomerProduct })
Product.belongsToMany(Customer, { through: CustomerProduct })

sequelize.sync({ force: true })

app.get('/', (req, res) => {
   res.send('test')
})

app.listen(port, () => {
   console.log('server is listening on port ' + port)
})