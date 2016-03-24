var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;

  Assertion.prototype.fulfill = function() {
    var promise = this.obj;
    var msg = 'expected ' + i(promise) + ' to fulfill';
    var that = this;

    return promise
      .then(function(result) { return result; }, function() { return false; })
      .then(function(result) {
        that.assert(result, function() {
          return 'expected ' + i(promise) + ' to fulfill';
        }, function() {
          return 'expected ' + i(promise) + ' not to fulfill';
        });

        return result;
      });
  };
};
