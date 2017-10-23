const $ = require('./../lib/bothelpers/fp');

const mixin = {
  send: function (state, text) {
  },
};

const toExport = function (parentState) {
  const obj = Object.create(null);
  const state = {
  };
  $.mixin(obj, [state], mixin);

  return(obj);
};

module.exports = toExport;