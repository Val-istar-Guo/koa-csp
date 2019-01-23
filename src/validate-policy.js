import directives from './directives'
import * as log from './log'


export default policy => {
  const keys = Object.keys(policy)
  let valid = true

  if (!keys.length) {
    log.warn('Empty Policy')
    valid = false
  }

  const invalidDirectives = keys
    .filter(key => !directives.includes(key))

  if (invalidDirectives.length) {
    log.warn(`Invalid Policy Name: ${invalidDirectives.join(', ')}`)
    valid = false
  }

  return valid
}
