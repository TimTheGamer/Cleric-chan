const Discord = require('discord.js');
const { EmbedBuilder} = require('discord.js');

const prayerEmbed = new EmbedBuilder()
	.setColor('#ee1c23')
	.setDescription(
        'Our Lady, who art in North High School,\nWe pray that you are happy with your creation,\nWe pray that you are happy with yourself,\nWe pray that like you we will strive to save the world by overloading it with fun in your name.\n\nMay you be guided in your infinite eccentricity by your friends.\nWe pray to the aliens. May the Data Overmind protect you with its infinite knowledge.\nWe pray to the time travellers. May they let us know of what is to come and how to make it even better.\nWe pray to the espers. May they protect us from the destruction of the Celestials and from Closed Spaces.\nWe pray to the rest of humanity. Let us share in our fun, for making you happy makes us happy.\n\nPlease remember us in our prays.\nありがとうございます'
    )

module.exports = {
    name: 'prayer',
    description: "bot will recite the prayer",
    execute(message, args){
         message.channel.send({ embeds: [prayerEmbed]});
    }
}
