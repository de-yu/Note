## JWT

```

JWT : Json Web Token

基於 JSON 格式的安全令牌，用於在兩個系統之間傳遞經過驗證的信息。JWT 通常用於身份驗證和授權場景。它的結構由三個部分組成，每一部分之間用點 (.) 分隔

1. Header
分成兩個部分 加密演算法 ＆ token type 值一般是 JWT

2. Payload
jwt 主要傳遞的資料
預定義的（如 iss、exp、sub 等）或自定義的數據。
例如：{ "sub": "1234567890", "name": "John Doe", "admin": true }

3. Signature
簽名部分是為了確保令牌的完整性，防止數據被篡改。簽名是通過對 Header 和 Payload 進行編碼後，使用密鑰和指定的簽名算法生成的

例如：HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

secret是存放在伺服器端的秘密字串，最後將這三個部分串接再一起的字串進行加密演算法進行加密

```
