const config = require('../config');

module.exports = {
    name: 'ping',
    description: 'Run a ping command.',
    execute(message) {
      message.channel
        .send('Pong.')
        .then(() => console.log(`[log] ` + Date.now() + ` : Replied to message ${message.id} from ${message.author.username}`))
        .catch(console.error);;
    }
};
