const conn = require("./connect");
const wa = require("./helper");
const fs = require("fs");
const { MessageType, Mimetype, WaTextMessage } = require("@adiwajshing/baileys");
const moment = require('moment-timezone')

moment.tz.setDefault('Asia/Jakarta').locale('id')

const event = conn.Whatsapp;

const command_help = {};

var logs = false;
var logs_id = '';
var settings = undefined;
var incoming = false;
var outgoing = false;

if (fs.existsSync('./data/setting.json')){
	const setting = fs.readFileSync('./data/setting.json', { encoding: 'utf-8'});
	settings = JSON.parse(setting)
	logs = settings.logs
	logs_id = settings.logs_id
} else {
	settings = {
		logs: logs,
		logs_id: logs_id
	}
	fs.writeFileSync('./data/setting.json', JSON.stringify(settings, null, '\t'))
}

function modeIncom(p){
	if (p === "public"){
		return true;
	} else {
		return false;
	}
}

function modeOutgo(p){
	if (p === "self"){
		return true;
	} else {
		return false;
	}
}

function printLogs(error){
	if (logs){
		wa.sendMessage(logs_id, `\`\`\`${error}\`\`\``);
	} else {
		console.log(error);
	}
}

const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

function textListener(func, incoming=false, outgoing=false, pattern, mode=false, owners=false){
	event.on('message-new', async(chat) => {
		const msg = wa.serialize(chat)

		if (owners){
			if (!wa.serializeNumberList(settings.owners).includes(msg.sender)) return
		}
		
		if (incoming === true && outgoing === false){
			if (msg.key.fromMe) return
		} else if (incoming === false && outgoing === true){
			if (msg.key.fromMe === false) return
		}

		if (mode){
			incom = modeIncom(settings.mode)
			outgo = modeOutgo(settings.mode)

			if (incom === true && outgo === false){
				if (msg.key.fromMe) return
			} else if (incom === false && outgo === true){
				if (msg.key.fromMe === false) return
			}
		}

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
			printLogs(error.stack);
		}
	})
}

module.exports = { event, conn, wa, command_help, logs, logs_id, textListener, printLogs, settings, incoming, outgoing, processTime, moment };