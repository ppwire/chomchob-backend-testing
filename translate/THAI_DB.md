---

# Database

สมมติสถานการณ์ว่า 
คุณได้รับมอบหมายให้ออกแบบ Database ของระบบขาย code item สำหรับเกมต่างๆ 
ซึ่งคอยให้บริการแก่ลูกค้าที่ต้องการเข้ามาซื้อ code ไปเติมในเกม

  **โดยมีรายละเอียดดังนี้**
  
  - item ที่ขายจะต้องมี ชื่อสินค้า, รายละเอียดสินค้า, ราคาขาย, วันที่เปิดขาย, วันที่เลิกขาย
  - เมื่อลูกค้าซื้อ Item แล้วจะได้รับเป็น code (โดย code อาจถูกบันทึกไว้ล่วงหน้า หรือ อาจถูกสร้างหลังจากซื้อ ก็ได้)
  - item สามารถจัดโปรโมชั่นลดราคาในช่วงเวลาที่กำหนดได้ เช่น ปกติ ราคา 150 บาท จัดโปรเดือนมกราคม ลดราคาเป็น 100 บาท

  **Bonus**

  - item เป็นแบบ shared stock (ไม่ว่าซื้อ item ในราคาไหนจะต้องใช้ stock ของ code ที่เดียวกัน) เช่น มี ไอเท็ม A และ ไอเท็ม B อยู่ในระบบ หากมีลูกค้ามาทำการซื้อ A หรือ B ก็ตาม code ที่ลูกค้าได้รับ จะถูกดึงมาจาก stock เดียวกัน
  - item อาจถูกขายแบบ Bundle เช่น ขาย สกินตัวละครพร้อมกันสองตัวในราคาพิเศษ  หรือขาย กล่องสุ่มไอเท็ม 5 กล่อง ในราคาถูกกว่าปกติ

  **Hint**

  - สร้าง database ในรูปแบบของ model จาก [sequelize](https://github.com/sequelize/sequelize)


  **Example Model**

  ```js
  const User = sequelize.define('User', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
  },{
    classMethods: {
      associate: function(models) {
        User.hasMany(UserCard, { foreignKey: 'user_id' })
      }
    }
  })

  const UserCard = sequelize.define('UserCard', {
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
  ```