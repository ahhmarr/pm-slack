var slackWebhook = require('slack-webhook');
var hook = new slackWebhook('https://hooks.slack.com/services/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', {
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
        username: 'boty',
        icon_emoji: ':robot_face:',
        channel: '#random',
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