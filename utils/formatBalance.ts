import BigNumber from 'bignumber.js'
import memoize from 'lodash/memoize'
import _trimEnd from 'lodash/trimEnd'
import { BIG_TEN } from './bigNumber'

export const getFullDecimalMultiplier = memoize(
  (decimals: number): BigNumber => {
    return BIG_TEN.pow(decimals)
  },
)

export const getBalanceAmount = (
  amount: BigNumber,
  decimals: number | undefined = 18,
) => {
  return new BigNumber(amount).dividedBy(getFullDecimalMultiplier(decimals))
}

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  displayDecimals: number,
): string => {
  if (balance === undefined) return '--'

  const stringNumber = getBalanceAmount(balance, decimals)

  if (stringNumber.toNumber() === 0) {
    return '0'
  }

  const stringNumberFixed = stringNumber.toFixed(displayDecimals as number, 1)
  const bigStringNumberFixed = new BigNumber(stringNumberFixed)

  // if (bigStringNumberFixed.toNumber() === 0) {
  //   return `<0.${'0'.repeat(displayDecimals - 1)}1`
  // }

  // const num =
  //   +stringNumberFixed < 1
  //     ? +stringNumberFixed
  //     : (+stringNumberFixed).toLocaleString()

  const num = bigStringNumberFixed?.valueOf()

  return displayDecimals ? num : _trimEnd(_trimEnd(num, '0'), '.')
}

export const DEFAULT_TOKEN_DECIMAL = getFullDecimalMultiplier(18)

export const getDecimalAmount = (
  amount: BigNumber,
  decimals = 18,
  isNeedInt = false,
) => {
  const baseNum = new BigNumber(amount).times(
    getFullDecimalMultiplier(decimals),
  )
  return isNeedInt ? new BigNumber(baseNum.integerValue()) : baseNum
}
