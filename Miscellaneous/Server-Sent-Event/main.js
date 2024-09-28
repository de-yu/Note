import express from 'express';

const app = express();
const port = 3000;

app.get('/events', (req, res) => {

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');


  res.write('data: Connection established\n\n');

  // 每隔 5 秒發送一次
  const intervalId = setInterval(() => {
    const message = `data: Server time is ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 5000);

  // 斷開連結
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// 提供静态文件
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});