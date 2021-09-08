const message = require('../services/message')

module.exports = {
    name: 'ping',
    description: 'Run a ping command.',
    execute(_message) {
      message.send(_message, 'Pong!')
    }
};
