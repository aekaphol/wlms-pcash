# WL-Cash — ใบเบิกเงินสดย่อย เวียงหลวง

เว็บแอปหน้าเดียว (ไม่ต้อง build) ใช้งานได้หลายเครื่องพร้อมกันผ่าน Firebase (Firestore)
deploy ได้ทั้ง Netlify, Vercel, GitHub Pages หรือ Firebase Hosting

---

## ✅ ต้องทำก่อน: ตั้งค่า Firebase เพื่อให้ใช้ได้หลายเครื่อง

ถ้าข้ามขั้นตอนนี้ แอปจะยังใช้งานได้ปกติ แต่ข้อมูลจะถูกเก็บแยกในแต่ละเครื่อง (ไม่ซิงก์กัน)

1. ไปที่ **https://console.firebase.google.com** → กด **Add project** → ตั้งชื่อ เช่น `wl-cash` → สร้างโปรเจกต์
2. เมนูซ้าย → **Build > Firestore Database** → **Create database**
   - เลือก **Production mode**
   - เลือก location ใกล้ไทย เช่น `asia-southeast1`
3. ไปที่ ⚙️ **Project settings > General** → เลื่อนลงหา "Your apps" → กดไอคอน **`</>`** (Web)
   - ตั้งชื่อแอป เช่น `wl-cash-web` → กด Register app
   - ระบบจะโชว์โค้ด `firebaseConfig` ให้ **คัดลอกทั้งหมด**
4. เปิดไฟล์ **`firebase-config.js`** ในโฟลเดอร์นี้ → วางค่าที่คัดลอกมาแทนที่ค่า `YOUR_...` ทั้งหมด → บันทึกไฟล์
5. กลับไปที่ Firestore Database → แท็บ **Rules** → คัดลอกเนื้อหาจากไฟล์ **`firestore.rules`** (แนบมาให้แล้ว) วางแทนของเดิม → กด **Publish**
6. Deploy เว็บ (ดูวิธีด้านล่าง) — เสร็จแล้วเปิดแอปจากเครื่องไหนก็ได้ ข้อมูลจะเป็นชุดเดียวกันทั้งหมด

**สังเกตได้จากป้ายมุมบนของแอป**: `☁️ ซิงก์หลายเครื่อง` = เชื่อมต่อสำเร็จ, `📴 เครื่องเดียว` = ยังไม่ได้ตั้งค่า

### ข้อมูลอะไรบ้างที่ซิงก์
- รายการวัตถุดิบ (master list) ที่เพิ่มจากเครื่องไหน จะไปโผล่ทุกเครื่อง
- ใบเบิกแต่ละวัน (ทั้งฉบับร่างและที่ยืนยันแล้ว) ซิงก์อัตโนมัติทุกครั้งที่แก้ไข/กดยืนยัน
- ถ้าเปิดพร้อมกัน 2 เครื่องแล้วแก้ไขวันเดียวกัน ระบบจะใช้ข้อมูลที่ "บันทึกล่าสุด" เป็นหลัก

### 🔒 อัปเกรดความปลอดภัย (ถ้าต้องการ)
กฎใน `firestore.rules` ที่แนบมาเปิดให้ทุกคนที่มีค่า config อ่าน/เขียนข้อมูลได้ (ป้องกันด้วยรหัส PIN หน้าแอปแทน)
เหมาะกับการใช้งานภายในทีมที่ไว้ใจกัน ถ้าต้องการปลอดภัยขึ้น สามารถเพิ่ม Firebase Authentication
(เช่น Anonymous Auth) แล้วแก้กฎเป็น `allow read, write: if request.auth != null;` — เป็นขั้นตอนขั้นสูง
ถามผู้เชี่ยวชาญ/นักพัฒนาเพิ่มเติมได้หากต้องการ

---

## 🚀 วิธี Deploy

เลือก platform ใดก็ได้ 1 ที่ (หรือจะ deploy ไว้หลายที่พร้อมกันก็ได้ เพราะข้อมูลอยู่บน Firebase ไม่ได้ผูกกับ host)

### 1) Netlify (ง่ายที่สุด — ลากวาง)
1. ไปที่ **https://app.netlify.com/drop**
2. ลากทั้งโฟลเดอร์ `wl-cash` วางลงในหน้านั้น
3. รอสักครู่ ระบบจะให้ลิงก์เว็บไซต์มาใช้งานได้ทันที

### 2) GitHub (เก็บโค้ด + เปิด GitHub Pages ได้ฟรี)
1. ไปที่ **https://github.com/new** สร้าง repository ใหม่ (public หรือ private ก็ได้) เช่น `wl-cash`
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้เข้า repo (ลากไฟล์วางในหน้าเว็บ GitHub ได้เลย ไม่ต้องใช้ git command ก็ได้)
   - หรือใช้คำสั่ง:
     ```
     git init
     git add .
     git commit -m "WL-Cash"
     git branch -M main
     git remote add origin https://github.com/USERNAME/wl-cash.git
     git push -u origin main
     ```
3. เปิดใช้งานเว็บฟรีผ่าน GitHub Pages: ไปที่ repo → **Settings > Pages**
   → Source เลือก **Deploy from a branch** → Branch เลือก **main** / folder **`/ (root)`** → Save
