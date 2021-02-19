const { event, wa, command_help, textListener, printLogs } = require('../bot.js')

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
textListener(groupList, true, false, /^\.grouplist/);

async function groupinfo(client, msg){
    const to = msg.to
    const pict = await wa.getPict(to)
    const g = await wa.getGroup(to)
    const admin = await wa.getAdminIds(to)
    const owner = await wa.getOwnerIds(to)
    const members = await wa.getParticipantIds(to)
    const milliseconds = g.creation * 1000
    const dateObject = new Date(milliseconds)
    const createdtime = dateObject.toLocaleString()
    if (g.desc == undefined){
        g.desc = "None"
    }
    let ginfo = "*- Group Information -*\n"
    ginfo += "\n*Group Name:*  \n"+g.subject
    ginfo += "\n*Group ID:*  \n"+g.id
    ginfo += "\n*Owner:* @!"
    ginfo += "\n\n*- Member Information -*"
    ginfo += "\n*Admin:*  _"+admin.length+"_"
    ginfo += "\n*Participant:*  _"+members.length+"_"
    ginfo += "\n\n*- History Information -*"
    ginfo += "\n*Created:*  \n"+createdtime
    ginfo += "\n\n*- Description -*"
    ginfo += "\n "+ g.desc
    wa.sendMediaURL(to, pict, ginfo, owner)
}
textListener(groupinfo, true, false, /^\.groupinfo/);

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
    wa.sendReplyWA(to, fox, "WabotJS", mids)
}
textListener(groupTag, true, false, /^\.tagall/);

async function adminGroup(wa, msg){
    to = msg.to;
    var xyz = await wa.getAdminIds(to)
    let mids = []
    let fox = "*Admin Groups*\n"
    let no = 0
    for (let mem of xyz) {
        no += 1
        fox += "\n" + no + ". @!"
        mids.push(mem)
    }
    fox += "\n\nTotal: "+mids.length
    wa.sendMention(to, fox, mids)
}
textListener(adminGroup, true, false, /^\.admingroup$/);

async function groupPict(wa, msg){
    to = msg.to;
    const pict = await wa.getPict(to)
    wa.sendMediaURL(to, pict)
}
textListener(groupPict, true, false, /^\.grouppict/);

async function groupLink(wa, msg){
    to == msg.to;
    const code = await wa.getGroupInvitationCode(to)
    await wa.sendMessage(to, code)
}
textListener(groupLink, true, false, /^\.grouplink/);

async function groupDescriptionChange(wa, msg){
    to = msg.to;
    if (msg.pattern[1]){
        var textt = msg.pattern[1]
        try {
            await event.groupUpdateDescription(to, textt)
        } catch {
            wa.sendReply(to, "Failed\nOnly Admin can settings group desc")
        }
    } else {
        var g = await wa.getGroup(to);
        if (g.desc === undefined){
            g.desc = "This group doesn't have group description"
        }
        wa.sendMessage(to, g.desc)
    }
}
textListener(groupDescriptionChange, true, false, /^\.groupdesc(?: |$)(.*)/);

async function groupSubjectChange(wa, msg){
    to = msg.to;
    if (msg.pattern[1]){
        var textt = msg.pattern[1]
        try {
            await event.groupUpdateSubject(to, textt)
        } catch {
            wa.sendReply(to, "Failed\nOnly Admin can settings group name")
        }
    } else {
        var g = await wa.getGroup(to);
        if (g.subject === undefined){
            g.subject = "This group doesn't have group name"
        }
        wa.sendMessage(to, g.subject)
    }
}
textListener(groupSubjectChange, true, false, /^\.groupname(?: |$)(.*)/);

command_res = "```.grouplist```\nto see list of your groups\n"
command_res = "```.groupinfo```\nto see info of your groups\n"
command_res += "```.tagall```\nto mention all members in your group\n"
command_res += "```.admingroup```\nto see admins in your group\n"
command_res += "```.grouplink```\nto get group invited link\n"
command_res += "```.grouppict```\nto get pict group\n"
command_res += "```.groupdesc (text / no)```\nto set or get your group description if this bot is admins"
command_res += "```.groupname (text / no)```\nto set or get your group name if this bot is admins"

command_help['group'] = command_res