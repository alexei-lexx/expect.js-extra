describe('expect.js', function() {
  var expect;

  describe('base features', function() {
    context('when the base module is used', function() {
      beforeEach(function() {
        expect = require('expect.js');
      });

      it('are available', function() {
        expect(expect.Assertion.prototype).to.have.property('be');
      });
    });

    context('when the extra module is used', function() {
      beforeEach(function() {
        expect = require('../index');
      });

      it('are available', function() {
        expect(expect.Assertion.prototype).to.have.property('be');
      });
    });
  });

  describe('extra features', function() {
    context('when the base module is used', function() {
      beforeEach(function() {
        expect = require('expect.js');
      });

      xit('are not available', function() {
        expect(expect.Assertion.prototype).to.not.have.property('containEql');
      });
    });

    context('when the extra module is used', function() {
      beforeEach(function() {
        expect = require('../index');
      });

      it('are available', function() {
        expect(expect.Assertion.prototype).to.have.property('containEql');
      });
    });
  });
});
