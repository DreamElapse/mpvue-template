export function validator (instance, o) {
  Object.defineProperties(instance, o)
}

export function isFunction (obj) {
  return typeof obj === 'function'
}

export function firstLetterUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
