describe('expect.js', function() {
  var expect;

  describe('base features', function() {
    context('when the base module is used', function() {
      beforeEach(function() {
        expect = require('expect.js');
      });

      it('are available', function() {
        expect(true).to.be.ok();
      });
    });

    context('when the extra module is used', function() {
      beforeEach(function() {
        expect = require('../index');
      });

      it('are available', function() {
        expect(true).to.be.ok();
      });
    });
  });

  describe('extra features', function() {
    context('when the base module is used', function() {
      beforeEach(function() {
        expect = require('expect.js');
      });

      it('are not available', function() {
        expect().fail();
      });
    });

    context('when the extra module is used', function() {
      beforeEach(function() {
        expect = require('../index');
      });

      it('are available', function() {
        expect().fail();
      });
    });
  });
});
