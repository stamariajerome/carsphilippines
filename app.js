
// ===============
// PACKAGES
// ===============
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');

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
var url = process.env.databaseCreativeShotsURL || 'mongodb://localhost/creativeshots';
mongoose.connect(url);

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
app.use(flash());

// ===============
// ROUTES
// ===============
var collectionRoutes = require('./routes/collections');
var commentRoutes = require('./routes/comments');
var userRoutes = require('./routes/users');
// TODO finish this by friday.
var profileRoutes = require('./routes/profile');
//authentication
// TODO initialize authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  // TODO fixed variable name for passport authentication
  res.locals.error = req.flash('error');
  next();
});

// ===============
// LANDING
// ===============
app.get('/', function(req, res) {
  res.render('landing');
});

app.use('/collections', collectionRoutes);
app.use('/collections/:id', commentRoutes);
app.use(userRoutes);
app.use(profileRoutes);

// ===============
// CONTACT
// ===============
app.get('/contact', function(req, res) {
  res.render('contact/contact');
});

app.get('*', function(req, res) {
  res.render('404');
});


// app.listen(process.env.PORT, process.env.IP);
app.listen('3000', function(req, res) {
  console.log('server started in port 3000');
});
