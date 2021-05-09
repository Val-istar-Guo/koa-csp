import csp from '../src'
import test from 'ava'
import * as sinon from 'sinon'


test('default option', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  const callback = sinon.fake()
  await csp()(ctx, async() => callback())

  t.true(callback.calledOnce)
  t.is(header['Content-Security-Policy'], "default-src 'self'")
})

test('default option.policy', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  await csp({ enableWarn: false })(ctx, async a => a)

  t.is(header['Content-Security-Policy'], "default-src 'self'")
})

test('custom setting csp(opts) test', async t => {
  const header = {}
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

  await csp({ policy })(ctx, async a => a)

  t.is(header['Content-Security-Policy'], expectStr)
})

test('camel case policy', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    imgSrc: ['self', 'img.example.com', '*.img.example.com'],
    scriptSrc: ['script.example.com'],
  }

  const expectStr = "img-src 'self' img.example.com *.img.example.com;script-src script.example.com"

  await csp({ enableWarn: false, policy })(ctx, async a => a)

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

  await csp({ enableWarn: false, policy })(ctx, async a => a)
  t.is(header['Content-Security-Policy'], expectStr)
})
