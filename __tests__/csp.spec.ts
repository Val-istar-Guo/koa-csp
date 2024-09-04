/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, jest, test } from '@jest/globals'
import csp from '../src'


test('default option', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  const callback = jest.fn(async () => {})
  await csp()(ctx, () => callback())

  expect(callback).toBeCalledTimes(1)
  expect(header['Content-Security-Policy']).toBe("default-src 'self'")
})

test('default option.policy', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  await csp({ enableWarn: false })(ctx, () => Promise.resolve())

  expect(header['Content-Security-Policy']).toBe("default-src 'self'")
})

test('custom setting csp(opts) test', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    'img-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  }

  const expectStr = "img-src 'self' img.example.com *.img.example.com;script-src script.example.com"

  await csp({ policy })(ctx, () => Promise.resolve())

  expect(header['Content-Security-Policy']).toBe(expectStr)
})

test('camel case policy', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    imgSrc: ['self', 'img.example.com', '*.img.example.com'],
    scriptSrc: ['script.example.com'],
  }

  const expectStr = "img-src 'self' img.example.com *.img.example.com;script-src script.example.com"

  await csp({ enableWarn: false, policy })(ctx, () => Promise.resolve())

  expect(header['Content-Security-Policy']).toBe(expectStr)
})

test('invalid custom setting csp(opts) test', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  const policy = {
    'image-src': ['self', 'img.example.com', '*.img.example.com'],
    'script-src': ['script.example.com'],
  }

  const expectStr = 'script-src script.example.com'

  await csp({ enableWarn: false, policy })(ctx, () => Promise.resolve())
  expect(header['Content-Security-Policy']).toBe(expectStr)
})
