var express = require('express');
var router = express.Router();
var MessageController =require('../controller/messageController')
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: process.env.IN_HOOK_URL });
});
router.get('/socket',MessageController.index)
router.post('/start-reply',MessageController.startReply)
module.exports = router;
