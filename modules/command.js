const { event, wa, command_help } = require('../bot.js')

event.on('message-new', async(chat) => {
	const msg = wa.serialize(chat);
	const text = msg.text;
	const txt = String(text).toLowerCase();

	var regex = new RegExp(/\.help(?: |$)(.*)/);
	regs = regex.exec(text);
	if (regs){
		if (regs[1]){
			if (regs[1] in command_help){
				const response = await wa.sendMessage(msg.key.remoteJid, command_help[regs[1]])
				await wa.sleep(20000)
				await event.deleteMessage(msg.key.remoteJid, {id: response.key.id, remoteJid: msg.key.remoteJid, fromMe: true})
			} else {
				const response = await wa.sendMessage(msg.key.remoteJid, '```Help not found...```')
				await wa.sleep(20000)
				await event.deleteMessage(msg.key.remoteJid, {id: response.key.id, remoteJid: msg.key.remoteJid, fromMe: true})
			}
		} else {
			r = 'List for all available commands below: \n'
			n = 0
			for (cmd in command_help){
				n += 1
				r += `${n}. ${cmd}\n`;
			}
			const response = await wa.sendMessage(msg.key.remoteJid, r)
			await wa.sleep(20000)
			await event.deleteMessage(msg.key.remoteJid, {id: response.key.id, remoteJid: msg.key.remoteJid, fromMe: true})
		}
	}
})