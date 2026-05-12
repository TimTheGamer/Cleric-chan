//THIS FUNCTIONALITY IS FOR LATER
const Discord = require('discord.js');
const { EmbedBuilder} = require('discord.js');

const joinHelpEmbed = new EmbedBuilder()
        .setColor('#ee1c23')
        .setDescription(
        '### How To Use\n```\n% join <role>\n\nCHURCH ORDER ROLES:\nholy\njudiciaryorder\n```'
    )

module.exports = {
  name: 'join',
  description: 'Gives the user a Church Order role',
  execute(message, args) {
    const roles = {
      holy: '1376704709632462928',
      judiciary: '1376705159060783164',
    };

    if (!args.length) {
      message.reply("you didn't specify any roles!");
      console.log('\nA user has not entered any roles!\n');
      return;
    }

    const grantedRoles = [];
    const invalidRoles = [];

    for (const arg of args) {
      const roleName = arg.toLowerCase();
      if (roles[roleName]) {
        grantedRoles.push(arg);
      } else {
        invalidRoles.push(arg);
      }
    }

    if (grantedRoles.length) {
      message.member.roles.add(grantedRoles.map(r => roles[r.toLowerCase()]));
      message.reply(`You have successfully applied to join the following: ${grantedRoles.join(', ')}`);
      console.log(`\nA user has applied to join the following: ${grantedRoles.join(', ')}\n`);
    }

    if (invalidRoles.length) {
      message.reply(`the following roles are invalid: ${invalidRoles.join(', ')}`);
	message.channel.send({ embeds: [joinHelpEmbed]});
      console.log(`\nA user has entered the following invalid roles: ${invalidRoles.join(', ')}\n`);
    }
  },
};
