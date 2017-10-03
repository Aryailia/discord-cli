const Fs = require('fs');
const config = require('../private/login.json');
const LOG_SIZE = config.logSize;
const LOG_PATH = config.logPath;  //'./private/log.txt';

/**
 * Indents <sourceStr> by depth-times number of indents
 * Not done functionally cause low level
 * @param {string} sourceStr 
 * @param {number} depth 
 */
function prepad(sourceStr, depth) {
  var strList = Array(depth + 1);
  strList[depth] = sourceStr;
  for (let i = 0; i < depth; ++i) {
    strList[i] = "  "; // Two spaces for indent
  }
  return strList.join('');
}

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

  /**
   * Converts anything it's passed into a string
   * Allows caller to set how deep into an object-type object this should explore
   * @param {*} toStringify Target to process into a string
   * @param {number} depth Zero is just keys/facevalue, goes up to <depth>-inclusive
   * @returns {string}
   */
  stringify: function (toStringify, depth) {
    function recurse(obj, level) {
      if (level > depth) {
        return '-snip-'; // Snip if gone too deep 
      } else {
        return(typeof obj === 'object' && obj !== null
          // Print out the object in three parts: '{', key-value, '}'
          ? '{\n' + Object.keys(obj).map(function (key) {
              const value = recurse(obj[key], level + 1);
              return prepad(`${key}: ${value}`, level + 1);
            }).join(',\n') + '\n'
            + prepad('}', level)

          // Otherwise just regular string conversion
          : '' + obj
        );
      }
    }  

    if (typeof depth !== 'number') {
      throw new SyntaxError('stringify - <depth> must be a number');
    } else {
      return recurse(toStringify, 0);
    }
  },

  /**
   * Logs <message> to the log file specified in the private settings
   * Intended for use by test/logger.js .  Limits the size of the log
   * @param {*} message Message to log into log file
   * @param {number} [depth=2] How deep to expand <message>
   */
  log: function (message, depth = 2) {
    LOG_BUFFER.push([message, depth]);
    writeLog();
  },
};

let LOG_BUFFER = [];
let LOG_FREE = true;
function writeLog() {
  if (LOG_FREE) {
    LOG_FREE = false;
    new Promise(function (resolve, reject) {
      Fs.readFile(LOG_PATH, "utf8", function (err, data) {
        const oldLog = err ? err : data;
        const newLog = [oldLog].concat(LOG_BUFFER.map(function (entry) {
          const unpacked = Utils.stringify(entry[0], entry[1]);
          entry.length = 0; // Force deletion of the array
          return unpacked;
        })).join('\n');
        LOG_BUFFER = []; // Garbage collect all the arrays
        resolve(newLog);
      })
    }).then(function (text) {   
      const buffer = text.substr(Math.max(text.length - LOG_SIZE - 1, 0), LOG_SIZE);
      Fs.writeFile(LOG_PATH, buffer, function (err) {
        if (LOG_BUFFER.length > 0) {
          writeLog();
        }
        LOG_FREE = true;
      });

    }).catch(function (err) {
      LOG_FREE = true; // reset log file's lock
      console.error(err); // give the error in STDERR
    });
  }
}


module.exports = Utils;