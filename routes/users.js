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
  User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
    if(err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        console.log(newUser);
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
  failureRedireect: '/login'
}) ,function(req, res) {
  res.send('login post route');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/collections');
});

router.get('*', function(req, res) {
  res.render('404');
});

module.exports = router;
