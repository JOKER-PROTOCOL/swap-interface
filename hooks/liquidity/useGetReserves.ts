import { useMemo } from 'react'
import { Address, useContractRead } from 'wagmi'
import BigNumber from 'bignumber.js'
import router02Abi from 'abis/v2/router02'
import pairAbi from 'abis/v2/pair'
import factoryAbi from 'abis/v2/factory'
import { Token } from 'sdk/tokens'
import { getBalanceAmount } from 'utils/formatBalance'
import { getSortedTokenPairV2, isNativeToken } from 'utils/token'

export const useGetReserves = ({
  liquidityAddress,
  tokenA,
  tokenB,
}: {
  liquidityAddress: Address
  tokenA: Token
  tokenB: Token
}) => {
  const { data: addressWeth } = useContractRead({
    address: liquidityAddress,
    abi: router02Abi,
    functionName: 'WETH',
  })

  const tokenAAddress = useMemo(
    () => (isNativeToken(tokenA) ? addressWeth : tokenA?.address),
    [tokenA, addressWeth],
  )
  const tokenBAddress = useMemo(
    () => (isNativeToken(tokenB) ? addressWeth : tokenB?.address),
    [tokenB, addressWeth],
  )

  // 1. get the address of `factory contract`
  const { data: factoryContractAddress } = useContractRead({
    address: liquidityAddress,
    abi: router02Abi,
    functionName: 'factory',
  })

  // 2. get the address of `pair contract`
  const { data: pairContract } = useContractRead({
    address: factoryContractAddress as Address,
    abi: factoryAbi,
    functionName: 'getPair',
    args: [tokenAAddress, tokenBAddress],
    watch: true,
  })
  // console.log('pairContract--', pairContract)

  // 3. get `reserves` by using pair contract
  const { data: reserves } = useContractRead({
    address: (pairContract || '') as Address,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  // @ts-ignore
  const [reserve0, reserve1] = reserves || []

  const { sorted } = getSortedTokenPairV2({
    token1: { address: tokenAAddress },
    token2: { address: tokenBAddress },
  })

  const [tokenAReserves, tokenBReserves] = sorted
    ? [reserve0, reserve1]
    : [reserve1, reserve0]

  const [reservesRatioAB, reservesRatioBA] = useMemo(
    () =>
      tokenAReserves && tokenBReserves
        ? [
            getBalanceAmount(tokenAReserves, tokenA?.decimals).dividedBy(
              getBalanceAmount(tokenBReserves, tokenB?.decimals),
            ),
            getBalanceAmount(tokenBReserves, tokenB?.decimals).dividedBy(
              getBalanceAmount(tokenAReserves, tokenA?.decimals),
            ),
          ]
        : [],
    [tokenAReserves, tokenBReserves, tokenA, tokenB],
  )

  return {
    tokenAReserves: new BigNumber(tokenAReserves),
    tokenBReserves: new BigNumber(tokenBReserves),
    // reserveA / reserveB
    reservesRatioAB,
    // reserveB / reserveA
    reservesRatioBA,
    addressWeth,
  }
}
