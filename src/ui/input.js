const Blessed = require('blessed');
const Helpers = require('./../../lib/bothelpers/botwrapper');
const $ = require('./../../lib/bothelpers/fp');

const loader = Helpers.conditionalLoader(true, {
  commands: require.resolve('./../commands'),
});
loader.staticOnFalse();

const Discord = require('discord.js');
const dev = new Discord.Client(); // For jsdocs stuff with IDE

const mixin = {
};


const toExport = function (parentState, session) {
  const obj = Object.create(null);
  //session.client.guilds.map(function (guild) {
  //  parentState.body.pushLine(guild.name);
  //});
  const input = Blessed.textbox({
    bottom: 0,
    left: 0,
    height: 3,
    width: '100%',
    keys: true,
    mouse: true,
    inputOnFocus: true,
    style: {
      fg: 'white',
      bg: 'blue'	// Blue background so you see this is different from body
    }
  });
  parentState.screen.append(input);
  input.focus();
  //input.readInput();

  const state = {
    screen: parentState.screen,
    box: input,
  };
  //$.mixin(obj, state, mixin);
  
  
  // Handle submitting data
  input.on('submit', function (text) {
    const parsed = Helpers.validateParseCommand('/', Helpers.REGEX_SPACE, text);
    
    state.screen.focusPop();
    input.clearValue();
    input.focus();
    //input.readInput();
    
    if (parsed != null) {
      loader.dynamicOnTrue();
      const name = parsed[1];
      const param = parsed[2] == null ? '' : parsed[2];
      if (loader.commands.hasOwnProperty(name)) { 
        input.cancel();
        loader.commands[name](state, parentState, session, param);
      } else {
      }
    } else {
      parentState.body.send(text);
    }
    parentState.screen.render();
  });

  return(input);
};


module.exports = toExport;