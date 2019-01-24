import csp from '../src'
import test from 'ava'


test('default option', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  await csp()(ctx, async () => {})

  t.is(header['Content-Security-Policy'], "default-src 'self'")
});


test('custom setting csp(opts) test', async t => {
  const header = {};
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    'img-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  }

  const expectStr = "img-src 'self' img.example.com *.img.example.com;script-src script.example.com"

  await csp({ policy })(ctx, async () => {})

  t.is(header['Content-Security-Policy'], expectStr)
})

test('invalid custom setting csp(opts) test', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    'image-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  }

  const expectStr = 'script-src script.example.com'

  await csp({ enableWarn: false, policy })(ctx, async () => {})
  t.is(header['Content-Security-Policy'], expectStr)
})
