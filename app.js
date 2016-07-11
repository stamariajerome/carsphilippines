// ===============
// PACKAGES
// ===============
var express = require('express');


// ===============
// CONFIGURATION
// ===============
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// ===============
// INDEX
// ===============
app.get('/', function(req, res) {
  res.render('index');
});

// ===============
// COLLECTIONS
// ===============
app.get('/collections', function(req, res) {
  res.render('collections/index');
});

app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
