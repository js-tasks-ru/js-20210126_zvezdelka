/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let symbolsCounter = {};
  let newString = '';
  
  if (size === 0) return newString;
  else if (!size) return string;

  for (let symbol of string) {
    if (symbol in symbolsCounter) {
      if (symbolsCounter[symbol] >= size) continue;
      symbolsCounter[symbol] += 1;
      newString += symbol;
    } else {
      symbolsCounter = {};
      symbolsCounter[symbol] = 1;
      newString += symbol;
    }
  }
  return newString;
}
