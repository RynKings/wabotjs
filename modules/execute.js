const { event, wa, command_help, textListener, printLogs, settings } = require('../bot.js')

async function execute(wa, msg){
	const sep = msg.text.split(" ")
    const query = msg.text.replace(sep[0] +" ", "")
	const print = function(text){
	    wa.sendMessage(msg.to, util.format(text))
	}
	eval("(async () => {try{"+query+"}catch(e){wa.sendMessage(msg.to,  e.toString())}})()")
}
textListener(execute, true, true, /^.exc (.*)$/, false, true)
command_res = "```.exc```\nExample : .exc 62```"
command_help['exc'] = command_res