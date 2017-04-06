# KOA-CSP

This is a koa2 middleware used to set response header `Content-Security-Policy`

[What is CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Install

yarn add https://github.com/Val-istar-Guo/koa-csp.git

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
```