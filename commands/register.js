const { access, constants, writeFile } = require('fs');
const Buffer = require('buffer').Buffer 
const Logger = require('../services/logger');

module.exports = {
    name: "register",
    description: "Register new user for the bot",
    execute(message, args) {

        let filepath = 'data/' + message.author.id + '.json';
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        if(!Array.isArray(args)) {
            message.author.send('Please enter arguments after register command');
            Logger.log(`user ` + message.author.tag + ` forget args`);
            return;
        }

        if(typeof args[0] != 'string' || typeof args[1] != 'string') {
            message.author.send('Please enter string arguments after register command');
            Logger.log(`user ` + message.author.tag + ` enter invalid args types`);
            return;
        }

        //check myges login
        
        access(filepath, constants.F_OK, (e) => {
            if(e) {
                let data = {
                    "id": message.author.id,
                    "username": message.author.username,
                    "myges_username": args[0],
                    "myges_password": args[1],
                    "myges_token": Buffer.from(args[0] + ':' + args[1]).toString('base64'),
                    "tag": message.author.tag,
                    "register_at": date,
                    "update_at": date,
                }

                writeFile(filepath, JSON.stringify(data), (e) => {
                    if(e) {
                        message.reply('Une erreur est survenue contacter l\'administrateur.')
                            .then(() =>
                                Logger.err(),
                                message.delete())
                            .catch(console.error);
                    } else {
                        Logger.log(`${message.author.tag} file created...`, `info`)
                        message.author.send('Inscription effectué!')
                            .then(() =>
                                Logger.log(`${message.author.tag} is now registered...`, `info`),
                                message.delete())
                            .catch(console.error);
                    }
                })
            } else {
                Logger.log(`${message.author.tag} file already exist.`, `info`)
                message.author.send('Vous etes déjà inscrit')
                    .then(() =>
                        Logger.log(`${message.author.tag} is now registered.`, `info`),
                        message.delete())
                    .catch(console.error);
            }
        })
    }
}