const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', function(req, res) {
  switch (req.url) {
    case '/index':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(`./templates/index.html`, 'utf-8', (err, data) =>{
        res.write(data);
        res.end();
      })
      break;
    case '/login':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(`./templates/login.html`, 'utf-8', (err, data) =>{
        res.write(data);
        res.end();
      })
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("404 not found");
      res.end();
      break;
    }
});
server.listen(8080);
console.log("server listening ...");