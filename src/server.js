var express = require('express');
const nodemon = require('nodemon');
var app = express()

app.use(nodemon)
app.get('/:id', function(req, res) {
  res.send('Hello World! ' + req.params.id );
});

app.listen(8000);