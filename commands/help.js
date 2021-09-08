const message = require('../services/message')

module.exports = {
    name: 'help',
    description: 'list of commands.',
    execute(_message) {
      return message.send(
        _message, 
        'List of commands : \n\n<=================================>\n  !help   : list of commands\n  !ping   : get a ping response\n  !server : get server info\n<=================================>\n',
        'code'
      )
    }
};
