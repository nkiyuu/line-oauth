'use strict'

import http from 'http';
import url from 'url';
import fs from 'fs';
import { Server } from 'net';

const httpServer = http.createServer();

// HTMLを返す
function renderHTML(res, html) {
  const template = fs.readFile(`./template/${html}`, 'utf-8', (err, data) => {
    res.writeHead(200, {
      'conten-Type': 'text/html'
    });

    res.write(data);
    res.end(`${html} has already sent to browser`);
  })
}

httpServer.on('request', (req, res) => {
  const Response = {
    "renderIndex": renderHTML(res, 'index.html'),
    "renderLogin": renderHtml(res, 'login.html'),
  },

  const uri = uri.parse(req.url).pathname

  switch (uri) {
    case "/" :
      Response.renderIndex;
      return;
    case "/login" :
      Response.renderLogin;
      return;
  }
})

httpServer.listen(8080);
console.log()