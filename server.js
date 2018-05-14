const fs = require('fs');
const express = require('express')
const request = require('request');

const CONFIG = require('./config.json');
const app = express();

let accessToken = '';

app.get('/index', (req, res) => {
  let displayName = '';
  let pictureUrl = '';
  let options = {
    uri: 'https://api.line.me/v2/profile',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  request.get(options, function(error, response, body) {
    console.log(body);
    displayName = JSON.parse(body).displayName;
    pictureUrl = JSON.parse(body).pictureUrl;
    res.send(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <title>HTML5サンプル</title>
        </head>
        <body>
          <h1>プロフィール</h1>
          <div>${displayName}</div>
          <div><img src="${pictureUrl}"></div>
        </body>
      </html>
    `);
    res.end();
  });
});

app.get('/login', (req, res) => {
  fs.readFile(`./templates/login.html`, 'utf-8', (err, data) => {
    res.send(data);
    res.end();
  });
});

app.get('/get_token', (req, res) => {
  const code = req.query.code;

  let options = {
    uri: 'https://api.line.me/v2/oauth/accessToken',
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    form: {
      'grant_type': 'authorization_code',
      'code': code,
      'client_id': CONFIG.CLIENT_ID,
      'client_secret': CONFIG.CLIENT_SECRET,
      'redirect_uri': 'http://localhost:8080/get_token',
    }
  }
  request.post(options, function(error, response, body){
    accessToken = JSON.parse(body).access_token

    res.redirect('/index');
  });
})

app.listen(8080, function () {});
