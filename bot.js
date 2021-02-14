const conn = require("./connect");
const wa = require("./helper");
const fs = require("fs");

const event = conn.Whatsapp;

const command_help = {};

var logs = false;
var logs_id = '';

if (fs.existsSync('./data/setting.json')){
	const setting = fs.readFileSync('./data/setting.json', { encoding: 'utf-8'});
	const settings = JSON.parse(setting)
	logs = settings.logs
	logs_id = settings.logs_id
} else {
	const settings = {
		logs: logs,
		logs_id: logs_id
	}
	fs.writeFileSync('./data/setting.json', JSON.stringify(settings, null, '\t'))
}

function printLogs(error){
	if (logs){
		wa.sendMessage(logs_id, `\`\`\`${error}\`\`\``);
	} else {
		console.log(error);
	}
}

function textListener(func, incoming=false, outgoing=false, pattern){
	event.on('message-new', async(chat) => {
		var msg = wa.serialize(chat);
		msg.to = msg.key.remoteJid;
		msg.source = chat;
		try {

			if (pattern){
				var regex = new RegExp(pattern);
				regs = regex.exec(String(msg.text).toLowerCase());
				if (regs){
					msg.pattern = regs;
					await func(wa, msg);
				}
			} else {
				await func(wa, msg);
			}
		} catch (error) {
			wa.sendMessage(msg.key.remoteJid, 'Sorry there is some error.')
			printLogs(error);
		}
	})
}

module.exports = { event, conn, wa, command_help, logs, logs_id, textListener, printLogs };