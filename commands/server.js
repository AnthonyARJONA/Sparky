const message = require('../services/message')

module.exports = {
    name: 'server',
    description: 'Server informations.',
    execute(_message) {
      return message.send(_message, `Nom du serveur : ${_message.guild.name}\nNombre d'utilisateurs : ${_message.guild.memberCount}`);
    }
};