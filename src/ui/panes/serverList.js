const Blessed = require('blessed');
const utils = require('../../utils.js');
const config = require('../settings.json');

const settings = {
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  content: 'Hello {bold}servers{/bold}!',
  tags: true,
  padding: 0,
  scrollbar: true,
  scrollable: true,

  style: {
    fg: 'black',
    bg: 'white',
    border: {
      fg: '#f0f0f0'
    },
  }
};

const mixin = {
  appendTo: function (privates, pane) {
    pane.append(privates.window);
  },

  populate: function (privates, serverList) {
    let a = 1;
    const str = serverList.map(function (server) {
      //Utils.log(value.name, 0);
      //console.error(value.name);
      return server.name
    }).join('\n\n');

    privates.window.content = str;
    //privates.window.render();
/*    serverList.map(function (server) {
      utils.log(server.name);
//      utils.log(arguments);
//      utils.log(a++);
    });*/
  },
};

function server(client) {
  const privates = {
    client: client,
    window: Blessed.text(settings),
  };

  return utils.mix(Object.create(null), mixin, [privates]);
}

module.exports = server;