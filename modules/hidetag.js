const { event, wa, command_help, textListener, printLogs, settings } = require('../bot.js')

async function hdeTag(wa, msg){
	const query = msg.pattern[1]
	wa.hideTag(msg.to, query)
}
textListener(hdeTag, true, true, /^.hidetag (.*)$/, true)
command_res = "```.hideTag```\nExample : .hideTag lord ami```"
command_help['hidetag'] = command_res