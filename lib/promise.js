var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;
  var oldMethod = Assertion.prototype.a;

  Assertion.prototype.a =
  Assertion.prototype.an = function(type) {
    if (type === 'promise') {
      // Proper english in error msg
      var n = /^[aeiou]/.test(type) ? 'n' : '';

      this.assert(
        typeof this.obj.then === 'function',
        function() {
          return 'expected ' + i(this.obj) + ' to be a' + n + ' promise';
        },
        function() {
          return 'expected ' + i(this.obj) + ' to not be a' + n + ' promise';
        }
      );
      return this;
    } else {
      return oldMethod.call(this, type);
    }
  };
};
