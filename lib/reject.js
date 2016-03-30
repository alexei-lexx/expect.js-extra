var i = require('./support').i;

module.exports = function(expect) {
  var Assertion = expect.Assertion;

  Assertion.prototype.reject = function(expectedReason) {
    var promise = this.obj;
    var that = this;
    var rejectionError;

    return promise
      .then(function() {
              return false;
            },
            function(error) {
              rejectionError = error;
              return true;
            }
      )
      .then(function(isRejected) {
        var hasExpectedReason = true;
        var actualReason;

        if (typeof expectedReason !== 'undefined') {
          if (typeof rejectionError === 'object') {
            actualReason = rejectionError.message;
          } else {
            actualReason = rejectionError;
          }

          if (expectedReason instanceof RegExp) {
            hasExpectedReason = expectedReason.test(actualReason);
          } else {
            hasExpectedReason = actualReason === expectedReason;
          }
        }

        that.assert(isRejected && hasExpectedReason,
          function() {
            return message(promise, expectedReason, false);
          },
          function() {
            return message(promise, expectedReason, true);
          }
        );

        return rejectionError;
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
