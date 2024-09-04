/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach } from 'node:test'
import csp from '../src'
import { beforeAll, expect, jest, test } from '@jest/globals'


beforeAll(() => {
  jest.spyOn(console, 'warn')
})

afterEach(() => {
  (console.warn as jest.Mock).mockClear()
})

test('illegal directive warn', async () => {
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

  await csp({ enableWarn: true, policy })(ctx, () => Promise.resolve())
  expect(console.warn).toBeCalledTimes(1)
  expect(console.warn).toBeCalledWith('[koa-csp warn] Invalid Policy Name: image-src')
})

test('empty policy warn', async () => {
  const header = {}
  const ctx: any = {
    set(key, val) {
      header[key] = val
    },
  }

  await csp({ policy: {} })(ctx, () => Promise.resolve())
  console.log((console.warn as jest.Mock).mock.calls)
  expect(console.warn).toBeCalledTimes(1)
  expect(console.warn).toBeCalledWith('[koa-csp warn] Empty Policy')
})

test('camel case no warn', async () => {
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

  await csp({ enableWarn: true, policy })(ctx, () => Promise.resolve())

  expect(console.warn).toBeCalledTimes(0)
})
