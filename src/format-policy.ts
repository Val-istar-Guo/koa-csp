import directives from './directives.js'
import { Policy } from './interface/policy.js'
import repareSingleQuotes from './repare-single-quotes.js'
import toCamelCase from './to-camel-case.js'


export default function (policy: Policy): string[][] {
  return directives
    .filter((directive) => Boolean(policy[directive]) || Boolean(policy[toCamelCase(directive)]))
    .map((directive) => {
      const area = (policy[directive] || policy[toCamelCase(directive)] || [])
        .map(repareSingleQuotes)

      return [directive, ...area]
    })
}
