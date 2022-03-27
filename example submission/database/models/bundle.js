import sequelize from "../db.js";
import Sequelize from 'sequelize';

const Bundle = sequelize.define('bundle', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
   description: {
      type: Sequelize.STRING
   },
   price: {
      type: Sequelize.INTEGER,
   }
})

export default Bundle