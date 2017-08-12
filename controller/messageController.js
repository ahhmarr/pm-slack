var slack=require('../service/slack')
var slackDispatcher=require('../service/slackDispatcher')

function index(req, res, next){
	res.io.emit('first',{msg:'message'})
	res.io.on('connection',function(client){
		client.on('text-sent',function(args){
			console.log('===message sent from client===');
			console.log('sending it to slack')
			slack.sendMessageToAChannel(args)
		})
	})
}
function startReply(req, res, next){

	var payload=req.body.payload;
	var getAction=SlackDispatcher.getAction(req.body.payload);
	console.log(`action to be performed...${getAction}`)
	console.log(payload)
	res.send('called me')
}
module.exports={index,startReply}