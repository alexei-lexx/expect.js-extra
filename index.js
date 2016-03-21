var expect = require('expect.js');

require('./lib/contain_eql')(expect);
require('./lib/promise')(expect);
require('./lib/fulfill')(expect);

module.exports = expect;
