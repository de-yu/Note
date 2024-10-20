import express from 'express';
import cacheControl from './src/cacheControl.js';

const app = express();
const port = 3000;

cacheControl(app)

// 提供静态文件
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});