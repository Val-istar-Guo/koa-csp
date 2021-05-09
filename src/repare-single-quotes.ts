const keyWords = ['none', 'self', 'unsafe-inline', 'unsafe-eval']


/**
 * Autocomplete single quotes.
 * @param {string} str
 */
export default function(str: string): string {
  return keyWords.includes(str) ? `'${str}'` : str
}
