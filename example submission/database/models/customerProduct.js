import sequelize from "../db.js";
import Sequelize from 'sequelize'

const CustomerProduct = sequelize.define('customerProduct', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   }
})

export default CustomerProduct