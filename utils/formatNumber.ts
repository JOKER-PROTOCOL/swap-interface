import BigNumber from 'bignumber.js'

export const toFixedPurely = (val = 0, displayDecimal = 4) => {
  const num = new BigNumber(val)
  const expandBase = Math.pow(10, displayDecimal)

  return displayDecimal > 0
    ? Math.floor(num.multipliedBy(expandBase).toNumber()) / expandBase
    : num
}

export const formatNumber = (val = 0, displayDecimal = 4) => {
  const number = toFixedPurely(val, displayDecimal)

  return number.toLocaleString()
}
