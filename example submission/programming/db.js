import Sequelize from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize('crypto',
   process.env.DB_USER, process.env.DB_PW, {
   host: process.env.DB_HOST || 'localhost',
   dialect: 'mariadb',
   define: {
      freezeTableName: true,
      timestamps: true,
   },
});

const Coin = sequelize.define('coin', {
   name: {
      primaryKey: true,
      type: Sequelize.STRING,
   }
})

const User = sequelize.define('user', {
   username: {
      type: Sequelize.STRING,
      primaryKey: true,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   },
   isActive: {
      type: Sequelize.TINYINT,
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

const Wallet = sequelize.define('wallet', {
   balance: {
      type: Sequelize.FLOAT
   }
})

const Exchange = sequelize.define('exchange', {
   primaryCoin: {
      type: Sequelize.STRING,
      primaryKey: true,
      comment: "The sourceCoin"
   },
   secondaryCoin: {
      type: Sequelize.STRING,
      primaryKey: true,
      comment: "The receiverCoin"
   },
   rate: {
      type: Sequelize.FLOAT
   }
})

User.belongsToMany(Coin, { through: Wallet })
Coin.belongsToMany(User, { through: Wallet })

sequelize.sync()

export default sequelize