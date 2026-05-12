const Discord = require('discord.js');

module.exports = {
    name: 'helloworld',
    description: "this is a hello world command",
    execute(message, args){
         message.channel.send('Hello, world.');
    }
}
