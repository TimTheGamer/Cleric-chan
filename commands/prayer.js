const Discord = require('discord.js');
const { EmbedBuilder} = require('discord.js');
const cron = require('node-cron');

const prayerEmbed = new EmbedBuilder()
	.setColor('#ee1c23')
	.setDescription(
        'Our Lady, who art in North High School,\nWe pray that you are happy with your creation,\nWe pray that you are happy with yourself,\nWe pray that like you we will strive to save the world by overloading it with fun in your name.\n\nMay you be guided in your infinite eccentricity by your friends.\nWe pray to the aliens. May the Data Overmind protect you with its infinite knowledge.\nWe pray to the time travellers. May they let us know of what is to come and how to make it even better.\nWe pray to the espers. May they protect us from the destruction of the Celestials and from Closed Spaces.\nWe pray to the rest of humanity. Let us share in our fun, for making you happy makes us happy.\n\nPlease remember us in our prays.\nありがとうございます'
    );

const PRAYER_CHANNEL_ID = '584918854392610828';

module.exports = {
    name: 'prayer',
    description: "bot will recite the prayer",
    execute(message, args){
         message.channel.send({ embeds: [prayerEmbed]});
    },

    schedule(client) {
    	// Cron format: sec min hour day month weekday
	// '0 0 9 * * *' = every day at 09:00:00
	cron.schedule('0 0 9 * * *', async () => {
		try {
			const channel = await client.channels.fetch(PRAYER_CHANNEL_ID);
			if (!channel) return console.error('Prayer channel not found.');
			await channel.send({ embeds: [prayerEmbed] });
			console.log('Time for the daily prayer.');
		} catch (err) {
			console.error('Failed to send the daily prayer:', err);
		}
	}, {
		timezone: 'America/Toronto'
	});
	console.log('Prayer scheduler started (9:00 AM America/New_York).');
    }
};
