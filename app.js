const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');

    res.write('<head><title>Enter message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"> <input type="text" name="message" > <button type="submit">Send</button> </form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsed Body: ', parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.text', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  if (url === '/hello') {
    res.setHeader('Content-Type', 'application/json');
    res.write('{"name":"HuynhVang"}');
    return res.end();
  }
  //process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');

  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
