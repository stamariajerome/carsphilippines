var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

// ===============
// USER
// ===============
router.get('/register', function(req, res) {
  res.render('users/register');
});

router.post('/register', function(req, res) {
  //TODO add sanitizer
  User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
    if(err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/collections');
      });
    }
  });
});

router.get('/login', function(req, res) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/collections',
  failureRedirect: '/login',
  // TODO do require flash
  failureFlash: true
}), function(req, res) {
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/collections');
});
module.exports = router;
