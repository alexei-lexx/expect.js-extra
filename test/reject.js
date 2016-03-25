var Q = require('q');
var expect = require('../index');

describe('expect.js-extra', function() {
  describe('expect(promise).to.reject([expected reason])', function() {
    context('when the promise is rejected without a reason', function() {
      var promise = Q.reject();

      it('succeeds', function() {
        return expect(promise).to.reject();
      });
    });

    context('when the promise is rejected with a reason', function() {
      var promise = Q.reject('something wrong happened');

      context('and the expected reason is not specified', function() {
        it('succeeds', function() {
          return expect(promise).to.reject();
        });

        it('resolves with the proper reason as a result', function() {
          return expect(promise).to
            .reject()
            .then(function(reason) {
              expect(reason).to.be('something wrong happened');
            });
        });
      });

      context('and the same reason is expected', function() {
        it('succeeds', function() {
          return expect(promise).to.reject('something wrong happened');
        });
      });

      context('but another reason is expected', function() {
        it('fails', function() {
          var msg = 'expected ' +
              "{ state: 'rejected', reason: 'something wrong happened' } " +
              "to reject with 'another reason'";
          var assertion = expect(promise).to.reject('another reason');

          return expect(assertion).to
            .reject()
            .then(function(err) {
              expect(err.message).to.be(msg);
            });
        });
      });
    });

    context('when the promise is rejected with the Error', function() {
      var promise = Q.fcall(function() {
        throw new Error('something wrong happened');
      });

      context('and the same reason is expected', function() {
        it('succeeds', function() {
          return expect(promise).to.reject('something wrong happened');
        });
      });
    });

    context('when the promise is resolved', function() {
      var promise = Q();

      it('fails with the appropriate message', function() {
        var msg = "expected { state: 'fulfilled', value: undefined } to reject";

        return expect(promise).to
          .reject()
          .catch(function(err) {
            expect(err.message).to.be(msg);
          });
      });
    });
  });

  describe('expect(promise).to.not.reject()', function() {
    context('when the promise is resolved', function() {
      var promise = Q();

      it('succeeds', function() {
        return expect(promise).to.not.reject();
      });
    });

    context('when the promise is rejected', function() {
      var promise = Q.reject();

      it('fails with the appropriate message', function() {
        var msg = "expected { state: 'rejected', reason: undefined } " +
                  'not to reject';

        return expect(promise).to
          .not.reject()
          .catch(function(err) {
            expect(err.message).to.be(msg);
          });
      });
    });
  });
});
