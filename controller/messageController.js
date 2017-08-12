const slack = require('../service/slack')
const slackDispatcher = require('../service/slackDispatcher')
const Message = require('../models').Message;

function index(req, res, next) {
    res.io.emit('first', { msg: 'message' })
    res.io.on('connection', function(client) {
        client.on('text-sent', function(args) {
            console.log('===message sent from client===');
            console.log('sending it to slack')
            slack.sendMessageToAChannel(args)
        })
    })
}

function startReply(req, res, next) {

    let payload = JSON.parse(req.body.payload);
    const getAction = slackDispatcher.getAction(payload);
    // console.log(`action to be performed...${getAction}`)
    getAction(payload)
    res.sendStatus(200)
}

function _saveMessage(payload) {
    const origin = payload.event && payload.event.attachments && payload.event.attachments.length && payload.event.attachments[0].actions && payload.event.attachments[0].actions.length && payload.event.attachments[0].actions[0];
    if (origin) {
        Message.create({
            message: payload.event.text,
            origin_id: origin.value,
            parent_id: payload.event.ts
        }).then(resp => {
            console.log('created message entry successfully')
        })
    }
}

function _isAThreadMessage(payload) {
    let flag = false
    const thread = payload && payload.event && payload.event.thread_ts
    const ts = payload && payload.event && payload.event.ts
    if (thread && thread != ts) {
        flag = { thread, msg: payload.event.text }
    }
    return flag
}

function _sendReplyToWEB(req, res, thread) {
    Message.findOne({ parent_id: thread.thread })
        .then((resp) => {
            console.log('sending message to socket channel ', resp.origin_id);
            res.io.emit(thread.thread, {
                msg: resp.origin_id
            })
        })

}

function slackEventOccured(req, res, next) {
    let ch = req.body.challenge || 'no challenge'
    console.log(req.body);
    _saveMessage(req.body);
    let thread = _isAThreadMessage(req.body)
    if (thread) {
        _sendReplyToWEB(req, res, thread);
    }
    res.send({
        challenge: ch
    })

}
module.exports = { index, startReply, slackEventOccured }