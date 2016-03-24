var Q = require('q');
var expect = require('../index');

describe('expect.js-extra', function() {
  describe('expect(promise).to.reject()', function() {
    context('when the promise is rejected', function() {
      var promise = Q.reject('something wrong happend');

      it('succeeds', function() {
        return expect(promise).to.reject();
      });

      it('passes the proper reason as a result', function() {
        return expect(promise).to
          .reject()
          .then(function(reason) {
            expect(reason).to.be('something wrong happend');
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
