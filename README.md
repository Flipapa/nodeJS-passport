# Practice: 使用 passport 實作登入系統
## 功能
- 搭配 mongoDB 儲存使用者資料
- 使用者可以註冊及登入
- 未登入使用者無法瀏覽 /dashboard 頁面
- 已登入使用者無法瀏覽及使用 /users/login 及 /users/register 功能

## 環境
- Node.js v10.15.0
- express v4.17.1
- express-handlebars v5.3.3
- mongoose v5.13.6
- passport v0.4.1
- passport-local v1.0.0
- express-session v1.17.2
- connect-flash v0.1.1
- bcrypt v5.0.1

### 安裝
1. 開啟終端機(Terminal)將此專案Clone至本機電腦
```
git clone https://github.com/Flipapa/nodeJS-passport.git
```
2. 進入存放此專案的資料夾
```
cd nodeJS-passport
```
3. 安裝 npm 套件
```
npm install
```
4. 啟動 mongoDB，並在本地建立 nodeJS-passport 資料庫
5. 啟動網頁伺服器
```
npm run dev
```
當 Terminal 出現以下文字表示成功連結本地伺服器
```
Express is listening on localhost:3000
```
6. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案