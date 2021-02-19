const { event, wa, command_help, textListener, printLogs, settings, incoming, outgoing } = require('../bot.js')

const requests = require("node-fetch")

async function youtubeMp3(client, message){
	const url = message.pattern[1]
	const response = await requests("http://hujanapi.xyz/api/ytmp3?query="+url+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    console.log(data)
    let yt = "*Youtube MP3*\n\n"
    yt += "Title: _"+data.result.title+"_"
    yt += "\nDuration: _"+data.result.duration+"_"
    yt += "\nChannel: _"+data.result.author+"_"
    yt += "\nsize_audio: _"+data.result.size_audio+"_"
    wa.sendMediaURL(message.to, data.result.image, yt)
    wa.sendMediaURL(message.to, data.result.mp3)
}

textListener(youtubeMp3, incoming, outgoing, /^.ytmp3 (.*)$/)

async function youtubeSearch(client, message){
	const url = message.pattern[1]
	const response = await requests("http://hujanapi.xyz/api/ytsearch?query="+url+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    console.log(data)
    let yt = "*Youtube Search*\n\n"
    for (i = 0; i < data.result.length; i++){
		yt += "Title: _"+data.result[i].title+"_"
		yt += "\nChannel: _"+data.result[i].channel+"_"
		yt += "\nurl: _"+data.result[i].url+"_"
	}
	wa.sendMessage(message.to, yt)
}

textListener(youtubeSearch, incoming, outgoing, /^.ytsearch (.*)$/)

command_res = '```.ytsearch hikaru nara```\nto search your video\n'
command_help['youtube'] = command_res