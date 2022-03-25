import sequelize from "../db.js";
import Sequelize from "sequelize"

const Customer = sequelize.define('customer', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
   name: {
      type: Sequelize.STRING
   }
})

export default Customer
