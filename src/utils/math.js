export const toFixed = (num, decial) => {
  if (Number.isNaN(num)) {
    return ''
  } else {
    return Number(num).toFixed(decial)
  }
}
export const isNumber = (num) => {
  if (num === '') return false
  return !isNaN(num)
}
