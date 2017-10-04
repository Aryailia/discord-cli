const Blessed = require('blessed');
const Utils = require('./utils.js');
const MANY_TIMES = 100;//1 / 0; // Hard limiting 100

function makeAttachList(container, count, width, height) {
  const list = new Array(count);
  for (let i = 0; i < count; ++i) {
    list[i] = Blessed.box({ left: 0, top: 0, width: width, height: height,
      //content: 'asdf', // Decommented for testing
    });
    container.append(list[i])
  }
  return list;
}

/**
 * @param {Object} settings
 * @param {Array} children
 * @param {number} cellDimension Anything you'd normally put in a height
 * So: number, %, %-number, or 'shrink'
 * @param {boolean} isRow
 */
function make(settings, children, cellDimension, isRow) {
  // Type checking?
  // ==============
  // ?

  const container = Blessed.box(settings);
  const list = (isRow)
    ? makeAttachList(container, children.length, cellDimension, '100%')
    : makeAttachList(container, children.length, '100%', cellDimension);
  methods.updateDimensions(list, children, cellDimension, isRow);
  list.forEach(function (cell, i) {
    list[i].append(children[i]);
  });

  // List of boxes
  return [container, list, cellDimension];
}

const methods = {
  self: function (list, children, cellDimension) {
    return list;
  },

  updateDimensions: function (list, children, cellDimension, isRow) {
    const dimensionName = (isRow) ? 'width' : 'height'; 
    const cssPropertyName = (isRow) ? 'left' : 'top';
    var offset = 0;
    var size = 0; // Avoiding the scope-forcing of const in a for-loop
    list.forEach(function (cell, i) {
      size = (typeof cellDimension === 'number')
        ? cellDimension
        : children[i][dimensionName];
  
      if (typeof size !== 'number') {
        throw new SyntaxError('Either <cellDimension> has to be a number or ' +
          `all <children> have to have ${dimensionName} numbers`
        );
      }
  
      list[i][cssPropertyName] = offset;
      offset += size;
    });
  },
};

module.exports = {
  /**
   * Not sure if even necessary, and not tested, maybe only use of Utils.assign
   * @param {Array<string>} textArray
   * @param {number} width
   * @param {number} textMaxWidth
   */
  enumerateTextBoxes: function (textArray, config, width, textMaxWidth) {
    const length = textArray.length;
    const list = new Array(length);
    for (let i = 0; i < length; ++i) {
      const text = textArray[i];
      const configCopy = Utils.assign({}, settings, MANY_TIMES); // Deep copy
      list[i] = Blessed.text(Utils.pushHash(configCopy, { // Overwrite options
        width: width,
        height: Math.ceil(text.length / taxMaxWidth), // Calculate height
        content: text,
      }));
    }
    return list;
  },

  /**
   * @param {Object} settings
   * @param {Array} children
   * @param {number} cellHeight Anything you'd normally put in a height
   * So: number, %, %-number, or 'shrink'
   */
  column: function (settings, children, cellHeight) {
    const args = make(settings, children, cellHeight, false);
    return Utils.mix(Object.create(null), methods, args);
  },

  /**
   * @param {Object} settings
   * @param {Array} children
   * @param {number} cellHeight Anything you'd normally put in a height
   * So: number, %, %-number, or 'shrink'
   */
  row: function (settings, children, cellWidth) {
    const args = make(settings, children, cellWidth, true);
    return Utils.mix(Object.create(null), methods, args);
  },
};