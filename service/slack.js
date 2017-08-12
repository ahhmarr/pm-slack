var slackWebhook = require('slack-webhook');
var hook = new slackWebhook(process.env.IN_HOOK_URL, {
    defaults: {
        username: 'boty',
        channel: '#general',
        icon_emoji: ':robot_face:'
    }
})

function sendMessageToAChannel(args) {
    console.log('submitting....');
    hook.send({
        text: args.msg,
        "attachments": [{
            "text": "",
            "color": "#0ADA0A",
            "callback_id":"reply_msg",
            "attachment_type": "default",
            "actions": [{
                "name": "reply",
                "text": "Reply",
                "style": "primary",
                "type": "button",
                "value": "war"
            }]
        }]
    })
    console.log(args);
}

module.exports = {
    sendMessageToAChannel
}