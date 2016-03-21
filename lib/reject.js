var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;

  Assertion.prototype.reject = function() {
    var promise = this.obj;
    var msg = 'expected ' + i(promise) + ' to fulfill';
    var that = this;

    return promise
      .then(function() { return false; }, function() { return true; })
      .then(function(truth) {
        that.assert(truth, function() {
          return 'expected ' + i(promise) + ' to reject';
        }, function() {
          return 'expected ' + i(promise) + ' not to reject';
        });
      });
  };
};
