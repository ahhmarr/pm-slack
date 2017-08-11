var express = require('express');
var router = express.Router();
var MessageController =require('../controller/messageController')
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'pm-slackin' });
});
router.get('/socket',MessageController.index)
router.get('/start-reply',MessageController.startReply)
module.exports = router;
