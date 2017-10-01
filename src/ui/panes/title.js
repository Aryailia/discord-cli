const Blessed = require('blessed');
const utils = require('../../utils.js');
const config = require('../settings.json');

const settings = {
  top: 0,
  left: 0,
  height: 1,
  width: '100%',
  content: 'Hello {bold}title{/bold}!',
  tags: true,
  padding: 0,
  scrollbar: true,
  scrollable: true,

  style: {
    fg: 'white',
    //bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
};

const mixin = {
  appendTo: function (privates, pane) {
    pane.append(privates.title);
  },
};

function server(screen, client, pane) {
  //const toAdd = { parent: pane };
  const privates = {
    screen: screen,
    client: client,
    title: Blessed.text(settings),
  };

  return utils.mix(Object.create(null), mixin, [privates]);
}

module.exports = server;