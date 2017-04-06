import effectiveAttrValidator from '../src/effectiveAttrValidator';

test('all effective attrs test', () => {
  const attrNames = ['a', 'b', 'c'];
  const testObj = {
    a: 1,
    c: 3,
  };

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    expect(invalidAttrNames.length).toBe(0);
  });
  expect(effectiveAttrValidator(testObj, attrNames)).toBeTruthy();
});

test('non-string type effective attrsNames test', () => {
  const symbol = Symbol('effective test');
  const attrNames = ['a', 'b', 'c', 1, 2, 3, symbol];
  const testObj = {
    a: 1,
    1: 'n1',
    [symbol]: 'symbol',
  };

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    expect(invalidAttrNames.length).toBe(0);
  });
  expect(effectiveAttrValidator(testObj, attrNames)).toBeTruthy();
});

test('invalid attrsName test', () => {
  const attrNames = ['a', 'b', 'c'];
  const testObj = {
    a: 1,
    d: 2,
  };

  const errorVal = ['d'];

  effectiveAttrValidator(testObj, attrNames, (invalidAttrNames) => {
    expect(invalidAttrNames).toEqual(errorVal);
  });
  expect(effectiveAttrValidator(testObj, attrNames)).toBeFalsy();
});
