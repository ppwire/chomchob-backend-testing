import Sequelize from 'sequelize';
import 'dotenv/config'

const dbUser = process.env.DB_USER || 'root'
const dbPassword = process.env.DB_PW || 'example'

const sequelize = new Sequelize('product',
   dbUser, dbPassword, {
   dialect: 'mariadb',
   define: {
      freezeTableName: true,
      timestamps: true,
   },
})

export default sequelize