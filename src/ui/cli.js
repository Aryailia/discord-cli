const Blessed = require('blessed');
const components = {
  server: require('./panes/server.js'),
  inputMethod: require('./panes/input.js'),
  channelList: require('./panes/channelList.js'),
};
const settings = require('./settings.json');

function widthOffset(boxSettings) {
  return boxSettings.left + boxSettings.width;
}
function heightOffset(boxSettings) {
  return boxSettings.top + boxSettings.height;
}
function addSettings(settings, toAdd) {
  Object.keys(toAdd).forEach(function (key) {
    settings[key] = toAdd[key];
  });
}

module.exports = {
  chat: function (screen, client) {
    // Create a box perfectly centered horizontally and vertically.
    const settings_servers = {
      top: 0,
      left: 0,
      height: '100%',
      width: 8,
      content: 'Hello {bold}servers{/bold}!',
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
    
    const channelPane = Blessed.box({
      top: 0,
      left: widthOffset(settings_servers),
      height: '100%',
      width: settings.channelList.width,
      //content: 'Hello {bold}channels{/bold}!',
    });
    const mainPane = Blessed.box({
      top: 0,
      left: widthOffset(channelPane.position),
      height: `100%-${settings.input_height}`,
      width: screen.width - (channelPane.position.left + channelPane.width),
    });
    const inputPane = Blessed.box({
      top: heightOffset(mainPane.position),
      left: widthOffset(channelPane.position),
      height: settings.input_height,
      width: screen.width - widthOffset(channelPane.position),
    });

    const servers = Blessed.text(settings_servers);
    const disp = components.server(screen, client);
    disp.appendTo(mainPane);
    const input = components.inputMethod(client);
    input.appendTo(inputPane);
    const channelList = components.channelList(client);
    channelList.appendTo(channelPane);
    //const channels = Blessed.text(settings_channels);

    // Append our box to the screen.
    screen.append(servers);
    screen.append(channelPane);
    screen.append(inputPane);
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
    servers.on('click', function(data) {
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
  },
};