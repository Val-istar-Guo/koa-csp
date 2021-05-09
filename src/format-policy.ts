import directives from './directives'
import { Policy } from './interface/policy'
import repareSingleQuotes from './repare-single-quotes'
import toCamelCase from './to-camel-case'


export default function(policy: Policy): string[][] {
  return directives
    .filter(directive => Boolean(policy[directive]) || Boolean(policy[toCamelCase(directive)]))
    .map(directive => {
      const area = (policy[directive] || policy[toCamelCase(directive)] || [])
        .map(repareSingleQuotes)

      return [directive, ...area]
    })
}
