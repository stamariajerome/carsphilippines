// ===============
// PACKAGES
// ===============
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//authentication
var passport = require('passport');
var LocalStrategy = require('passport-local');

// ===============
// MODELS
// ===============
var Collection = require('./models/collection');
var Comment = require('./models/comment');
var User = require('./models/user');



// ===============
// CONFIGURATION
// ===============

mongoose.connect('mongodb://localhost/creativeshots');
var app = express();
// TODO Just added express
app.use(require('express-session')({
  secret: 'This is a secret string for the application',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// ===============
// ROUTES
// ===============
var collectionRoutes = require('./routes/collections');
var commentRoutes = require('./routes/comments');

//authentication
// TODO initialize authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ===============
// LANDING
// ===============
app.get('/', function(req, res) {
  res.render('landing');
});

app.use(collectionRoutes);
app.use(commentRoutes);

// ===============
// USER
// ===============
app.get('/register', function(req, res) {
  res.render('users/register');
});

app.post('/register', function(req, res) {
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

app.get('/login', function(req, res) {
  res.render('users/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/collections',
  failureRedireect: '/login'
}) ,function(req, res) {
  res.send('login post route');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/collections');
});

app.get('*', function(req, res) {
  res.render('404');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
