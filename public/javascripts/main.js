function randomNo() {
    var x = new Date();
    return x.getTime() + Math.round(Math.random() * 1000)
}
var socket = io();
socket.connect('/socket', {
    autoConnect: true
})
socket.on('first', function(data) {

})
$(function() {
    let id = localStorage.getItem('randomID') || randomNo()
    $('#message').attr('data-id', id )
    socket.on(id,function(data){
        debugger
    })
})
$(function() {
    $('#send').click(function() {
        var txt = $('#message');
        var val = txt.val();
        socket.emit('text-sent', {
            msg: val,
            id: $('#message').attr('data-id')
        });
    })
})