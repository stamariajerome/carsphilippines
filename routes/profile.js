var express = require('express');
var router = express.Router();


router.get('/profile', function(req, res) {
  res.render('profiles/index');
});
module.exports = router;
