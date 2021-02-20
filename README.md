
## TE[A]MAN BOT <img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/hmm.gif" width="29px">
<img align="center" height="auto" src="https://telegra.ph/file/4a5cf88056bee20b1c45d.jpg"/>


# wabotjs
This is unofficial Whatsapp Web API - Use at your own risk!!!

Install the dependencies and devDependencies and start the server.

### Usage
```sh
$ git clone https://github.com/rynkings/wabotjs
$ cd wabotjs
$ npm i
```
```sh
# Running Program
$ npm start
*/Or
# You can run with automatically restart when you edit the file
$ supervisor main.js
```

### Register event like decorators
```js
async function listen(client, message){
    console.log(message);
    console.log(message.pattern[1])
    client.sendMessage(message.to, 'Hi too');
}

textListener(listen, false, true, /^.hi(?: |$)(.*)/, false, false);
// textListener having some parameters
// func: *Decorator function*
// incoming: *Receiving message from user*
// outgoing: *Receiving message from self user*
// pattern: *for command*
// mode: *for switch mode*
// owners: *for filter the user*
```

To make it easier if there is an Error Change in `data/setting.json` by using your number or with the ID Groups:

```json
// The setting.json example
{
	"logs": false, //make it true if you want to use the bot to sending you some error logs or some notification from the bot
	"logs_id": "Put_YOUR_NUMBER_OR_GROUP_ID",
	"mode": "public",
	"owners": []
}
```
## Author
* [`Ami`](https://github.com/amisama)
* [`Ryns`](https://github.com/rynkings)
* [`Rahmat`](https://github.com/mamet8)

## Special Thank To
* [`Zero Cool`](https://github.com/crash-overide404)
* [`Baileys`](https://github.com/adiwajshing/Baileys)