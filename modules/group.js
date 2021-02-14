const { event, wa, command_help, textListener } = require('../bot.js')

async function groupList(client, msg){
    var glist = await wa.getGroups(msg.key.remoteJid)
    let gid = []
    let fox = "*Groups List*\n"
    let no = 0
    for (let a of glist) {
        const name = event.contacts[a].name
        const groupid = event.contacts[a].jid
        no += 1
        fox += "\n"+no+". "+name+" | "+groupid
        gid.push(a)
    }
    fox += "\n\nTotal: "+gid.length
    wa.sendMessage(msg.key.remoteJid, fox)
}
textListener(groupList, false, true, /^\.grouplist/);

async function groupTag(wa, message){
    to = message.to;
    if (!message.isGroup) return wa.sendMessage(to, 'Only Group')
    const ginfo = await wa.getGroup(to)
    var xyz = await wa.getParticipantIds(to)
    let mids = []
    let fox = "*Tag All Groups*\n"
    let no = 0
    for (let mem of xyz) {
        no += 1
        fox += "\n" + no + ". @!"
        mids.push(mem)
    }
    fox += "\n\nName: "+ginfo.subject+"\nMember: "+mids.length+"\n\n𝗦𝗘𝗟𝗙𝗕𝗢𝗧-𝗪𝗔"
    wa.sendReplyWA(to, fox, "HujanAPI.xyz", mids)
}
textListener(groupTag, false, true, /^\.tagall/);

command_help['group'] = '```.grouplist```\nto see list of your groups\n' + '```.tagall```\nto mention all members in your group\n'