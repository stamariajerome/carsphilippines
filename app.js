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
var userRoutes = require('./routes/users');

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
app.use(userRoutes);


app.listen('3000', function() {
  console.log('Server started at port 3000..');
});
