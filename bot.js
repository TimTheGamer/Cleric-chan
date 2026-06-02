const Discord = require('discord.js');
const cron = require('node-cron');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

require('dotenv').config();
const token = process.env.BOT_TOKEN;

const client = new Discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Channel
	]
});

const prefixes = ["% ", "Cleric-chan "];
const noCommReplies = [
  "I do not have a response to that.",
  "There is no such command.",
  "What?"
];
const fs = require('fs');

//const BOTCHANN = 308622744927469570;
//const MODROLE = 307904310006644744;
//const MODERROLE = 749704622154973266;

//commands folder
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//ready event
client.once('clientReady', (client) => {
   console.log(`${client.user.tag} is online`);
});

//commands
client.on('messageCreate', message => {
  try {
    if (message.author.bot) return;

    const usedPrefix = prefixes.find(p => message.content.toLowerCase().startsWith(p.toLowerCase()));
    if (!usedPrefix) return;

    const args = message.content.slice(usedPrefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    console.log('Received command:', commandName);
    console.log('Command arguments:', args);

    const command = client.commands.get(commandName);
    if (!command) {
	const randomReply = noCommReplies[Math.floor(Math.random() * noCommReplies.length)];
        return message.reply(randomReply);
    }

    command.execute(message, args);
  } catch (error) {
    console.error('Error occurred while processing message event:', error);
  }
});

//welcome
client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '1101143116477648957');
    if (welcomeChannel) {
        welcomeChannel.send(`Welcome to our holy server, ${member}. Please enjoy your stay.`);
	welcomeChannel.send(`If you want to access the rest of the server, go ahead and tell me what sect(s) you belong to in <#308622744927469570>.`);
	welcomeChannel.send("You can type `% help` there to get started. Once you have a role self-assigned, ping <@&307904310006644744>, and he'll grant you access as soon as he is able.");
    }
});

//automod
client.on('messageCreate', async message => {
	// Ignore message from bots
	if (message.author.bot) return;

	// Fetch the member who sent the message
	const member = await message.guild.members.fetch(message.author.id);
	const hasRole = member.roles.cache.some(role => role.name === "Church Member");
	if (!hasRole) {
		// Delete message
		if (message.content.includes('https://') || message.content.includes('http://') || message.content.includes('.gg') || message.content.includes('.com')){
			await message.delete().catch(err => {});
			await message.channel.send('<@' + message.author.id + '>, you cannot send links, as you are not a church member.');
			// Log the delete message
			const logChannel = client.channels.cache.get('1224081556906442946');
			if (logChannel) {
				const logMessage = 'Deleted message from <@' + message.author.id + '> in #' + message.channel.name +  ':\n\n"' + message.content + '"';
				await logChannel.send(logMessage).catch(err => {});
			}
		}
	}
});

//mudae ban
client.on('messageCreate', async message=> {
	const roleId = "1357874314753609824";

	if (message.author.bot) return;

	if (/\$wishdm (y y y|n y y|n y n|n n y)/.test(message.content)){
		message.member.roles.add(roleId);
      		message.reply("You are banned from playing Mudae. Please do the command `$wishdm n n n` to unban yourself.");
	} else if (/\$wishdm (n n n)/.test(message.content)){
		if (message.member.roles.cache.has(roleId)) {
			message.member.roles.remove(roleId);
			message.reply("You have been successfully unbanned.");
		} else {
			message.reply("Good.");
		}
	}
});

client.login(token);
