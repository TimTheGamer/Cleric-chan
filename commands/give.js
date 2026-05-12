const Discord = require('discord.js');
const { EmbedBuilder} = require('discord.js');

const giveHelpEmbed = new EmbedBuilder()
        .setColor('#ee1c23')
        .setDescription(
        '### How To Use\n```\n% give <role>\n\nSECT ROLES:\nharuhi\nkyon\nnagato\nmikuru\nituski\ntsuruya\nimouto\nryoko\nemiri\n\nMISC ROLES:\ndw\n```'
    )

module.exports = {
  name: 'give',
  description: 'Gives one or more roles to the user',
  execute(message, args) {
    const roles = {
      haruhi: '431946224384475153',
      kyon: '307910159328477184',
      nagato: '426206852125294613',
      mikuru: '426206768536879115',
      itsuki: '426207026759204864',
      tsuruya: '861561125032558603',
      ryoko: '861561351927627806',
      emiri: '861561459170082836',
      imouto: '861561663554846782',
      //miscellaneous roles
      dw: '795261822185504789',
      mudae: '1477128150843396190',
      //alternative role names
      suzumiya: '431946224384475153',
      yuki: '426206852125294613',
      asahina: '426206768536879115',
      koizumi: '426207026759204864',
      asakura: '861561351927627806',
      kimidori: '861561459170082836',
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
      message.reply(`You have successfully assigned the following roles: ${grantedRoles.join(', ')}`);
      console.log(`\nA user has self-assigned the following roles: ${grantedRoles.join(', ')}\n`);
    }

    if (invalidRoles.length) {
      message.reply(`the following roles are invalid: ${invalidRoles.join(', ')}`);
	message.channel.send({ embeds: [giveHelpEmbed]});
      console.log(`\nA user has entered the following invalid roles: ${invalidRoles.join(', ')}\n`);
    }
  },
};
