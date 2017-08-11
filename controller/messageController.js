var slack=require('../service/slack')

function index(req, res, next){
	console.log('called...')
	res.io.emit('first',{msg:'message'});
	res.io.on('connection',function(client){
		client.on('text-sent',function(args){
			console.log('===message sent from client===');
			console.log('sending it to slack');
			slack.sendMessageToAChannel(args);
		})
	})
}
function startReply(req, res, next){
	console.log('reply started.....');
	res.send('called me')
}
module.exports={index,startReply}