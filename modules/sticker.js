const exec = require('await-exec')
const { event, wa, command_help, textListener, printLogs, settings, incoming, outgoing, processTime, moment } = require('../bot.js');
const fs = require("fs");
const sharp = require('sharp');
const webp = require('webp-converter')

async function sticker(wa, msg){
	msg_id = msg.key.id
	to = msg.to
	if (Object.keys(msg.quoted)[0] === "imageMessage") {
        msg.message = msg.quoted
        const file = await event.downloadAndSaveMediaMessage(msg, msg_id)
        req = wa.getRandom('.webp')
        exec(`ffmpeg -i ${file} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${req}`, (err) => {
            fs.unlinkSync(file)
            if (err) return wa.sendMessage(to, 'Failed to convert image to sticker❌')
            wa.sendSticker(to, req)
            fs.unlinkSync(req)
        })
    }
}
textListener(sticker, true, true, /^\.sticker$/, true)

async function customSticker(wa, msg){
    console.log(msg)
    msg_id = msg.key.id
    to = msg.to
    sender = msg.sender
    if (Object.keys(msg.quoted)[0] === "imageMessage"){
        msg.message = msg.quoted
        const buffer = await event.downloadMediaMessage(msg)
        webp.buffer2webpbuffer(buffer, 'jpg', '-q 100')
            .then((res) => {
                sharp(res)
                    .resize(256, 256)
                    .toFile(`./temp/stage_${sender}.webp`, async (err) => {
                        if (err) return await printLogs(err)
                        await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender}.webp -o ./temp/${sender}.webp`, { log: true })
                        if (fs.existsSync(`./temp/${sender}.webp`)) {
                            const data = fs.readFileSync(`./temp/${sender}.webp`)
                            wa.sendSticker(to, `./temp/${sender}.webp`)
                            printLogs(`Sticker processed for ${processTime(msg.messageTimestamp, moment())} seconds`)
                            fs.unlinkSync(`./temp/${sender}.webp`)
                            fs.unlinkSync(`./temp/stage_${sender}.webp`)
                        }
                    })
                }
            )
        }
}
textListener(customSticker, true, true, /^\.sticker$/, true)

command_res = "```.sticker```\nUsage : reply the picture\nto convert your picture to sticker"
command_res += "```.sticker```\nUsage : reply the picture\nto convert your picture to sticker with custom blabal"
command_help['sticker'] = command_res