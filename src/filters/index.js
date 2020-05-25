// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function keepTwo(value) {
  // 截取当前数据到小数点后三位
  return value
  if (value === '') {
    return '0.00'
  }
  const tempVal = Number(value).toFixed(2)
  if (tempVal === 'NaN') {
    return '0.00'
  }
  return tempVal
  /* const realVal = tempVal.substring(0, tempVal.length - 1)
  return realVal*/
}

export function fmoney(value, defaults) {
  if (value === '0.00') return '0元'
  if (value === 0 || value === '0') return '0元'
  if (!value) return ''
  if (isNaN(value)) {
    return value
  }
  var intPart = value.toString().split('.')[0] // 获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  if (value.toString().indexOf('.') > -1) {
    var xiaoshu = value.toString().split('.')
    intPartFormat = intPartFormat + '.' + xiaoshu[1]
  }
  return intPartFormat + ' 元'
}
