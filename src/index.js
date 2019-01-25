import validatePolicy from './validate-policy'
import formatPolicy from './format-policy'


// default config
const defaultParams = {
  // 是否显示警告信息
  enableWarn: true,
  policy: {
    'default-src': ['self'],
  },
};

/**
 * @desc Set Content-Security-Policy
 * @param {Object} param
 * @param {boolean} param.enableWarn enable warn log
 * @param {Object} param.policy csp policy
 * @param {string[]} param.policy.defaultSrc
 * @param {string[]} param.policy.childSrc
 * @param {string[]} param.policy.connectSrc
 * @param {string[]} param.policy.fontSrc
 * @param {string[]} param.policy.frameSrc
 * @param {string[]} param.policy.imgSrc
 * @param {string[]} param.policy.manifestSrc
 * @param {string[]} param.policy.mediaSrc
 * @param {string[]} param.policy.objectSrc
 * @param {string[]} param.policy.prefetchSrc
 * @param {string[]} param.policy.styleSrc
 * @param {string[]} param.policy.webrtcSrc
 * @param {string[]} param.policy.workerSrc
 */
export default function ({ enableWarn = defaultParams.enableWarn, policy = defaultParams.policy } = defaultParams) {
  return async (ctx, next) => {
    if (enableWarn) validatePolicy(policy);

    const policyStr = formatPolicy(policy)
      .map(directive => directive.join(' '))
      .join(';')

    ctx.set('Content-Security-Policy', policyStr);
    await next();
  };
}
