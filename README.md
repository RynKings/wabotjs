# wabotjs
This is unofficial Whatsapp Web API - Use at your own risk!!!

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/rynkings/wabotjs
$ cd wabotjs
$ npm i
$ npm start
```

### Register event like decorators
```js
async function listen(client, message){
    console.log(message);
    console.log(message.pattern[1])
    client.sendMessage(message.to, 'Hi too');
}

textListener(listen, false, true, /^.hi(?: |$)(.*)/);
```
