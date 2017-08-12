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
                "name": "resolve",
                "text": "Resolve",
                "style": "primary",
                "type": "button",
                "value": args.id
            },{
                "name": "reject",
                "text": "Reject",
                "style": "danger",
                "type": "button",
                "value": args.id
            }]
        }]
    }).then((resp)=>{
        console.log(resp)
        // console.log(resp.event.ts)
    }).catch((err)=>{
        console.log(err)
    })
    // console.log(args);
}

module.exports = {
    sendMessageToAChannel
}