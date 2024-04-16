// import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useMemo } from 'react'
import { Token } from 'sdk/tokens'

import { useContractRead, erc20ABI, Address } from 'wagmi'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(tokenAddress: Address) {
  const {
    data: totalSupplyStr,
    isError,
    isLoading,
  } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'totalSupply',
  })

  //   const totalSupplyStr: string | undefined = useSingleCallResult(
  //     contract,
  //     'totalSupply',
  //   )?.result?.[0]?.toString()

  //   return useMemo(
  //     () =>
  //       token?.isToken && totalSupplyStr
  //         ? CurrencyAmount.fromRawAmount(token, totalSupplyStr)
  //         : undefined,
  //     [token, totalSupplyStr],
  //   )
  console.log('totalSupplyStr', totalSupplyStr)
  return totalSupplyStr
}
