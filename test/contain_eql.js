var err = require('./support/err');
var expect = require('../index');

describe('expect.js-extra', function() {
  describe('expect(array).to.containEql(element)', function() {
    context('when the element from the string array is given', function() {
      var arr = ['foo', 'bar'];
      var el = 'foo';

      it('succeeds', function() {
        expect(arr).to.containEql(el);
      });
    });

    context('when the element from the number array is given', function() {
      var arr = [1, 2];
      var el = 2;

      it('succeeds', function() {
        expect(arr).to.containEql(el);
      });
    });

    context('when the element from the object array is given', function() {
      var arr = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
      var el = { a: 1, b: 2 };

      it('succeeds', function() {
        expect(arr).to.containEql(el);
      });
    });

    context('when the element doesn\'t belong to the array', function() {
      var arr = ['foo'];
      var el = 'bar';

      it('raises the appropriate message', function() {
        err(function() {
          expect(arr).to.containEql(el);
        }, 'expected [ \'foo\' ] to contain \'bar\'');
      });
    });
  });

  describe('expect(array).to.not.containEql(element)', function() {
    context('when the string doesn\'t belong to the string array', function() {
      var arr = ['foo', 'bar'];
      var el = 'baz';

      it('succeeds', function() {
        expect(arr).to.not.containEql(el);
      });
    });

    context('when the number doesn\'t belong to the number array', function() {
      var arr = [2, 3];
      var el = 1;

      it('succeeds', function() {
        expect(arr).to.not.containEql(el);
      });
    });

    context('when the object doesn\'t belong to the object array', function() {
      var arr = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
      var el = { a: 5, b: 6 };

      it('succeeds', function() {
        expect(arr).to.not.containEql(el);
      });
    });

    context('when the element belongs to the array', function() {
      var arr = ['bar', 'foo'];
      var el = 'foo';

      it('raises the appropriate message', function() {
        err(function() {
          expect(arr).to.not.containEql(el);
        }, 'expected [ \'bar\', \'foo\' ] to not contain \'foo\'');
      });
    });
  });
});
