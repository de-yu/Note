import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode"; // 無加密功能

let token = jwt.sign({ data: 'data' }, 'key');

console.log(token)

console.log(jwtDecode(token))

console.log(jwt.verify(token, 'sss')) // 失敗會拋出 error

console.log(jwt.decode(token))