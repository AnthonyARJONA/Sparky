const message = require('../services/message')

module.exports = {
    name: 'ping',
    description: 'Run a ping command.',
    execute(_message) {
      return message.reply(_message, 'Pong!')
    }
};
