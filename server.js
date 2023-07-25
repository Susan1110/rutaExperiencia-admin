const path = require('path');
const express = require('express');
const app = express();
const PORT = 80; 

// Serve static files
app.use('/admin', express.static(__dirname + '/dist/ruta-experiencia'));
app.use('/admin2', express.static(__dirname + '/ruta-admin2'));
app.use('/home', express.static(__dirname + '/cliente-web'));
app.use('/home2', express.static(__dirname + '/ruta-experiencia-web'));
app.use('/', express.static(__dirname + '/cliente-web'));

// Send all requests to index.html
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ruta-experiencia/index.html'));
});
app.get('/admin2', function(req, res) {
  res.sendFile(path.join(__dirname + '/ruta-admin2/index.html'));
});
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/cliente-web/index.html'));
});
app.get('/home2', function(req, res) {
  res.sendFile(path.join(__dirname + '/ruta-experiencia-web/index.html'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/cliente-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || PORT);
