var util = require('util');

module.exports = { i: i };

function i(obj) {
  if (typeof obj.inspect === 'function') {
    obj = obj.inspect();
  }

  return util.inspect(obj);
}
