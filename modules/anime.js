const { event, wa, command_help, textListener, printLogs, settings, incoming, outgoing } = require('../bot.js')

const requests = require("node-fetch")

async function gogoAnime(wa, msg){
	console.log(msg.pattern)
	const query = msg.pattern[1]
	const pemisah = query.split('|')
	const respon = await requests('https://amibot.xyz/api/search/'+query+'/1')
	const res = await respon.json()
	if (pemisah.length == 1)  {
		nime = `╭───「 *Anime Query* 」\n`
		num = 0
		for (i = 0; i < res.results.length; i++){
			nime += `${i+1}. *Title:* ${res.results[i].title}\n`
			nime += `*ID:* ${res.results[i].id}\n`
		}
		wa.sendMessage(msg.to, nime)
	}
	if (pemisah.length == 2) {
        const value = Number(pemisah[1]) - 1
        console.log(value)
        console.log(res.results[value])
        const met = await requests('https://amibot.xyz/api/watching/'+res.results[value].id+'/1')
        const mat = await met.json()
        wa.sendMessage(msg.to, mat.links[0])
    }
}
textListener(gogoAnime, true, false, /^.anime (.*)/)

async function randomwaifu(wa, msg){
	const respon = await requests('http://hujanapi.xyz/api/randomwaifu?apikey=YOUR_APIKEY')
    const data = await respon.json()
    let fox = "*Nama :* " + data.result.name
    fox += "\n*Deskripsi :* " + data.result.description
    wa.sendMediaURL(msg.to, data.result.image, fox)
}
textListener(randomwaifu, true, false, /^\.randomwaifu$/)

async function randomloli(wa, msg){
    const response = await requests("http://hujanapi.xyz/api/randomloli?apikey=YOUR_APIKEY")
    const data = await response.json()
    wa.sendMediaURL(msg.to, data.result.result, "*RANDOM LOLI*")
}
textListener(randomloli, true, false, /^\.randomloli$/)

async function randomanime(wa, msg){
    const response = await requests("http://hujanapi.xyz/api/randomanime?apikey=YOUR_APIKEY")
    const data = await response.json()
    wa.sendMediaURL(msg.to, data.url, "*RANDOM ANIME*")
}
textListener(randomanime, true, false, /^\.randomanime$/)

async function randompokemon(wa, msg){
    const response = await requests("http://hujanapi.xyz/api/pokemon?apikey=YOUR_APIKEY")
    const datas = await response.json()
    const asu = datas.result
    let weak = ""
    for (let i of asu.weakness) {
        weak += i+", "
    }
    let tipe = ""
    for (let i of asu.type) {
        tipe += i+", "
    }
    let fox = "*Random Pokemon*\n"
    fox += "\n*Title :* " + asu.name
    fox += "\n*Desc :* "+asu.desc
    fox += "\n*Info :*"
    fox += "\n  _Abilities :_ "+asu.description.abilities
    fox += "\n  _Category :_ "+asu.description.category
    fox += "\n  _Height :_ "+asu.description.height
    fox += "\n  _Weight :_ "+asu.description.weight
    fox += "\n*Weakness :* "+weak
    fox += "\n*Type :* "+tipe
    wa.sendMediaURL(msg.to, asu.img, fox)
}
textListener(randompokemon, true, false, /^\.randompokemon$/)

async function pokemon(wa, msg){
	const query = msg.pattern[1]
	const respon = await requests("http://hujanapi.xyz/api/pokemonx?query="+query+"&apikey=YOUR_APIKEY")
	const datas = await respon.json()
    const asu = datas.result
    let weak = ""
    for (let i of asu.weakness) {
        weak += i+", "
    }
    let tipe = ""
    for (let i of asu.type) {
        tipe += i+", "
    }
    let fox = "*Detail Pokemon*\n"
    fox += "\n*Title :* " + asu.name
    fox += "\n*Desc :* "+asu.desc
    fox += "\n*Info :*"
    fox += "\n  _Abilities :_ "+asu.description.abilities
    fox += "\n  _Category :_ "+asu.description.category
    fox += "\n  _Height :_ "+asu.description.height
    fox += "\n  _Weight :_ "+asu.description.weight
    fox += "\n*Weakness :* "+weak
    fox += "\n*Type :* "+tipe
    wa.sendMediaURL(msg.to, asu.img, fox)
}
textListener(pokemon, true, false, /^.pokemon (.*)$/)

async function gichar(wa, msg){
	const query = msg.pattern[1]
	const respon = await requests("http://hujanapi.xyz/api/gichar?query="+query+"&apikey=YOUR_APIKEY")
	const datas = await respon.json()
    const asu = datas.result
    let fox = "*Detail Character*\n"
    fox += "\n*Title :* " + asu.title
    fox += "\n*Info :* " + asu.intro
    wa.sendMediaURL(msg.to, asu.cover1, fox)
    await wa.sendMediaURL(msg.to, asu.cv[0].audio[2])
}
textListener(gichar, true, false, /^.gichar (.*)$/)

command_res = '```.anime \nthis command anime update from gogoAnime```\n'
command_res += '```.randomwaifu \nget image waifu random```\n'
command_res += '```.randomloli \nget image loli random```\n'
command_res += '```.randompokemon \nget pokemon random```\n'
command_res += '```.pokemon \nget pokemon search```\n'
command_res += '```.gichar \nget Detail Character Genshin Impact```\n'
command_help['anime'] = command_res
