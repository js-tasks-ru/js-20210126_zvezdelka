/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!arguments.length) return;

  let invertedObj = {};

  for (let entrie of Object.entries(obj)) {
    invertedObj[entrie[1]] = entrie[0];
  }
  return invertedObj;
}
