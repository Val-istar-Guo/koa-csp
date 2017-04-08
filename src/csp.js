import effectiveAttrValidator from './effectiveAttrValidator';
import * as log from './log';

// 有效的安全策略命名
const effectiveAttr = [
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
function filterEffectiveAttr(policy) {
  return effectiveAttr.filter(attr => !!policy[attr])
    .map(attr => [attr, ...policy[attr]]);
}

// 修复字符串self的书写问题 "self" => "'self'"
function repareSelfStr(str) {
  return str === 'self' ? '\'self\'' : str;
}

/**
 * @desc 生成一条策略的字符串
 *
 * @return {String} 'default-src self'
 */
function generateSubPolicyStr(policy) {
  return policy.map(repareSelfStr).join(' ');
}


// 默认配置-只允许该域名下内容
const defaultParams = {
  // 是否显示警告信息
  enableWarn: true,
  policy: {
    'default-src': ['self'],
  },
};

function validatorPolicy(policy) {
  if (Object.keys(policy).length === 0) {
    log.warn('⚠️CSP CONFIG WARNING: Empty Policy');
  }

  effectiveAttrValidator(policy, effectiveAttr, (invalidAttrs) => {
    log.warn(`⚠️CSP CONFIG WARNING: Invalid Policy Name[${invalidAttrs.join(', ')}]`);
  });
}

/**
 * @desc 设置响应头 Content-Security-Policy
 *
 * @param customPolicy {Object} 自定义安全策略 exp. { 'img-src': ['self'] };
 */
export default function ({ enableWarn, policy = {} } = defaultParams) {
  return async (ctx, next) => {
    // Warn invalid Policy Setting
    if (enableWarn) validatorPolicy(policy);

    // generate http header string
    const policyStr = filterEffectiveAttr(policy)
      .map(generateSubPolicyStr)
      .join(';');

    ctx.set('Content-Security-Policy', policyStr);
    await next();
  };
}
