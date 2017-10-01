"use strict";

const Blessed = require('blessed');
const Discord = require('discord.js');
const login = require('./private/login.json');
const cli = require('./src/ui/cli.js');

/*const crypto = require('crypto');
function secureEmail(email, password) {
	return new Buffer(crypto.createHash("sha256").update(email + password, "utf8").digest()).toString("hex");
}*/

const client = new Discord.Client();

// Create a screen object.
var screen = Blessed.screen({
  smartCSR: true,
  cursor: {
    blink: true,
    shape: 'underline'
  },
});

screen.title = 'my window title';

cli.chat(screen, client);

// Quit on Control-Q, or Control-C.
screen.key(['C-q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();

client.on('ready', function () {
//  console.log('Logged in as ${client.user.tag}!');
});

client.on('message', function (msg) {

  //console.log(msg.content);
});

//client.login(secureEmail(login.email, login.password));
client.login(login.token);
//*/