export default function (obj, effectAttrNames, onError) {
  const invalidAttrNames = Object.keys(obj)
    .filter(key => effectAttrNames.every(attrName => (
      key !== attrName && +key !== attrName
    )));

  if (!!invalidAttrNames.length && onError) onError(invalidAttrNames);
  return !invalidAttrNames.length;
}
