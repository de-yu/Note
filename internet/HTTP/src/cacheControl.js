

export default function loadCache(app) {
  app.get('/cache', (req, res) => {
  

    const data = {
      data: 'hi'
    }
  
    res.setHeader('Cache-Control', 'private,max-age=20');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  })
  

  app.get('/cache/auth', (req, res) => {
  
    
    if(req.headers['if-none-match'] === '20') {
      res.writeHead(304);
      res.end();
      return
    }

    const data = {
      data: 'hi'
    }
  
    res.setHeader('Cache-Control', 'private,max-age=20,no-cache');
    res.setHeader('ETag', '20');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  })
  

  // POST max-age 無效
  app.post('/cache', (req, res) => {
    

    const data = {
      data: 'hi'
    }
  
    res.setHeader('Cache-Control', 'max-age=20');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  })
}