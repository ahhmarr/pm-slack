var express = require('express');
var router = express.Router();
var MessageController =require('../controller/messageController')
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'hello world' });
});
router.get('/socket',MessageController.index)
router.post('/start-reply',MessageController.startReply)
router.post('/slack/event',MessageController.slackEventOccured)
module.exports = router;
