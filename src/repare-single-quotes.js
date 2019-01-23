const keyWords = ['none', 'self', 'unsafe-inline', 'unsafe-eval']


/**
 * Autocomplete single quotes.
 * @param {string} str
 */
export default function (str) {
  return keyWords.includes(str) ? `'${str}'` : str
}
