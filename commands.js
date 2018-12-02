'use strict';
const discord = require('discord.js');
const config = require('./config.json');
const commands = {};
let client = null;

commands.purge = async (message, report, members) => {
  console.log(`Puring with ${message} ${report} ${members.length}`);
  let start = members.length;
  // for (let i = 0; i < 5; i++) {
  // setTimeout(async () => {
  while (members.length > 0) {
    console.log(`[${start}-${members.length}]`);
    let member = members.pop();
    let msg = await message.channel.send(`[${start}-${members.length}] This is a throughput test, would snap ${member.displayName}`);
    await msg.delete();
  }
  // }, 1);
  // }
};

commands.onMessage = (message) => {
  try {
    if (message.author.if === '129439015849033728' || client.user.id === '431980306111660062' && message.author.id === '159018622600216577') {
      if (message.content.toLowerCase() == config.phrase) {
        if (!message.guild.channels.has(config.channel_printout)) {
          message.author.send("Snap can't find the logging channel, the app will terminate.");
          process.exit();
        }
        console.log('Purging');
        let report = message.guild.channels.get(config.channel_printout);
        let purge = message.guild.members.filter(m => !m.user.bot && !m.roles.has(config.role_dont_kick)).array();
        commands.purge(message, report, purge);
      }
    }
  } catch (e) {
    console.error(`Error during onMessage\n${e}`);
  }
};

commands.init = cl => {
  client = cl;
  client.on('message', message => commands.onMessage(message));
};

module.exports = commands;
