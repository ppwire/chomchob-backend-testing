# แนวคิดการออกแบบ Database

- relation ระหว่าง customer กับ product เป็น Many to many เพราะลูกค้าหลายคนก็สามารถซื้อสินค้าได้หลายชิ้น
- ในส่วนของข้อมูลของสินค้าจะแยกออกเป็น 2 table คือ item และ product เป็น One to Many โดย ใน item จะเก็บชื่อและคำอธิบายของสินค้าส่วน product จะเก็บราคาและวันที่ในที่เริ่มขายและหยุดขาย ทำให้สามารถออก product ที่เป็นสินค้าชิ้นเดิมแต่เปลี่ยนราคาตาม promotion และเปลี่ยน startDate endDate ให้เป็นช่วงที่เป็น promotion
