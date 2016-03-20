describe('expect.js-extra', function() {
  var expect = require('../index');

  function err(fn, msg) {
    try {
      fn();
      throw new Error('Expected an error');
    } catch (err) {
      expect(msg).to.be(err.message);
    }
  }

  describe('expect(array).to.be.an(\'array\')', function() {
    it('still works', function() {
      expect([]).to.be.an('array');
    });
  });

  describe('expect(object).to.be.a(\'promise\')', function() {
    context('when the property object.then is a function', function() {
      var obj = { then: function() {} };

      it('succeeds', function() {
        expect(obj).to.be.a('promise');
      });
    });

    context('when the property object.then is not defined', function() {
      var obj = {};

      it('raises the appropriate message', function() {
        err(function() {
          expect(obj).to.be.a('promise');
        }, 'expected {} to be a promise');
      });
    });
  });

  describe('expect(object).to.not.be.a(\'promise\')', function() {
    context('when the property object.then is not defined', function() {
      var obj = {};

      it('succeeds', function() {
        expect(obj).to.not.be.a('promise');
      });
    });

    context('when the property object.then is a string', function() {
      var obj = { then: 'not a function' };

      it('succeeds', function() {
        expect(obj).to.not.be.a('promise');
      });
    });

    context('when the property object.then is a function', function() {
      var obj = { then: function() {} };

      it('raises the appropriate message', function() {
        err(function() {
          expect(obj).to.not.be.a('promise');
        }, 'expected { then: [Function] } to not be a promise');
      });
    });
  });
});
