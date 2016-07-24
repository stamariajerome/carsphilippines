var Collection = require('../models/collection');
var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You must be logged in to access this page');
  res.redirect('/login');
  next();
};

middleware.checkOwnershipCollection = function(req, res, next) {
  if(req.isAuthenticated()) {
    Collection.findById(req.params.id, function(err, foundCollection) {
      if(foundCollection.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You do no have access rights to this collection');
        res.redirect('/collections/' + req.params.id);
        next();
      }
    });
  } else {
    req.flash('error', 'You must be logged in to access this page');
    res.redirect('/login');
    next();
  }
};
module.exports = middleware;
