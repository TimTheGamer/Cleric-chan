const Discord = require('discord.js');
const { EmbedBuilder} = require('discord.js');

const prayerEmbed = new EmbedBuilder()
	.setColor('#ee1c23')
	.setDescription(
        '# Cleric-chan Syntax\n`% <command> <args>`\n\n## Commands\n`help` --> displays a list of Cleric-chan commands\n\n`give` --> Allows the user to self-assign roles\n### How To Use\n```\n% give <role>\n\nSECT ROLES:\nharuhi\nkyon\nnagato\nmikuru\nituski\ntsuruya\nimouto\nryoko\nemiri\n\nMISC ROLES:\ndw\nmudae\n```\n`prayer` --> Recites the prayer'
    )

module.exports = {
    name: 'help',
    description: "lists usable commands",
    execute(message, args){
         message.channel.send({ embeds: [prayerEmbed]});
    }
}
