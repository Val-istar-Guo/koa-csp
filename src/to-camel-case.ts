export default function (str: string): string {
  return str.replace(/-([[A-Za-z])/, (metched, char) => char.toUpperCase())
}
