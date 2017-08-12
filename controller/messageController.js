const slack = require('../service/slack')
const slackDispatcher = require('../service/slackDispatcher')

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

function slackEventOccured(req, res, next) {
    let ch=req.body.challenge || 'no challenge'
    console.log(req.body);
    
    res.send({
    	challenge : ch
    })

}
module.exports = { index, startReply, slackEventOccured }