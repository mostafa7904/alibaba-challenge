/**
 *
 * @param {String} str The value that you need to make a regex based on
 * @description Generates a regexp based on the string given and will return a regexp created for matching any set of characters in a string
 * @example Germany => /\b(?!\w*(\w)\w*\1)[Germany]+\b/gi.test('Grmny') => true
 * @example Afghanistan => /\b(?!\w*(\w)\w*\1)[Afghanistan]+\b/gi.test('Grmny') => false
 * @returns {RegExp}
 *
 */
const createSearchRegex = (str) => {
  // throw an error if there is no string or an unrecognized value
  if (!(str && typeof str == "string")) throw `Unrecognized value ${str}`;

  // turn all - to \- for regex to work
  let normalizedStr = str.replace("-", "\\-");
  return new RegExp(`\\b(?!\\w*(\\w)\\w*\\1)[` + normalizedStr + `]+\\b`, "gi");
};

export { createSearchRegex };
