const slack = require('slack'),
    bot = slack.rtm.client,
    token = process.env.SLACK_ACCESS_TOKEN

function replyMessage(payload) {
    const ts = payload.message_ts;
    console.log(`called`);
    console.log(`${payload.channel.id}`);
    
    slack.chat.postMessage({
        token,
        channel: payload.channel.id,
        text: 'replied this man',
        thread_ts: ts
    }, (err, data) => {
        console.log(err)
        console.log(data)
    })
}


module.exports = {
    "reply_msg": replyMessage
}