var Q = require('q');
var expect = require('../index');
var err = require('./support/err');
var asyncErr = require('./support/async_err');

describe('expect.js-extra', function() {
  describe('expect(promise).to.fulfill()', function() {
    context('when the promise is resolved', function() {
      var promise = Q();

      it('succeeds', function() {
        return expect(promise).to.fulfill();
      });
    });

    context('when the promise is rejected', function() {
      var promise = Q.reject();

      it('fails with the appropriate message', function() {
        return asyncErr(function() {
          return expect(promise).to.fulfill();
        }, "expected { state: 'rejected', reason: undefined } to fulfill");
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
        return asyncErr(function() {
          return expect(promise).to.not.fulfill();
        }, "expected { state: 'fulfilled', value: undefined } not to fulfill");
      });
    });
  });
});
