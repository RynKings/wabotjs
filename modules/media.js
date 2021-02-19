const { event, wa, command_help, textListener, printLogs } = require('../bot.js')

const requests = require("node-fetch")

async function pinterest(wa, msg){
	const to = msg.to;
	const textt = msg.pattern[1]

	await wa.sendMessage(to, 'Getting some picture...')
	const response = await requests("http://hujanapi.xyz/api/pinterest?query="+textt+"&apikey=YOUR_APIKEY")
    const mat = await response.json()
    const data = mat.result.data
    let kya = data[Math.floor(Math.random() * data.length)]
    wa.sendMediaURL(to, kya)
}
textListener(pinterest, true, false, /^.pinterest (.*)/)

command_res = "```.pinterest (text)```\nto get some picture from pinterest"
command_help['media'] = command_res