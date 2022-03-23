import sequelize from "../db.js";
import Sequelize from "sequelize";

const User = sequelize.define('user', {
   username: {
      type: Sequelize.STRING,
      field: 'username',
      primaryKey: true,
   },
   password: {
      type: Sequelize.STRING,
      field: 'password',
      allowNull: false
   },
   isActive: {
      type: Sequelize.TINYINT,
      field: 'is_active',
      defaultValue: 1,
      allowNull: false
   },
   role: {
      type: Sequelize.STRING,
      field: 'role',
      defaultValue: "user",
      allowNull: false
   },
})

export default User