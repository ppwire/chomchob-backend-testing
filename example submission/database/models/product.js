import sequelize from "../db.js";
import Sequelize from "sequelize";

const Product = sequelize.define('product', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
   price: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   startDate: {
      type: Sequelize.DATE
   },
   endDate: {
      type: Sequelize.DATE
   }
})

export default Product;