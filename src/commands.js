const utils = require('./utils');

function quit() {
  return process.exit(0);
}

function guild(state, ui, session, param) {
  const list = session.client.guilds
    .sort((guild1, guild2) => guild1.position - guild2.position);
  const namesAndIds = list.map(guild => [guild.name, guild.id]);

  ui.other.popup(namesAndIds, function (val) {
    session.guild = list.find('id', val);
    session.channel = session.guild.channels.first();
  });
}

function channel(state, ui, session, param) {
  const guild = session.guild;
  if (guild.id == undefined) { // Output error

  } else { // Otherwise do popup
    const list = guild.channels
      .filter(channel => channel.type === 'text')
      .sort((channel1, channel2) => channel1.position - channel2.position);
    const namesAndIds = list.map(channel => [channel.name, channel.id]);
    ui.other.popup(namesAndIds, val => session.channel = list.find('id', val));
  }
}

const toExport = {
  quit: quit,
  q: quit,

  guild: guild,
  server: guild,
  s: guild,
  g: guild,

  channel: channel,
  c: channel,
};

module.exports = toExport;