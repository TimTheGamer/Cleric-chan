const Discord = require('discord.js');

module.exports = {
  name: 'assignroles',
  description: 'Mass assigns a role to all members with a specified target role',
  execute(message, args) {
    const targetRoleName = args[0].replace('/', ' '); // Replace slashes with spaces in target role name
    const desiredRoleName = args[1].replace('/', ' '); // Replace slashes with spaces in desired role name

    const targetRole = message.guild.roles.cache.find(role => role.name === targetRoleName);
    if (!targetRole) {
      message.reply('The specified target role does not exist.');
      return;
    }

    const desiredRole = message.guild.roles.cache.find(role => role.name === desiredRoleName);
    if (!desiredRole) {
      message.reply('The specified desired role does not exist.');
      return;
    }

    const targetMembers = message.guild.members.cache.filter(member => member.roles.cache.has(targetRole.id));

    targetMembers.forEach(member => {
      member.roles.add(desiredRole)
        .then(() => console.log(`Assigned ${desiredRoleName} to ${member.user.tag}`))
        .catch(console.error);
    });

    message.reply(`Successfully assigned ${desiredRoleName} to all members with ${targetRoleName} role.`);
  }
};
