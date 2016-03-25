var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;

  Assertion.prototype.fulfill = function() {
    var promise = this.obj;
    var that = this;
    var resolvedValue;

    return promise
      .then(function(result) {
          resolvedValue = result;
          return true;
        },
        function() {
          return false;
        }
      )
      .then(function(truth) {
        that.assert(truth, function() {
          return 'expected ' + i(promise) + ' to fulfill';
        }, function() {
          return 'expected ' + i(promise) + ' not to fulfill';
        });

        return resolvedValue;
      });
  };
};
