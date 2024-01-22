// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var {ip} = require('address');
var cron = require('node-cron');
var axios = require('axios');

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

cron.schedule('*/10 * * * *', () => {
  axios.get('https://headerparser-api.onrender.com/')
     .then(resonse => {
       console.log('Server Pinged successfully');
     })
     .catch(error => {
       console.log(error);
     });
})




// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function (req, res) {
  const ipaddress = ip();
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
