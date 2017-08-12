function randomNo() {
    var x = new Date();
    return x.getTime() + Math.round(Math.random() * 1000)
}
var socket = io();
socket.connect('/socket', {
    autoConnect: true
})
socket.on('first', function(data) {
    debugger;
})
$(function() {
    let id = localStorage.getItem('randomID')
    $('#message').attr('data-id', id || randomNo())
})
$(function() {
    $('#send').click(function() {
        var txt = $('#message');
        var val = txt.val();
        socket.emit('text-sent', {
            msg: val
        });
    })
})