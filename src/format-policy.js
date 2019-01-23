import directives from './directives'
import repareSingleQuotes from './repare-single-quotes'


export default policy => directives
  .filter(directive => !!policy[directive])
  .map(directive => {
    const area = policy[directive]
      .map(repareSingleQuotes)

    return [directive, ...area]
  })
