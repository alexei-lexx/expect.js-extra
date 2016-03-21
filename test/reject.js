var Q = require('q');
var expect = require('../index');
var err = require('./support/err');
var asyncErr = require('./support/async_err');

describe('expect.js-extra', function() {
  describe('expect(promise).to.reject()', function() {
    context('when the promise is rejected', function() {
      var promise = Q.reject();

      it('succeeds', function() {
        return expect(promise).to.reject();
      });
    });

    context('when the promise is resolved', function() {
      var promise = Q();

      it('fails with the appropriate message', function() {
        return asyncErr(function() {
          return expect(promise).to.reject();
        }, "expected { state: 'fulfilled', value: undefined } to reject");
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
        return asyncErr(function() {
          return expect(promise).to.not.reject();
        }, "expected { state: 'rejected', reason: undefined } not to reject");
      });
    });
  });
});