4. รอ 1-2 นาที จะได้ลิงก์ประมาณ `https://USERNAME.github.io/wl-cash/`

> ขั้นตอนนี้ยังใช้เชื่อมกับ Vercel ได้ด้วย (ดูข้อ 3) โดย import repo เดียวกัน

### 3) Vercel
1. ไปที่ **https://vercel.com** → เข้าสู่ระบบ (เชื่อมกับ GitHub ได้เลย)
2. กด **Add New… > Project** → เลือก repo `wl-cash` ที่อัปโหลดไว้ในขั้นตอน GitHub ด้านบน
3. Framework Preset เลือก **Other** (เป็นเว็บ static ธรรมดา ไม่ต้อง build)
   - Build Command: ว่างไว้
   - Output Directory: ว่างไว้ (หรือ `.`)
4. กด **Deploy** รอสักครู่จะได้ลิงก์ `https://wl-cash-xxxx.vercel.app`

**หรือ deploy ด้วย Vercel CLI** (ไม่ต้องผ่าน GitHub):
```
npm install -g vercel
cd wl-cash
vercel
```
ตอบคำถามตามค่าเริ่มต้นได้เลย (ไม่มี build step)

### 4) Firebase Hosting (deploy คู่กับฐานข้อมูลที่ตั้งไว้ในโปรเจกต์เดียวกัน)
1. ติดตั้งเครื่องมือ (ครั้งแรกครั้งเดียว):
   ```
   npm install -g firebase-tools
   firebase login
   ```
2. ในโฟลเดอร์ `wl-cash` (มีไฟล์ `firebase.json` แนบไว้ให้แล้ว) รันคำสั่ง:
   ```
   cd wl-cash
   firebase use --add
   ```
   แล้วเลือกโปรเจกต์ Firebase ที่สร้างไว้ตอนตั้งค่า Firestore ด้านบน
3. Deploy:
   ```
   firebase deploy --only hosting
   ```
4. จะได้ลิงก์ประมาณ `https://YOUR_PROJECT_ID.web.app`

> ถ้าต้อง deploy กฎ Firestore ด้วย ใช้คำสั่ง `firebase deploy --only firestore:rules`

---

## หมายเหตุการใช้งาน
- รายการวัตถุดิบเริ่มต้นดึงมาจากไฟล์ Excel ที่ให้มา และจะเพิ่มรายการใหม่ให้อัตโนมัติเมื่อพิมพ์/เลือกวัตถุดิบที่ยังไม่มีในระบบ (ซิงก์ขึ้นคลาวด์ให้ทุกเครื่องเห็นเหมือนกัน ถ้าตั้งค่า Firebase แล้ว)
- กด "ยืนยันบันทึก" แล้วจะล็อกข้อมูลของวันนั้น (ระบบจะยังให้แก้ไขวันเดิมได้ผ่านหน้าสรุปหากจำเป็น)
- รายงาน CSV จะรวมเฉพาะวันที่ "ยืนยันบันทึก" แล้วเท่านั้น เปิดไฟล์ด้วย Excel ได้โดยตรง (รองรับภาษาไทย)
- เข้าใช้งานด้วยรหัส PIN 4 หลัก (ตั้งไว้ในโค้ด `index.html` ค้นหาคำว่า `ACCESS_CODE`) เพื่อกันคนอื่นเปิดแอปโดยไม่ได้รับอนุญาต — รหัสนี้ทำงานแยกกันในแต่ละเครื่อง/เบราว์เซอร์
- ถ้ายังไม่ได้ตั้งค่า Firebase แอปจะยังใช้งานได้ปกติแบบเก็บข้อมูลในเครื่องเดียว (localStorage)

## ไอคอน "Add to Home Screen"
โฟลเดอร์นี้มีไอคอนแอป (ทำจากโลโก้เวียงหลวงที่ให้มา) และไฟล์ `manifest.webmanifest` พร้อมใช้งานแล้ว
- **iPhone (Safari)**: เปิดเว็บ → แตะปุ่มแชร์ → "เพิ่มไปยังหน้าจอโฮม" จะขึ้นไอคอนโลโก้ให้อัตโนมัติ
- **Android (Chrome)**: เปิดเว็บ → เมนู ⋮ → "เพิ่มไปยังหน้าจอโฮม" หรือจะมีป๊อปอัพ "ติดตั้งแอป" ขึ้นให้เอง
- ต้อง deploy ทั้งโฟลเดอร์ (รวมโฟลเดอร์ย่อย `icons/`, ไฟล์ `manifest.webmanifest`, `firebase-config.js`) ไม่ใช่แค่ไฟล์ `index.html` อย่างเดียว

## ไฟล์ในโฟลเดอร์นี้
| ไฟล์ | ใช้ทำอะไร |
|---|---|
| `index.html` | ตัวแอปทั้งหมด |
| `firebase-config.js` | ค่าเชื่อมต่อ Firebase (ต้องแก้ตามขั้นตอนด้านบน) |
| `firestore.rules` | กฎความปลอดภัยของฐานข้อมูล (นำไปวางใน Firebase Console หรือ deploy ด้วย CLI) |
| `firebase.json` | ไฟล์ตั้งค่าสำหรับ deploy ด้วย Firebase Hosting |
| `manifest.webmanifest` + `icons/` | ไอคอนสำหรับ Add to Home Screen |
