module.exports = {
  /**
   * @param {object} obj
   * @param {object} mixins
   * @param {array} privateVars
   */
  mix: function (obj, mixins, privateVars) {
    Object.keys(mixins).forEach(function (key) {
      obj[key] = function (...args) {
        mixins[key].apply(null, privateVars.concat(args));
      };
    });
    return obj;
  },

  flow: function (obj, ...args) {
    args.forEach(function (fn) {
      obj = fn(obj);
    });
    return obj;
  },

  pushHash: function (settings, toAdd) {
    Object.keys(toAdd).forEach(function (key) {
      settings[key] = toAdd[key];
    });
  },
};