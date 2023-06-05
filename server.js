const path = require('path');
const express = require('express');
const app = express();
const PORT = 80; 

// Serve static files
app.use('/admin', express.static(__dirname + '/dist/ruta-experiencia'));
app.use('/', express.static(__dirname + '/cliente-web'));

// Send all requests to index.html
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ruta-experiencia/index.html'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/cliente-web/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || PORT);
