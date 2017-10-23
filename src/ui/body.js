const Blessed = require('blessed');
const messages = require('./../messages');
const $ = require('./../../lib/bothelpers/fp');

const mixin = {
  send: function (state, session, parentState, text) {
    messages.send(null, session, parentState, text);
    state.box.pushLine(text);
  },
};

const toExport = function (parentState, session) {
  const obj = Object.create(null);
  const state = {
    box: Blessed.box({
      top: 0,
      left: 0,
      height: '100%-4',
      width: '100%',
      keys: true,
      mouse: true,
      alwaysScroll: true,
      scrollable: true,
      scrollbar: {
        ch: ' ',
        bg: 'red'
      }
    }),
  };
  parentState.screen.append(state.box);
  //parentState.screen = 

  return $.mixin(obj, [state, session, parentState], mixin);
};

module.exports = toExport;