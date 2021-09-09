const process = require('process')
const message = require('../services/message')

module.exports = {
    name: 'uptime',
    description: 'Sparky uptime information.',
    execute(_message) {
      return message.reply(_message, `Je suis en ligne depuis : ${Math.trunc(process.uptime())} secondes`)
    }
};