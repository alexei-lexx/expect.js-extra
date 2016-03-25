var util = require('util');

module.exports = function(expect) {
  var Assertion = expect.Assertion;
  var i = util.inspect;

  Assertion.prototype.reject = function() {
    var promise = this.obj;
    var that = this;
    var rejectionReason;

    return promise
      .then(function() {
          return false;
        }, function(reason) {
          rejectionReason = reason;
          return true;
        }
      )
      .then(function(truth) {
        that.assert(truth, function() {
          return 'expected ' + i(promise) + ' to reject';
        }, function() {
          return 'expected ' + i(promise) + ' not to reject';
        });

        return rejectionReason;
      });
  };
};
