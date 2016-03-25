var i = require('./support').i;

module.exports = function(expect) {
  var Assertion = expect.Assertion;

  Assertion.prototype.reject = function(expectedReason) {
    var promise = this.obj;
    var that = this;
    var rejectionReason;

    return promise
      .then(function() {
              return false;
            },
            function(reason) {
              rejectionReason = reason;
              return true;
            }
      )
      .then(function(isRejected) {
        var truth;

        if (typeof expectedReason === 'undefined') {
          truth = isRejected;
        } else {
          truth = isRejected && (rejectionReason === expectedReason);
        }

        that.assert(truth, function() {
          return message(promise, expectedReason, false);
        }, function() {
          return message(promise, expectedReason, true);
        });

        return rejectionReason;
      });
  };
};

function message(promise, expectedReason, negative) {
  var msg = 'expected ' + i(promise) + (negative ? ' not' : '') + ' to reject';

  if (typeof expectedReason !== 'undefined') {
    msg += ' with ' + i(expectedReason);
  }

  return msg;
}
