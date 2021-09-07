const { access, constants, writeFile } = require('fs');

module.exports = {
    name: "register",
    description: "Register new user for the bot",
    execute(message) {
        let filepath = 'data/' + message.author.id + '.json';

        access(filepath,  constants.F_OK, (e) => {
            if(e) {
                let data = {
                    "id": message.author.id,
                    "username": message.author.username,
                    "myges_username": "",
                    "myges_password": "",
                    "myges_token": "",
                    "tag": message.author.tag,
                    "register_at": Date.now(),
                    "update_at": Date.now(),
                }

                writeFile(filepath, JSON.stringify(data), (e) => {
                    if(e) {
                        message.reply('Une erreur est survenue contacter l\'administrateur.')
                            .then(() =>
                                console.log(`[log] ` + Date.now() + ` : ${message.author.username} is now registered`))
                                message.delete()
                            .catch(console.error);
                    } else {
                        console.log(`[log] ` + Date.now() + ` : ${message.author.username} file created...`)
                        message.author.send('Inscription effectué!')
                            .then(() =>
                                console.log(`[log] ` + Date.now() + ` : ${message.author.username} is now registered`))
                                message.delete()
                            .catch(console.error);
                    }
                })
            } else {
                console.log(`[log] ` + Date.now() + ` : ${message.author.username} file already exist`)
                message.author.send('Vous etes déjà inscrit')
                    .then(() =>
                        console.log(`[log] ` + Date.now() + ` : ${message.author.username} is now registered`))
                        message.delete()
                    .catch(console.error);
            }
        })
    }
}