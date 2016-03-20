var expect = require('expect.js');

module.exports = function(fn, msg) {
  try {
    fn();
    throw new Error('Expected an error');
  } catch (err) {
    expect(msg).to.be(err.message);
  }
};
