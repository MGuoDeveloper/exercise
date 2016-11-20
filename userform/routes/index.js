var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Register' });
});

router.get('/success', function(req, res, next) {
  var username = "Visitor";
  res.render('success', {username: username});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

module.exports = router;
