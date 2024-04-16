import { useMemo } from 'react'
import {
  Address,
  erc20ABI,
  useAccount,
  useNetwork,
  useContractRead,
  useContractReads,
  useToken,
  useChainId,
} from 'wagmi'
import pairAbi from 'abis/v2/pair'
import router02Abi from 'abis/v2/router02'
import factoryAbi from 'abis/v2/factory'

import { Pair, CurrencyAmount } from 'sdk/pairs'
import { Token } from 'sdk/tokens'
import { toV2LiquidityToken, isNativeToken } from 'utils/token'
import { getPairInfo } from 'utils/pair'
import { NATIVE_LIQUIDITY_PAIRS } from 'constants/token'

import { useTokenBalance } from './useTokenBalance'
import BigNumber from 'bignumber.js'
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { useTotalSupply } from './useTotalSupply'
import { convertToToken, getMyPositionStorageKey } from 'utils/base'
import { usePairsInfoByIds } from './useGQL'
import { utils } from 'web3'

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export const usePairsMap = () => {
  const chainId = useChainId()
  const { data: pairsInfo } = usePairsInfoByIds()

  if (!chainId) return {}

  // const nativePairs = [] // set it to empty since we can get all data from subgraph
  // NATIVE_LIQUIDITY_PAIRS[chainId as keyof typeof NATIVE_LIQUIDITY_PAIRS] || []
  // TODO: concat pairs in localstorage
  let pairs = {}
  if (chainId) {
    // const myPositionKey = getMyPositionStorageKey(chainId)
    // const pairsInfo = localStorage.getItem(myPositionKey)

    try {
      // const parsedPairInfo = pairsInfo ? JSON.parse(pairsInfo) : {}
      pairsInfo.map(it => {
        const { token0, token1 } = it
        const _token0 = convertToToken({
          chainId,
          ...token0,
          address: token0.id,
        })
        const _token1 = convertToToken({
          chainId,
          ...token1,
          address: token1.id,
        })
        const addr = utils.toChecksumAddress(it.id)
        pairs[addr] = [_token0, _token1]
      })
      // localPairMapping = pairsInfo ? JSON.parse(pairsInfo) : {}
    } catch (e) {
      console.log('err usePairsMap', e)
    }
  }
  // const pairs = { ...nativePairs, ...localPairMapping }
  console.log('111 usePairsMap', pairs)

  return pairs || {}
}

export const usePairContractAddress = ({
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

  console.log('usePairContractAddress', pairContract)

  return pairContract
}

export const useV2Pair = (liquidityAddress: Address) => {
  const pairsMap = usePairsMap()
  const tokens = pairsMap[liquidityAddress]

  const { balance } = useTokenBalance({ tokenAddress: liquidityAddress })
  const totalSupplyStr = useTotalSupply(liquidityAddress || '')

  const { data: reserves } = useContractRead({
    address: (liquidityAddress || '') as Address,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  if (!tokens || !reserves) {
    return null
  }

  const data = getPairInfo({
    liquidityAddress,
    pairsMap,
    reserves,
    balance,
    // balance: getDecimalAmount(new BigNumber(0.6328)),
    totalSupply: totalSupplyStr,
  })

  console.log('0409 useV2Pair', data)
  return data
}

export const useV2Pairs = (tokensList: [Token, Token][]) => {
  const { address: account } = useAccount()
  const liquidityTokensList = tokensList.map(tokens =>
    toV2LiquidityToken(tokens),
  )
  const liquidityAddrs = liquidityTokensList.map(token => token.address)

  // TODO calculate user position according to the reserve percentage
  const args = liquidityAddrs.map(addr => ({
    // chainId: chain?.id,
    abi: erc20ABI,
    address: addr,
    functionName: 'getReserves',
    args: [account],
    enabled: !!account,
    watch: false,
  }))

  const {
    data: results,
    isError,
    isLoading,
  } = useContractReads({
    contracts: args,
  })

  console.log('results', results)

  return useMemo(() => {
    return (results || []).map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokensList[i][0]
      const tokenB = tokensList[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB))
        return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA?.sortsBefore?.(tokenB)
        ? [tokenA, tokenB]
        : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
        ),
      ]
    })
  }, [results, tokens])
}

// export const useV2Pair = (tokenPair: [Token, Token]) => {
//   return useV2Pairs([tokenPair])[0]
// }
