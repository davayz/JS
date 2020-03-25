const express = require('express');

const app = express();

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


var __dirname = "./src/";


app.get('/', (req, res) => {
  res.sendFile(__dirname + './index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 8000!')
});