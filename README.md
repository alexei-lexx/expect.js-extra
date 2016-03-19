**containEql**: works like `contain`, but uses the deep equality

```js
expect([{ a: 1, b: 2 }, { a: 3, b: 4 }]).to.containEql({ a: 1, b: 2 });
```
