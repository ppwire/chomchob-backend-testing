import Sequelize from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize('crypto',
   process.env.DB_USER, process.env.DB_PW, {
   dialect: 'mariadb',
   define: {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'create_at',
      updatedAt: 'update_at',
   },
   logging: false
});

sequelize.sync()

export default sequelize