import directives from './directives'
import repareSingleQuotes from './repare-single-quotes'
import toCamelCase from './to-camel-case'


export default policy => directives
  .filter(directive => !!policy[directive] || !!policy[toCamelCase(directive)])
  .map(directive => {
    const area = (policy[directive] || policy[toCamelCase(directive)])
      .map(repareSingleQuotes)

    return [directive, ...area]
  })
