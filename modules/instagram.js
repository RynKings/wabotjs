const { event, wa, command_help, textListener, printLogs, settings } = require('../bot.js')
const requests = require("node-fetch")

async function igpost(client, message){
    const sep = message.text.split(" ")
    const url = message.text.replace(sep[0] +" ", "")
    const response = await requests("http://hujanapi.xyz/api/igpost?url="+url+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    const media = data.result.media
    for (i in media){
        medias = (media[i].video) ? (media[i].video) : (media[i].image)
        wa.sendMediaURL(message.to, medias)
    }
}

textListener(igpost, true, false, /^.igpost (.*)$/, true, false)

async function igtv(client, message){
    const sep = message.text.split(" ")
    const url = message.text.replace(sep[0] +" ", "")
    const response = await requests("http://hujanapi.xyz/api/igtv?url="+url+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    const mat = data.result.media[0]
    wa.sendMediaURL(message.to, mat.video_url)
}

textListener(igtv, true, false, /^.igtv (.*)$/, true, false)

async function igstory(client, message){
    const username = message.pattern[1]
    const response = await requests("http://hujanapi.xyz/api/igstory?username="+username+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    const num = Number(message.pattern[2])
    if (num <= data.length){
        wa.sendMediaURL(message.to, data[num - 1].url)
    } else { 
        if (data.length == undefined){
            wa.sendReply(message.to, "this account has not created a story or this account is private")
        }else{ 
            wa.sendReply(message.to, 'Just Have '+data.length+' Instagram Story') 
        }
    }
}

textListener(igstory, true, false, /^.igstory (.*) (.*)$/, true, false)

async function igstalk(client, message){
    const username = message.pattern[1]
    const response = await requests("http://hujanapi.xyz/api/ig?username="+username+"&apikey=YOUR_APIKEY")
    const data = await response.json()
    let ig = "  ｢Instagram Profile｣\n"
    ig += "\n• Username : "+data.result.user.username
    ig += "\n• Full Name : "+data.result.user.full_name
    ig += "\n• Biography : "+data.result.user.biography
    ig += "\n• Media Count : "+data.result.user.media_count
    ig += "\n• Followers : "+data.result.user.follower_count
    ig += "\n• Following : "+data.result.user.following_count
    ig += "\n• Private : "+data.result.user.is_private
    ig += "\n• Link : https://www.instagram.com/"+username
    photo = data.result.user.hd_profile_pic_url_info.url
    wa.sendMediaURL(message.to, data.result.user.hd_profile_pic_url_info.url, ig)
}

textListener(igstalk, true, false, /^.igstalk (.*)$/, true, false)



command_res = '.igstalk instagram\nto stalking profile instagram\n'
command_res = '.igpost urlpost \nto download post instagram\n'
command_res = '.igtv urligtv\nto download instagram tv\n'
command_help['instagram'] = command_res