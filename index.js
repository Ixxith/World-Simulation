var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// The code below allows the node js to find the public directory with the index.html file
const publicPath = path.join(__dirname, './public');
// Node js is using port 3000/ and when you push to cloud it will use process.env.PORT
const port = process.env.PORT || 3000;

/* GET index page */
app.get('/', function(req, res, next) {
   res.render('index');
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});