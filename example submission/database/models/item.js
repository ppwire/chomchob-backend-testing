import sequelize from '../db.js'
import Sequelize from 'sequelize'

const Item = sequelize.define('item', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   description: {
      type: Sequelize.STRING,
      allowNull: true
   },
   price: {
      type: Sequelize.INTEGER,
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

export default Item