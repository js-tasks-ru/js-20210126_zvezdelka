/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let order = 0;

  if (param == 'asc') {
    order = 1;
  } else if (param == 'desc') {
    order = -1;
  }

  return arr.slice().sort((a, b) => order * a.localeCompare(b, 'ru-u-kf-upper'));

}
