# KOA-CSP

[![npm](https://img.shields.io/npm/v/koa-csp.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/koa-csp.svg?style=flat-square)]()

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
import csp from 'csp';

const app = new Koa();

app.use(csp());
// It is equivalent to
app.use(csp({
  'default-src': ['self'],
}));

// Add you can add more policy
app.use(csp({
  'img-src': ['self', 'img.example.com'],
  'script-src': ['script.example.com', '*.script.example.com'],
}));

// some key words will be auto add single quotes
app.use(csp({
  'default-src': ['self', 'none', 'unsafe-inline', 'unsafe-eval', 'example.com'],
  // you can alse add single quotes manually
  'img-src': ["'self'"],
}));
// OUTPUT: Content-Security-Policy: default-src 'self' 'none' 'unsafe-inline' 'unsafe-eval' example.com; img-src 'self'
```
