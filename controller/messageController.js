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
function startReply(){
	console.log('reply started.....');
}
module.exports={index,startReply}