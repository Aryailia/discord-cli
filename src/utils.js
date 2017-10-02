const Fs = require('fs');



const Utils = {
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

  stringify: function (value, depthDecr, arrayMaxLength) {
  },

  log: function (message) {
    //console.log(message);
    const sanitizedMessage = (typeof message === 'object')
      ? JSON.parse(Utils.stringify(message, 2))
      : message;
    console.log(sanitizedMessage);
    const filename = './private/log.txt';
    const limit = 512;

    (new Promise(function (resolve, reject) {
      Fs.readFile(filename, function (err, data) {
        resolve(err ? err : data.toString());
      })
    })).then(function (oldLog) {
      const newLog = oldLog + '\n' + message;
      const buffer = newLog.substr(Math.max(newLog.length - limit, 0), limit);
      Fs.writeFile(filename, buffer);
    });
  },
};


module.exports = Utils;