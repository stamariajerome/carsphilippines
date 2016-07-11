// ===============
// PACKAGES
// ===============
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var collectionSchema = mongoose.Schema({
  image: String,
  title: String,
  author: String,
  description: String,
  date: { type: String, default: Date.now }
});

var Collection = mongoose.model('Collection', collectionSchema);


// ===============
// CONFIGURATION
// ===============
mongoose.connect('mongodb://localhost/creativeshots');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ===============
// INDEX
// ===============
app.get('/', function(req, res) {
  res.render('landing');
});

// ===============
// COLLECTIONS
// ===============
app.get('/collections', function(req, res) {
  Collection.find({}, function(err, collections) {
    if(err) {
      console.log(err);
    } else {
      res.render('collections/index', { collections: collections });
    }
  });

});

app.get('/collections/new', function(req, res) {
  res.render('collections/new');
});

// new
app.post('/collections', function(req, res) {
  var newCollection = req.body.collection;
  Collection.create(newCollection, function(err, newCollection) {
    if(err) {
      res.redirect('/collections/new');
      console.log(err);
    } else {
      res.redirect('/collections');
    }
  });
});

//view
app.get('/collections/:id', function(req, res) {
  res.send('this is a view');
});

app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
