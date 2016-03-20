**containEql**: works like `contain`, but uses the deep equality

```js
expect([{ a: 1, b: 2 }, { a: 3, b: 4 }]).to.containEql({ a: 1, b: 2 });
```

**be.a('promise')** asserts object to be a promise (have the *then* method)

```js
var obj = { then: function() {} };
expect(obj).to.be.a('promise');
```
