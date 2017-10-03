const Blessed = require('blessed');
const Utils = require('../../utils.js');
const config = require('../settings.json');

const settings = {
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  //content: 'Hello {bold}servers{/bold}!',
  tags: true,
  padding: 0,
  mouse: true,
  scrollbar: { bg: 'blue' },
  scrollable: true,
  keyboard: true,

  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
  }
};

const mixin = {
  appendTo: function (privates, pane) {
    //privates.window.on('mousedown', function (mouse) {
    //  Utils.log(mouse,2);
    //});
    pane.append(privates.window);
  },

  populate: function (privates, serverList) {
    privates.window.setItems(serverList.map(function (server) { return server.name }));
  },
};

const events = {
  select: function (event) {
    Utils.log(event, 2);
  },
};

function server(client) {
  const privates = {
    client: client,
    window: Blessed.list(settings),
  };

  privates.window.on('select', events.select);
  privates.window.focus();

  return Utils.mix(Object.create(null), mixin, [privates]);
}

module.exports = server;