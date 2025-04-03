# QR MENU FOR RESTAURANT

## Loyhaning maqsadi:🎯
- QR kodni skaner qilib restaurant menusiga o'tish

## Funksional talablar:
- Profilga kirish email va password orqali
- Foydalanuvchi email,name va password orqali royhattan o'tadi
- Har bir taom categoriyaga bog'lanishi kerak

## Nofunksional talablar:
- tezlik
- xavfsizlik
- kengaya oladigan

## Database models:
1. user:
    - id (INT),
    - name (String),
    - email (String),
    - password (String),
    - createdAt,
    - updateAt

2. category:
    - id (INT),
    - name (String),
    - createdAt
    - updateAt

3. food:
    - id (INT),
    - name (String),
    - price (Number),
    - description (String),
    - imageUrl (String),
    - categoryId (INT) (FK),
    - createdAt,
    - updateAt

4. orders:
    - userId (INT),
    - totalPrice (Number),
    - status (String ),
    - created_at (timestamp)

5. order_items:
    - orderId (INT),
    - foodId (INT),
    - quantity (INT),
    - subTotal (INT)

- user uchun register va login 
- schema user 
- user model uchun rol yoziladi
- order va order_items qo'shildi
