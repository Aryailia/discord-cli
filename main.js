const Discord = require('discord.js');
const ui = require('./src/cli.js');
const login = require('./private/login.json');


const client = new Discord.Client();
const session = {
  client: client,
  guild: Discord.Guild,
  channel: Discord.Channel,
};

client.on('ready', function () {
  ui.init(session);
});

console.log(session.guild.id);

/*client.on('message', function (msg) { 
  // @todo check if still part of guild? 
  const guild = sess
  if (session.guild.id === msg.guild.id && session.channel ) {

  }
});*/

client.login(login.token);