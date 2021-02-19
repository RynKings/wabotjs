const { event, wa, command_help, textListener, printLogs, settings } = require('../bot.js')
const requests = require("node-fetch")

async function countryCode(wa, msg){
	const query = msg.pattern[1]
	const url = await requests('https://restcountries.eu/rest/v2/callingcode/'+query)
	const code = await url.json()
	console.log(code)
	wa.sendMessage(msg.to,`╭───「 Country Info 」\n\n • Name: ${code[0].name}\n • Languages: ${code[0].languages[0].name}\n • callingCodes: ${code[0].callingCodes}\n • Capital: ${code[0].capital}\n • Region: ${code[0].region}\n • Population: ${code[0].population}\n • Timezones: ${code[0].timezones}\n • NativeName: ${code[0].nativeName}\n • *Currencies: *\n -Code: ${code[0].currencies[0].code}\n -Symbol: ${code[0].currencies[0].symbol}`)
}
textListener(countryCode, true, true, /^.countrycode (.*)$/, true)
command_res = "```.countrycode```\nExample : .countrycode 62```"
command_help['countrycode'] = command_res