const Blessed = require('blessed');
const utils = require('../../utils.js');
const config = require('../settings.json');

const settings = config;

const settings_input = {
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
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
    pane.append(privates.input);
  },
};

function inputMethod(client) {
  const privates = {
    input: Blessed.textarea(settings_input),
  };
  //input.focus();
  //input.readInput();
  return utils.mix(Object.create(null), mixin, [privates]);
}

module.exports = inputMethod;