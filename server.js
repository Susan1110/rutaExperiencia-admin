const path = require('path');
const express = require('express');
const app = express();
const PORT = 5000; 

// Serve static files
app.use(express.static(__dirname + '/dist/ruta-experiencia'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ruta-experiencia/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || PORT);
