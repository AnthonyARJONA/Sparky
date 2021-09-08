const { access, constants, writeFile, appendFile } = require('fs');
const config = require('../config');

module.exports = class Logger {


    static append(log_content) {
        let filepath = 'log';
        if(config.log === true) {
            appendFile(filepath, log_content + '\n', (err) => { if(err) throw err })    
        }
        return;
    }

    static log(message, type = 'info') {
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        let content = `[${type}] ${date} : ${message}`
        this.append(content);
        return console.log(content);
    }

    static err() {
        return this.log(`an error occured`, `error`);
    }

}