// ===============
// PACKAGES
// ===============
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// ===============
// MODELS
// ===============
var Collection = require('./models/collection');
var Comment = require('./models/comment');

// ===============
// CONFIGURATION
// ===============
mongoose.connect('mongodb://localhost/creativeshots');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
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
// INDEX - show all collections in the DB
app.get('/collections', function(req, res) {
  Collection.find({}, function(err, collections) {
    if(err) {
      console.log(err);
    } else {
      res.render('collections/index', { Collections: collections });
    }
  });
});

// NEW - show new collection form
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
    // TODO change to proper relational collection
    Comment.find({}, function(err, comments) {
      if(err) {
        console.log(err);
      } else {
        res.render('collections/show', {Collection: foundCollection, Comments: comments });
      }
  });
});
});

//UPDATE - Update information of a collection in the DB
app.put('/collections/:id', function(req, res) {
  var id = req.params.id;
  var update = req.body.collection;
  Collection.findByIdAndUpdate(id, update, function(err, foundCollection) {
    if(err) {
      return res.redirect('/collections/' + id + '/edit');
    }
    res.redirect('/collections/' + id);
  });
});

//DESTROY - Delete a particular collection in the DB
app.delete('/collections/:id', function(req, res) {
  var id = req.params.id;
  Collection.findByIdAndRemove(id, function(err, foundCollection) {
    if(err) {
      console.log(err);
      return res.redirect('/collections');
    }
    return res.redirect('/collections');
  });
});

// ===============
// COMMENTS
// ===============

// NON EXISTENT --------------------------
// TODO Delete this in the future
app.get('/collections/:id/comments/new', function(req, res) {
  res.render('comments/new');
});

// CREATE - add new comment into the DB.
app.post('/collections/:id/comments', function(req, res) {
  var newComment = req.body.comment;
  var id = req.params.id;
  Comment.create(newComment, function(err, newComment) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/collections/' + id);
    }
  });
});

//DESTROY - remove a spcific comment in the DB
app.delete('/collections/:id/comments', function(req, res) {
  var commentId = req.body.id;
  var CollectionId = req.params.id;
  Comment.findByIdAndRemove(commentId, function(err, foundComment) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/collections/' + CollectionId);
    }
  });
});

app.get('*', function(req, res) {
  res.render('404');
});

app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
