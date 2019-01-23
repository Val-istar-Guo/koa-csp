# koa-csp

[![version](https://img.shields.io/npm/v/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![downloads](https://img.shields.io/npm/dm/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![license](https://img.shields.io/npm/l/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![coveralls](https://img.shields.io/coveralls/github/Val-istar-Guo/koa-csp.svg?style=flat-square)](https://coveralls.io/github/Val-istar-Guo/koa-csp)

<!-- custom -->
This is a koa2 middleware used to set response header `Content-Security-Policy`

[What is CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Install

```
npm install koa-csp
```

```
yarn add koa-csp
```

## Usage

```javascript
import Koa from 'koa';
import csp from 'koa-csp';

const app = new Koa();

app.use(csp());
// It is equivalent to
app.use(csp({
  enableWarn: true,
  policy: { 'default-src': ['self'] },
}));

// Add you can add more policy
app.use(csp({
  enableWarn: true,
  policy: {
    'img-src': ['self', 'img.example.com'],
    'script-src': ['script.example.com', '*.script.example.com'],
  },
}));

// some key words will be auto add single quotes
app.use(csp({
  policy: {
    'default-src': ['self', 'none', 'unsafe-inline', 'unsafe-eval', 'example.com'],
    // you can alse add single quotes manually
    'img-src': ["'self'"],
  },
}));
// OUTPUT: Content-Security-Policy: default-src 'self' 'none' 'unsafe-inline' 'unsafe-eval' example.com; img-src 'self'
```
<!-- custom -->
