/*
  implement database of item to meet requirements
  
  Basic
  - item จะต้องมี Name, Description, Original Price, Selling Price, Start/End selling date
  - เมื่อ User ซื้อ Item แล้วจะได้รับเป็น Code(โดย code อาจถูกบันทึกไว้ล่วงหน้า หรือ อาจถูกสร้างหลังจากซื้อ ก็ได้)
  - item อาจจถูกขายในหลายราคา เช่นปกติ ราคา 150 บาท เดือน มกราคม อาจจัดโปรลดราคาเป็น 100 บาท ก็ได้

  Bonus
  - item เป็นแบบ shared stock (ไม่ว่าซื้อ item ในราคาไหนจะต้องใช้ stock ของ code ที่เดียวกัน)
  - item อาจถูกขายแบบ Bundle เช่นขาย ตั้๋วหนังคู่กับป๊อบคอน หรือขาย Starbucks 2 ใบในราคาถูกว่าปกติ

  Note: 
  - สร้าง database ในรูปแบบของ model จาก "sequelize"
*/

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
);

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
}
);