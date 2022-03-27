import sequelize from "../db.js";
import Sequelize from "sequelize";

const Promotion = sequelize.define('promotion', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
   rate: {
      type: Sequelize.FLOAT,
      allowNull: false
   },
   startDate: {
      type: Sequelize.DATE,
      allowNull: false
   },
   endDate: {
      type: Sequelize.DATE,
      allowNull: false
   }
})

export default Promotion;