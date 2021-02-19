const { event, wa, command_help, textListener, printLogs, settings } = require('../bot.js')

async function public(client, message){
	console.log(message.pattern);
	settings.mode = message.pattern[1];
	client.sendMessage(message.to, `Mode switched to ${message.pattern[1]}!`);
}

textListener(public, true, true, /^\.mode (public|self)/, false, true);

command_res = '```.mode (self/public)```\nto change bot mode';
command_help['mode'] = command_res;