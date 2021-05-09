<!-- title -->
<p align="center" style="padding-top: 40px">
  <img src="./doc/images/logo.svg?sanitize=true" width="120" alt="logo" />
</p>

<h1 align="center" style="text-align: center">KOA-CSP</h1>
<!-- title -->

[![version](https://img.shields.io/npm/v/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![downloads](https://img.shields.io/npm/dm/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![license](https://img.shields.io/npm/l/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/koa-csp.svg?style=flat-square)](https://www.npmjs.com/package/koa-csp)
[![coveralls](https://img.shields.io/coveralls/github/Val-istar-Guo/koa-csp.svg?style=flat-square)](https://coveralls.io/github/Val-istar-Guo/koa-csp)



<!-- description -->
This is a koa2 middleware used to set response header `Content-Security-Policy`.

[What is CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
<!-- description -->

## Usage

<!-- usage -->
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

// CamelCase Support
app.use(csp({
  policy: {
    defaultSrc: ['self', 'none', 'unsafe-inline', 'unsafe-eval', 'example.com'],
    // you can alse add single quotes manually
    imgSrc: ["'self'"],
  },
}));
// OUTPUT: Content-Security-Policy: default-src 'self' 'none' 'unsafe-inline' 'unsafe-eval' example.com; img-src 'self'
```
<!-- usage -->

<!-- addition --><!-- addition -->

## Sponsor

Support code development on patron.

[![patron](https://c5.patreon.com/external/logo/become_a_patron_button@2x.png)](https://www.patreon.com/bePatron?u=22478507)

## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
