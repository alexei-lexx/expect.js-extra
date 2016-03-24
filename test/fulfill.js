var Q = require('q');
var expect = require('../index');

describe('expect.js-extra', function() {
  describe('expect(promise).to.fulfill()', function() {
    context('when the promise is resolved', function() {
      var promise = Q('ok');

      it('succeeds', function() {
        return expect(promise).to.fulfill();
      });

      it('resolves with the original result', function() {
        return expect(promise).to
          .fulfill()
          .then(function(result) {
            expect(result).to.be('ok');
          });
      });
    });

    context('when the promise is resolved with undefined', function() {
      var promise = Q();

      it('succeeds', function() {
        return expect(promise).to.fulfill();
      });
    });

    context('when the promise is rejected', function() {
      var promise = Q.reject();

      it('fails with the appropriate message', function() {
        var msg = "expected { state: 'rejected', reason: undefined } " +
                  'to fulfill';

        return expect(promise).to
          .fulfill()
          .catch(function(err) {
            expect(err.message).to.be(msg);
          });
      });
    });
  });

  describe('expect(promise).to.not.fulfill()', function() {
    context('when the promise is rejected', function() {
      var promise = Q.reject();

      it('succeeds', function() {
        return expect(promise).to.not.fulfill();
      });
    });

    context('when the promise is resolved', function() {
      var promise = Q();

      it('fails with the appropriate message', function() {
        var msg = "expected { state: 'fulfilled', value: undefined } " +
                  'not to fulfill';
        return expect(promise).to
          .not.fulfill()
          .catch(function(err) {
            expect(err.message).to.be(msg);
          });
      });
    });
  });
});
