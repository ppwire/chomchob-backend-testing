# chomchob-backend-testing

ขอบคุณที่สนใจร่วมงานกับ ChomCHOB
ทางเรามีโจทย์ให้ทำ 2 ข้อเพื่อทดสอบ coding skill ของคุณ

เมื่อคุณทำโจทย์นี้เส็จแล้วให้ทำการสร้าง repo ตามโครงสร้างในโฟลเดอร์ "example submission" บน github ส่วนตัวของคุณ 
แล้วส่งลิ้ง repo มาที่ support@chomchob.com (Subject: Backend Engineer Application (2018))

โจทย์จะมี 2 Part คือ
1. [Programming](#programming)
2. [Database](#database)

---

# Note
- มีเวลาทำโจทย์ 7 วันหลังจากได้รับ email 

---

# Programming

  - สร้าง method ใน Person class เพื่อหา friends of friends


  > **example:**
  >
  > B เป็นเพื่อนของ A และ C เป็นเพื่อนของ B แล้ว C คือ friends of friends ของ A
  >
  > `(A) <-> (B) <-> (C)`

  **Bonus**
  - TDD 
  
  **Hint**
  - ให้ใช้ Node.js (Javascript) ในการทำโจทย์เท่านั้น โดยห้ามลง lib เพิ่มเติม
  - Syntax ไม่ต้องถูกต้อง 100% ก็ได้
  - แก้ไข code ได้ทั้ง class ไม่จำกัดแค่ method
  - ถ้า A เป็นเพื่อนของ B แล้ว B ก็เป็นเพื่อนของ A ด้วย `(A) <-> (B)` 
  - เพื่อนของ A ต้องไม่เป็น เพื่อนของเพื่อนของ A ตัวอย่างเช่น 
    > - B เป็นเพื่อนของ A `(A) <-> (B)`
    > - D เป็นเพื่อนของ B และ A `(A) <-> (D)`, `(B) <-> (D)`
    > - ดั้งนั้น D ต้องไม่เป็นเพื่อนของเพื่อนของ A
    > - ![Alt text](https://fs.chomchob.com/file/image?path=/admin/upload/2018-06-08/dfd301fb-a2e7-43b1-addb-d119ac2a3e02)
  ```js
  class Person {
  
    constructor() {
      this.name = ''
      this.friends = []
      // variable เพิ่มเติม(ถ้ามี) ...
    }

    friendsOfFriends() {
      return [] // array ชื่อเพื่อนของเพื่อนทั้งหมด
    }

    // method เพิ่มเติม(ถ้ามี) ...
  }
  ```


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

  - สร้าง database ในรูปแบบของ model จาก ["sequelize"](https://github.com/sequelize/sequelize)

  
  **Example Model**

  ```js
  // Store User
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

  // Store User credit card 
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

