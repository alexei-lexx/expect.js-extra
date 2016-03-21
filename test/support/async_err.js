var expect = require('expect.js');
var Q = require('q');

module.exports = function(fn, msg) {
  return Q.fcall(fn).then(function() {
    throw new Error('Expected an error');
  }).catch(function(err) {
    expect(msg).to.be(err.message);
  });
};
