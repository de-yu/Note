
export default function cookieControl(app) {

  app.get('/cookie', (req, res) => {
    const data = {
      data: 'hi'
    }
    // set-cookie 會在下個 http 中自動帶入
    // httpOnly 會使 docuement.cookie 無法被 js 讀取
    // maxAge 被轉換成 expire 單位是毫秒
    res.cookie('token', 'tokenValue', { maxAge:3600   });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
    })
}