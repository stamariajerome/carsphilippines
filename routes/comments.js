var express = require('express');
var router = express.Router();
var Collection = require('../models/collection');

// ===============
// COMMENTS
// ===============

// NON EXISTENT --------------------------
// TODO Delete this in the future
router.get('/collections/:id/comments/new', function(req, res) {
  res.render('comments/new');
});

// CREATE - add new comment into the DB.
router.post('/collections/:id/comments', function(req, res) {
  var newComment = req.body.comment;
  var id = req.params.id;

  Collection.findById(id, function(err, foundCollection) {
    if(err) {
      console.log(err);
    } else {
      Comment.create(newComment, function(err, newComment) {
        if(err) {
          console.log(err);
        } else {
          foundCollection.comments.push(newComment);
          foundCollection.save();
          res.redirect('/collections/' + foundCollection._id);
        }
      });
    }
  });

});

//DESTROY - remove a spcific comment in the DB
router.delete('/collections/:id/comments', function(req, res) {
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

module.exports = router;
