'use strict'

import http from 'http';
import url from 'url';
import fs from 'fs';
import { Server } from 'net';

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  const Response = {
    "renderHTML": () => {
      const template = fs.readFile('./template/index.html', 'utf-8', (err, data) => {
        res.writeHead(200, {
          'content-Type': 'text/html'
        });

        res.write(data);
        res.end('HTML file has already sent to browser')
      });
    }
  },
})