const Blessed = require('blessed');
const $ = require('./../../lib/bothelpers/fp');
const utils = require('./../utils');

/**
 * Switch focus
 */


const mixin = {
  popup: function (state, list, callback) {
    state.box.setItems(list.map(entry => entry[0]));
    state.box.show();
    state.screen.focusPop();
    state.box.focus();

    const event = 'select';
    const handler = function (iunno, index) {
      callback(list[index][1]);
      mixin.hide(state);
      state.box.removeListener(event, handler);
    };
    state.box.on(event, handler);
  },

  hide: function (state) {
    state.box.hide();
    state.screen.focusPop();
    state.input.focus();
    state.screen.render();
  },
};

const toExport = function (parentState) {
  const obj = Object.create(null);
  const popup = Blessed.list({
    top: 4,
    left: 0,
    height: 3,
    width: '50%',
    keys: true,
    mouse: true,
    hidden: true,
    style: {
      fg: 'white',
      bg: 'red'	// Blue background so you see this is different from body
    }
  });
  const state = {
    screen: parentState.screen,
    box: popup,
    input: parentState.input,
  };

  $.mixin(obj, [state], mixin);
  popup.on("cancel", obj.hide);

  //popup.focus();
  parentState.screen.append(popup);
  return(obj);
};

module.exports = toExport;