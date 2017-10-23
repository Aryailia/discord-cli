const Blessed = require('blessed');
const $ = require('./../../lib/bothelpers/fp');

const mixin = {
  log: function (state, text) {
    state.box.pushLine(text);
  },
};

const toExport = function (parentState) {
  const obj = Object.create(null);
  const state = {
    box: Blessed.text({
      bottom: 3,
      left: 0,
      height: 3,
      width: '100%',
      keys: false,
      mouse: false,
      scrollable: true,
      style: {
        fg: 'white',
        bg: 'red',
      }
    }),
  };
  parentState.screen.append(state.box);
  return $.mixin(obj, [state], mixin);
};

module.exports = toExport;