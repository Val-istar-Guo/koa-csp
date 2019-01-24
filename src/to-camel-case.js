export default str => str.replace(/-([[A-Za-z])/, (metched, char) => char.toUpperCase())
