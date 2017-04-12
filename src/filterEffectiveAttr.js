// 有效的安全策略命名
export const effectiveAttr = [
  'default-src',
  'child-src',
  'connect-src',
  'font-src',
  'frame-src',
  'img-src',
  'manifest-src',
  'media-src',
  'object-src',
  'script-src',
  'style-src',
  'worker-src',
];

/**
 * @desc 过滤无效安全策略并格式化
 *       有效策略命名参照 effectiveAttr
 *
 * @return {Array} exp. [['default-src', 'self'], ['img-src', 'self']]
 */
export default function (policy) {
  return effectiveAttr.filter(attr => !!policy[attr])
    .map(attr => [attr, ...policy[attr]]);
}
