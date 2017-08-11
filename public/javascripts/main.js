var socket=io();
socket.connect('/socket',{
	autoConnect : true
})
socket.on('first',function(data){
	debugger;
})

$(function(){
	$('#send').click(function(){
		var txt=$('#message');
		var val=txt.val();
		socket.emit('text-sent',{
			msg : val
		});
	})
})