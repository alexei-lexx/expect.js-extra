var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;

  /**
   * Assert that the array contains _obj_ or string contains _obj_.
   * The difference from _contain_ is that _containEql_ uses the deep equality
   * to compare _obj_ with array elements.
   *
   * @param {Mixed} obj|string
   * @api public
   */

  Assertion.prototype.containEql = function(obj) {
    if ('object' !== typeof this.obj) {
      return this.contain(obj);
    }

    var found = false;
    for (var j = 0; j < this.obj.length; j++) {
      if (expect.eql(this.obj[j], obj)) {
        found = true;
        break;
      }
    }

    this.assert(
      found,
      function() {
        return 'expected ' + i(this.obj) + ' to contain ' + i(obj);
      },
      function() {
        return 'expected ' + i(this.obj) + ' not to contain ' + i(obj);
      }
    );

    return this;
  };
};
