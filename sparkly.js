const fs = require('fs');
const discord = require('discord.js');
const config = require('./config');
const Logger = require('./services/logger');

const client = new discord.Client({ intents: config.discord_intents});
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
  
client.on('ready', () => {

  let status_list = ['type !help for help', 'created by Mimso', "hello I'm Sparky"]
  let status = status_list[Math.floor(Math.random() * status_list.length)]

  setInterval(() => {
      client.user.setActivity(status, { type: 'WATCHING' })
  }, 60000)

  Logger.log(`Logged in as ${client.user.tag}!`)
  Logger.log(`I'm ready, I'm waiting for commands....`)

});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (!client.commands.has(command)) return;
  
    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Une erreur s'est produite pendaént l'exécution de la commande !");
    }
})

/*client.user.setActivity('type !help for help', { type: 'WATCHING' }) // STREAMING, WATCHING, CUSTOM_STATUS, PLAYING, COMPETING
.then(presence => Logger.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
*/

//client.on('guildMemberAdd', (member) => {
//  if(config.welcome_message === false) return;
//  let channel = discord.BaseGuildTextChannel()
//  channel.send
//})
  
client.login(config.discord_token)