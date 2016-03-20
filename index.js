var expect = require('expect.js');

require('./lib/contain_eql')(expect);
require('./lib/promise')(expect);

module.exports = expect;
