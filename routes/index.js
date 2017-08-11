var express = require('express');
var router = express.Router();
var MessageController =require('../controller/messageController')
/* GET home page. */
router.get('/', function(req, res, next) {
	
  res.render('index', { title: 'Express' });
});
router.get('/socket',MessageController.index)
module.exports = router;
