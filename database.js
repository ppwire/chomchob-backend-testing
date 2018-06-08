// example model
const User = sequelize.define('User',{
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
  },{
    classMethods: {
      associate: function(models) {
        User.hasMany(UserCard, { foreignKey: 'user_id' })
      }
    }
  }
)

const UserCard = sequelize.define('UserCard',{
  id: Sequelize.STRING,
  user_id: Sequelize.STRING,
  card_number: Sequelize.STRING,
  cvv: Sequelize.INTEGER
},{
  classMethods: {
    associate: function(models) {
      UserCard.belongsTo(User, { foreignKey: 'user_id' })
    }
  }
})