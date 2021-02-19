(https://telegra.ph/file/4a5cf88056bee20b1c45d.jpg)

# wabotjs
This is unofficial Whatsapp Web API - Use at your own risk!!!

Install the dependencies and devDependencies and start the server.

```sh
#Cloning This Repositories
$ git clone https://github.com/rynkings/wabotjs

# Open Directory
$ cd wabotjs

# Install Module
$ npm i

# Running Program
$ npm start
*/Or
# Autorestart when save file 
$ npm autorestart
```

### Register event like decorators
```js
async function listen(client, message){
    console.log(message);
    console.log(message.pattern[1])
    client.sendMessage(message.to, 'Hi too');
}

textListener(listen, false, true, /^.hi(?: |$)(.*)/, false, false);
```

To make it easier if there is an Error Change in `data/setting.json` by using your number or with the ID Groups:

```json
// The setting.json example
{
	"logs": false,
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