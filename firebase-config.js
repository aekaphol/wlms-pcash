/*
  ไฟล์นี้ใช้สำหรับเชื่อม WL-Cash เข้ากับ Firebase (Firestore)
  เพื่อให้เปิดใช้งานจากหลายเครื่อง/หลายมือถือแล้วเห็นข้อมูลชุดเดียวกัน

  วิธีตั้งค่า (ทำครั้งเดียว):
  1) ไปที่ https://console.firebase.google.com แล้วสร้างโปรเจกต์ใหม่ (กด "Add project")
  2) ในเมนูซ้าย เลือก Build > Firestore Database > "Create database"
     - เลือกโหมด "Production mode" แล้วเลือก location ที่ใกล้ (เช่น asia-southeast1)
  3) ไปที่ Project settings (รูปเฟือง) > General > เลื่อนลงมาที่ "Your apps"
     กด ไอคอน "</>" (Web) เพื่อสร้างแอปเว็บใหม่ ตั้งชื่ออะไรก็ได้ เช่น "wl-cash"
     ระบบจะโชว์โค้ด firebaseConfig ให้ - คัดลอกค่าทั้งหมดมาแทนที่ด้านล่างนี้
  4) ไปที่ Firestore Database > แท็บ "Rules" แล้ววางกฎจากไฟล์ firestore.rules
     ที่แนบมาให้ (หรือดูวิธีเต็มใน README.md) แล้วกด "Publish"
  5) บันทึกไฟล์นี้ แล้ว deploy เว็บใหม่อีกครั้ง (Netlify/Vercel/GitHub Pages/Firebase Hosting)

  ถ้ายังไม่แก้ไขค่าด้านล่าง (ยังเป็น "YOUR_...") แอปจะทำงานแบบเก็บข้อมูล
  ในเครื่องเดียวตามปกติ (localStorage) โดยไม่มีการซิงก์ข้ามเครื่อง
*/
const firebaseConfig = {
  apiKey: "AIzaSyBGg8jeB9_7U8AT0-XwZt4PveNFN0zuOgA",
  authDomain: "wlms-pcash.firebaseapp.com",
  projectId: "wlms-pcash",
  storageBucket: "wlms-pcash.firebasestorage.app",
  messagingSenderId: "944385840597",
  appId: "1:944385840597:web:f6218d707d5c3557ce595c",
  measurementId: "G-H6VS7VY8ZM"
};
