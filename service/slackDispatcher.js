const slackActionsList=require('./slackActionsList')
function getAction(payload) {
	console.log(`payload callback : ${payload.callback_id}`)
    let action=slackActionsList[payload.callback_id]
    return action

}

module.exports = {
    getAction
}