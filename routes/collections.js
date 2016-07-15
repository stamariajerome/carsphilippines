var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Collection = require('../models/collection');

// ===============
// COLLECTIONS
// ===============
// INDEX - show all collections in the DB
router.get('/collections', isLoggedIn, function(req, res) {
  Collection.find({}, function(err, collections) {
    if(err) {
      console.log(err);
    } else {
      res.render('collections/index', { Collections: collections });
    }
  });

});

// NEW - show new collection form
router.get('/collections/new', isLoggedIn, function(req, res) {
  res.render('collections/new');
});

// CREATE - add new collection into the DB
router.post('/collections', isLoggedIn, function(req, res) {
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
router.get('/collections/:id/edit', isLoggedIn, function(req, res) {
  var id = req.params.id;

  Collection.findById(id, function(err, foundCollection) {
    if(err) {
      return res.redirect('/collections/' + id + '/edit');
    }
    res.render('collections/edit', { Collection: foundCollection });
  });

});

// SHOW - Show information about the collection

router.get('/collections/:id', isLoggedIn, function(req, res) {
  var id = req.params.id;

  Collection.findById(id, function(err, foundCollection) {
    if(err) {
      console.log(err);
    } else {
      Collection.findById(foundCollection._id).populate('comments').exec(function(err, foundComments) {
        if(err) {
          console.log(err);
        } else {
          res.render('collections/show', {Comments: foundComments.comments, Collection: foundCollection});
        }
      });
    }
  });

});

//UPDATE - Update information of a collection in the DB
router.put('/collections/:id', isLoggedIn, function(req, res) {
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
router.delete('/collections/:id', isLoggedIn, function(req, res) {
  var id = req.params.id;

  Collection.findByIdAndRemove(id, function(err, foundCollection) {
    if(err) {
      console.log(err);
      return res.redirect('/collections');
    }
    return res.redirect('/collections');
  });

});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;