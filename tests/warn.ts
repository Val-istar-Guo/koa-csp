import csp from '../src'
import test from 'ava'
import * as sinon from 'sinon'


test.afterEach(() => {
  sinon.restore()
})

test.serial('illegal directive warn', async t => {
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

  sinon.replace(console, 'warn', sinon.fake())
  await csp({ enableWarn: true, policy })(ctx, async a => a)
  t.true(console.warn['calledOnce'])
  t.true(console.warn['calledWithMatch']('[kpa-csp warn] Invalid Policy Name: image-src'))
})

test.serial('empty policy warn', async t => {
  const header = {}
  const ctx = {
    set(key, val) {
      header[key] = val
    },
  }

  sinon.replace(console, 'warn', sinon.fake())
  await csp({ policy: {} })(ctx, async a => a)
  t.true(console.warn['calledOnce'])
  t.true(console.warn['calledWithMatch']('[kpa-csp warn] Empty Policy'))
})

test.serial('camel case no warn', async t => {
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

  sinon.replace(console, 'warn', sinon.fake())
  await csp({ enableWarn: true, policy })(ctx, async a => a)

  t.false(console.warn['called'])
})
