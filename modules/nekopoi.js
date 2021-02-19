const { event, wa, command_help, textListener, printLogs } = require('../bot.js')

async function nekopoi (wa, msg){
	const page = msg.pattern[1]
	const response = await requests("https://rest.amibot.xyz/nekopoi/?page="+page+"&apiKey=YOUR_API_APIKEY") //Get the APIKEY FROM https://amibot.me
	const data = await response.json()
	nekoo = `╭───「 *Nekopoi Update* 」\n`
	for (i = 0; i < response.results.length; i++){
		nekoo += `\n• ${i+1}. *${nekodog.results[i].title}*`
		nekoo += `\n _More Info Ketik .nekopoi ${i+1}_`
	}
	wa.sendMessage(msg.to, nekoo)
}

textListener(nekopoi, true, false, /^\.nekopoi (url|(.*))(?: |$)(.*)/)

