# Extra Features of the Expect.js

## Install

```
npm install expect.js-extra
```

## Usage

```js
// Instead of require('expect.js');
var expect = require('expect.js-extra');
```

**containEql**: works like `contain`, but uses the deep equality

```js
expect([{ a: 1, b: 2 }, { a: 3, b: 4 }]).to.containEql({ a: 1, b: 2 });
```

**be.a('promise')** asserts object to be a promise (have the *then* method)

```js
var obj = { then: function() {} };
expect(obj).to.be.a('promise');
```
**fulfill** asserts a promise to fulfill / resolve

```js
var Q = require('q');

expect(Q()).to.fulfill();
expect(Q.reject()).to.not.fulfill();
```

**reject** asserts a promise to reject

```js
var Q = require('q');

expect(Q.reject()).to.reject();
expect(Q()).to.not.reject();
```
