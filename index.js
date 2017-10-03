"use strict";

const Blessed = require('blessed');
const Discord = require('discord.js');
const Utils = require('./src/utils.js');
const login = require('./private/login.json');
const cli = require('./src/ui/cli.js');

/*const crypto = require('crypto');
function secureEmail(email, password) {
	return new Buffer(crypto.createHash("sha256").update(email + password, "utf8").digest()).toString("hex");
}*/

const client = new Discord.Client();

// Create a screen object.
const screen = Blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  cursor: {
    blink: true,
    shape: 'underline'
  },
});

screen.title = 'my window title';

const ui = cli.init(screen, client);

// Quit on Control-Q, or Control-C.
screen.key(['C-q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();

client.on('ready', function () {
//  console.log('Logged in as ${client.user.tag}!');
  /*client.guilds.map(function (value, key) {
    //Utils.log(value.name, 0);
    //console.error(value.name);
    Utils.log(value.name, 0);
  });*/
  ui.serverList.populate(client.guilds);
  screen.render();
  //console.log(client.guilds);
  //console.log(Object.getOwnPropertyNames(client.guilds));
  //console.log(Utils.stringify(client.guilds['_keyArray'], 2));
});

const state = {
  guildId: '',
  channelId: '320484682963746817',
};

client.on('message', function (msg) {
  if (msg.channel.id === state.channelId) {
    ui.chat.message(msg);
    //screen.render();
  }
});

//client.login(secureEmail(login.email, login.password));

client.login(login.token);
//*/