const fs = require('fs');
const discord = require('discord.js');
const config = require('./config');
const client = new discord.Client({ intents: config.discord_intents});
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
  
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`I'm ready, I'm waiting for commands....`)
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
  
client.login(config.discord_token)