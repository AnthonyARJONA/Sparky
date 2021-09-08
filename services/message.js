const Logger = require('./logger');

module.exports = class message {

    static send(message, content, type = 'default') { //type : default, code
        if(type === 'default') return message.channel.send(content)
            .then(() => Logger.log("Replied to message " + message.id + " from " + message.author.username))
            .catch(console.error);;

        if(type === 'code') return message.channel.send(`\`\`\`${content}\`\`\``)
            .then(() => Logger.log("Replied to message " + message.id + " from " + message.author.username))
            .catch(console.error);;

        return;
    }

    static reply(message, content, type = 'default') {
        if(type === 'default') return message.channel.send(content)
            .then(() => Logger.log("Replied to message " + message.id + " from " + message.author.username))
            .catch(console.error);;

        if(type === 'code') return message.channel.send(`\`\`\`${content}\`\`\``)
            .then(() => Logger.log("Replied to message " + message.id + " from " + message.author.username))
            .catch(console.error);;
        return; 
    }

}