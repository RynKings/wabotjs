const { conn, printLogs } = require('./bot.js')

var fs = require('fs');
var files = fs.readdirSync('./modules/');

console.log(files);

for (f in files){
	i = require('./modules/' + files[f]);
}

connect = async() =>{
	await conn.connectToWhatsApp();
	await printLogs('Bot is running!!');
}

connect()