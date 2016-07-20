var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('failure', 'You must be logged in to access this page');
  res.redirect('/login');
  next();
};

middleware.checkOwnershipCollection = function(req, res, next) {

};
module.exports = middleware;
