const Blessed = require('blessed');
const components = {
  serverList: require('./panes/serverList.js'),
  title: require('./panes/title.js'),
  chat: require('./panes/chat.js'),
  userList: require('./panes/userList.js'),
  inputMethod: require('./panes/input.js'),
  channelList: require('./panes/channelList.js'),
};
const settings = require('./settings.json');

function addSettings(settings, toAdd) {
  Object.keys(toAdd).forEach(function (key) {
    settings[key] = toAdd[key];
  });
}

module.exports = {
  init: function (screen, client) {
    const interface = {
      serverList: components.serverList(client),
      channelList: components.channelList(client),
      main: components.serverList(screen, client),
      title: components.title(client),
      chat: components.chat(client),
      userList: components.userList(client),
      inputMethod: components.inputMethod(client),
    };
    // Create a box perfectly centered horizontally and vertically.
    const serverPane = Blessed.box({
      left: 0,
      top: 0,
      height: '100%',
      width: settings.serverList.width,
    });
    const channelPane = Blessed.box({
      left: settings.serverList.width,
      top: 0,
      height: '100%',
      width: settings.channelList.width,
    });
    const mainPane = Blessed.box({
      left: settings.serverList.width + settings.channelList.width,
      top: 0,
      height: '100%',
      width: screen.width - (channelPane.position.left + channelPane.width),
    });
    const titlePane = Blessed.box({
      left: 0,
      top: 0,
      height: settings.title.height,
      width: '100%',
    });
    const chatPane = Blessed.box({
      left: 0,
      top: titlePane.position.top + titlePane.height,
      width: `100%-${settings.channelList.width}`,
      height: `100%-${settings.title.height + settings.inputMethod.height}`,
    });
    const userListPane = Blessed.box({
      left: `100%-${settings.channelList.width}`,
      top: titlePane.position.top + titlePane.height,
      width: settings.channelList.width,
      height: `100%-${settings.title.height + settings.inputMethod.height}`,
    });
    const inputMethodPane = Blessed.box({
      left: 0,
      top: `100%-${settings.inputMethod.height}`,
      width: '100%',
      height: settings.input_height,
    });
    
    interface.serverList.appendTo(serverPane);
    interface.channelList.appendTo(channelPane);
    
    mainPane.append(titlePane);
    mainPane.append(chatPane);
    mainPane.append(userListPane);
    mainPane.append(inputMethodPane);
    interface.title.appendTo(titlePane);
    interface.chat.appendTo(chatPane);
    interface.userList.appendTo(userListPane);
    interface.inputMethod.appendTo(inputMethodPane);
    //const channels = Blessed.text(settings_channels);

    // Append our box to the screen.
    screen.append(serverPane);
    screen.append(channelPane);
    screen.append(mainPane);
    
    // Add a png icon to the box
    /*const icon = Blessed.image({
      parent: servers,
      top: 0,
      left: 0,
      type: 'overlay',
      width: 'shrink',
      height: 'shrink',
      file: __dirname + '/my-program-icon.png',
      search: false
    });*/

    // If our box is clicked, change the content.
    serverPane.on('click', function(data) {
      //box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
      //screen.render();
    });


    // If box is focused, handle `enter`/`return` and give us some more content.
    /*servers.key('enter', function(ch, key) {
      servers.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
      servers.setLine(1, 'bar');
      servers.insertLine(1, 'foo');
      screen.render();
    });*/
    
    // Focus our element.
    //input.focus();
    return interface;
  },

  serverView: function () {
  },

  privateView: function () {
  },

  chat: function () {
  },
};