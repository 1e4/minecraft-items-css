export function convertNameToCSS(name) {
  return name
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace("'", '')
    .replace("(", '')
    .replace(")", '')
    .replace(".", '');
}
