const process = require('process')
const message = require('../services/message')

module.exports = {
    name: 'uptime',
    description: 'Sparky uptime information.',
    execute(_message) {
      return message.send(_message, process.uptime().toString ?? "error")
    }
};