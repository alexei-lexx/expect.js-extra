[![Build Status](https://travis-ci.org/alexei-lexx/expect.js-extra.svg?branch=master)](https://travis-ci.org/alexei-lexx/expect.js-extra)

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
**fulfill** asserts a promise to fulfill. It returns a promise, so don't forget
to use *return*.

```js
var Q = require('q');

it('is fulfilled', function() {
  return expect(Q()).to.fulfill();
});

it('is not fulfilled', function() {
  return expect(Q.reject()).to.not.fulfill();
});
```

Check the resolved value.

```js
var Q = require('q');

it('is fulfilled', function() {
  var promise = Q('ok');

  return expect(promise).to
    .fulfill()
    .then(function(result) {
      expect(result).to.be('ok');
    });
});
```

**reject([expected reason])** asserts a promise to reject.
It returns a promise, so don't forget to use *return*.

```js
var Q = require('q');

it('is rejected', function() {
  return expect(Q.reject()).to.reject();
});

it('is rejected with the proper reason', function() {
  var promise = Q.reject('something wrong');
  return expect(promise).to.reject('something wrong');
);

// or

it('is rejected with the proper reason', function() {
  var promise = Q.reject('something wrong');
  return expect(promise).to.reject(/wrong/);
);

it('is not rejected', function() {
  return expect(Q()).to.not.reject();
});
```

Another way to check the rejection reason.

```js
var Q = require('q');

it('is rejected', function() {
  var promise = Q.reject('something wrong happened');

  return expect(promise).to
    .reject()
    .then(function(reason) {
      expect(reason).to.be('something wrong happened');
    });
});
```
