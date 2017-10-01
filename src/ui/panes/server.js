const Blessed = require('blessed');
const utils = require('../../utils.js');
const config = require('../settings.json');

const settings = config;

function heightOffset(boxSettings) {
  return boxSettings.top + boxSettings.height;
}
function widthOffset(boxSettings) {
  return boxSettings.left + boxSettings.width;
}

const settings_title = {
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

const settings_chat = {
  top: heightOffset(settings_title),
  left: 0,
  height: 20,
  width: 20,
  content: 'Hello {bold}chat{/bold}!',
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

const settings_users = {
  top: heightOffset(settings_title),
  left: widthOffset(settings_chat),
  height: settings_chat.height,
  width: settings.userList_width,
  content: 'Hello {bold}users{/bold}!',
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
    pane.append(privates.chat);
    pane.append(privates.userList);
  },
};

function server(screen, client, pane) {
  //const toAdd = { parent: pane };
  const privates = {
    screen: screen,
    client: client,
    title: Blessed.text(settings_title),
    chat: Blessed.text(settings_chat),
    userList: Blessed.text(settings_users),
  };

  return utils.mix(Object.create(null), mixin, [privates]);
}

module.exports = server;