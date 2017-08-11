function index(req, res, next){
	console.log('called...')
	res.io.emit('first',{msg:'message'});
	res.send('socket send');
}

module.exports={index}