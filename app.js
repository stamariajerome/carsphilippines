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
// LANDING
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

// INDEX - show all collections in the DB
app.get('/collections/new', function(req, res) {
  res.render('collections/new');
});

// CREATE - add new collection into the DB
app.post('/collections', function(req, res) {
  var newCollection = req.body.collection;

  Collection.create(newCollection, function(err, newCollection) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/collections');
    }
  });
});

// EDIT - edit a collection in the DB
app.get('/collections/:id/edit', function(req, res) {
  var id = req.params.id;
  Collection.findById(id, function(err, foundCollection) {
    if(err) {
      return res.redirect('/collections/' + id + '/edit');
    }
    res.render('collections/edit', { Collection: foundCollection });
  });

});

// SHOW - Show information about the collection
app.get('/collections/:id', function(req, res) {
  var id = req.params.id;
  Collection.findById(id, function(err, foundCollection) {
    if(err) {
      console.log(err);
      return res.redirect('/collections');
    }
    res.render('collections/show', {Collection: foundCollection});
  });

});

//UPDATE - Update information of a collection in the DB

//DESTROY - Delete a particular collection in the DB

// ===============
// COMMENTS
// ===============
app.get('/collections/:id/comments/new', function(req, res) {
  res.render('comments/new');
});

app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
