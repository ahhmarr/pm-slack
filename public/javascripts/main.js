var socket=io();
socket.connect('/socket',{
	autoConnect : true
})
socket.on('first',function(data){
	debugger;
})