import effectiveAttrValidator from '../src/effectiveAttrValidator'
import test from 'ava'


test('all effective attrs test', t => {
  const attrNames = ['a', 'b', 'c']
  const testObj = {
    a: 1,
    c: 3,
  }

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    t.is(invalidAttrNames.length, 0)
  })

  t.true(effectiveAttrValidator(testObj, attrNames))
})

test('non-string type effective attrsNames test', t => {
  const symbol = Symbol('effective test')
  const attrNames = ['a', 'b', 'c', 1, 2, 3, symbol]
  const testObj = {
    a: 1,
    1: 'n1',
    [symbol]: 'symbol',
  }

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    t.is(invalidAttrNames.length, 0)
  })
  t.true(effectiveAttrValidator(testObj, attrNames))
})

test('invalid attrsName test', t => {
  const attrNames = ['a', 'b', 'c']
  const testObj = {
    a: 1,
    d: 2,
  }

  const errorVal = ['d']

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    t.deepEqual(invalidAttrNames, errorVal)
  })
  t.false(effectiveAttrValidator(testObj, attrNames))
})
