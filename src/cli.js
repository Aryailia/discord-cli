const Blessed = require('blessed');
const Helpers = require('./../lib/bothelpers/botwrapper');
const $ = require('./../lib/bothelpers/fp');

const ui = {
  body: require('./ui/body'),
  output: require('./ui/output'),
  input: require('./ui/input'),
  other: require('./ui/other'),
};
//const body = require('./ui/body');
//const output = require('./ui/output');
//const input = require('./ui/input');

const toExport = {
  init: function (session) {
    const screen = Blessed.screen({
      smartCSR: true,
      fullUnicode: true,  
    });
    const obj = Object.create(null);

    const state = {
      screen: screen,
    };
    Object.keys(ui).forEach(function (key) {
      state[key] = ui[key](state, session, screen);
    });


    const overlay = Blessed.box({
      bottom: 0,
      left: 0,
      height: 3,
      width: '100%',
      hidden: true,
      keys: true,
      mouse: true,
      inputOnFocus: true,
      style: {
        fg: 'white',
        bg: 'blue'	// Blue background so you see this is different from body
      }
    });

    // Close the example on Escape, Q, or Ctrl+C
    screen.key(['C-q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });
    screen.render();
  },
};



module.exports = toExport;