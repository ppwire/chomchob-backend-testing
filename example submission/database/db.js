import Sequelize from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize('product',
   process.env.DB_USER, process.env.DB_PW, {
   dialect: 'mariadb',
   define: {
      freezeTableName: true,
      timestamps: true,
   },
})

export default sequelize