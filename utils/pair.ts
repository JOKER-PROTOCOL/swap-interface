import BigNumber from 'bignumber.js'
import { BIG_ZERO } from './bigNumber'
import { PairV2 } from 'sdk/pairs/pairV2'
import {
  getFullDecimalMultiplier,
  getFullDisplayBalance,
} from './formatBalance'
import { isNativeToken, isWrappedToken } from './token'
import { getSortedTokenPairV2 } from 'utils/token'

export const getReservesRatio = (reserves = []) => {
  const [tokenAReserves, tokenBReserves] = reserves || []

  if (tokenAReserves && tokenBReserves) {
    return [
      new BigNumber(tokenAReserves).dividedBy(tokenBReserves),
      new BigNumber(tokenBReserves).dividedBy(tokenAReserves),
    ]
  }

  return []
}

export const getPairInfo = ({
  liquidityAddress,
  pairsMap,
  reserves,
  balance,
  totalSupply,
}) => {
  if (!pairsMap[liquidityAddress]) {
    return {}
  }
  const _balance = balance ? new BigNumber(balance) : BIG_ZERO
  const _totalSupply = totalSupply ? new BigNumber(totalSupply) : BIG_ZERO
  const [_tokenA, _tokenB] = pairsMap[liquidityAddress]
  const { tokens: [tokenA, tokenB] = [] } = getSortedTokenPairV2({
    token1: _tokenA,
    token2: _tokenB,
  })

  const [tokenAReserves, tokenBReserves] = reserves || []
  const pair = new PairV2(liquidityAddress, [tokenA, tokenB], _totalSupply, [
    tokenAReserves,
    tokenBReserves,
  ])
  const tokenBalance = [
    pair.getLiquidityValue(tokenA, _balance),
    pair.getLiquidityValue(tokenB, _balance),
  ]

  const [reservesRatioAB, reservesRatioBA] = getReservesRatio(reserves)

  return {
    tokenA,
    tokenB,
    reserves,
    base: tokenA.symbol,
    quote: tokenB.symbol,
    liquidityAddress,
    tokenAReserves: new BigNumber(tokenAReserves),
    tokenBReserves: new BigNumber(tokenBReserves),
    reservesRatioAB,
    reservesRatioBA,
    pairBalance: _balance,
    tokenBalance,
    poolShare: _balance.dividedBy(_totalSupply),
    pairToken: pair,
    totalSupply: _totalSupply,
    isNativeToken: [isNativeToken(tokenA), isNativeToken(tokenB)],
    isWrappedToken: [isWrappedToken(tokenA), isWrappedToken(tokenB)],
  }
}
