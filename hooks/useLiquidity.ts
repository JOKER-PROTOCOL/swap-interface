import { useEffect, useMemo, useState } from 'react'

import {
  Address,
  erc20ABI,
  useAccount,
  useNetwork,
  useContractRead,
  useContractReads,
  useContractWrite,
  useChainId,
  useToken,
} from 'wagmi'
import JSBI from 'jsbi'
import { parseEther } from 'viem'
import { updateLocalStorage, getMyPositionStorageKey } from 'utils/base'

import { useTokenBalanceV2, useTokensBalance } from './useTokenBalance'
import BigNumber from 'bignumber.js'
import { useAllowance } from './useAllowance'
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { useTokensByNetwork } from './useTokenList'
import { IToken } from 'types/token'
import {
  getSortedTokenPair,
  isNativeToken,
  isWrappedToken,
  toV2LiquidityToken,
} from 'utils/token'
import { Token } from 'sdk/tokens'
import { CurrencyAmount } from 'sdk/pairs'
import { useV2Pair, usePairsMap, usePairContractAddress } from './usePairs'
import { useTotalSupply } from './useTotalSupply'
import { useIsApprovedEnough } from './useToken'
import router02Abi from 'abis/v2/router02'
import pairAbi from 'abis/v2/pair'
import { SWAP_NETWORK_MAP } from 'constants/swap'
import { getMinAmountBySlippage, getSwapSettings } from 'utils/swap'
import { getPairInfo } from 'utils/pair'
import { useCurrentTime } from 'hooks'
import { SUBGRAPH_URI_MAP, CONTRACT_ROUTER02 } from 'constants/chains'
import { BIG_ZERO } from 'utils/bigNumber'
import { toFixedPurely } from 'utils/formatNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  useGetPairContractAddressFromSubgraph,
  usePairsInfoByIds,
  useMyPosition as useMyPositionGQL,
  useEthPriceQuery,
} from './useGQL'
import { utils } from 'web3'
import { toast } from 'react-toastify'

const list = [
  {
    id: 1,
    quote: 'ETH',
    base: 'USDC',
    liquidityAmount: '52956454.6',
    apr: '19.45%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
  {
    id: 2,
    quote: 'ETH',
    base: 'zkUSD',
    liquidityAmount: '413,149.5',
    apr: '18.28%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
  {
    id: 3,
    quote: 'USD+',
    base: 'USDC',
    liquidityAmount: '324,985.2',
    apr: '17.45%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
  {
    id: 4,
    quote: 'ETH',
    base: 'USDC',
    liquidityAmount: '52956454.6',
    apr: '19.45%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
  {
    id: 5,
    quote: 'ETH',
    base: 'zkUSD',
    liquidityAmount: '413,149.5',
    apr: '18.28%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
  {
    id: 6,
    quote: 'USD+',
    base: 'USDC',
    liquidityAmount: '324,985.2',
    apr: '17.45%',
    estimate: '364.4',
    basePrice: '18.2',
    quotePrice: '0.009',
  },
]

// TODO: move to util
const getDeadline = (ttl: number, currBlockTime: BigNumber) => {
  const ddl = currBlockTime?.plus(ttl * 60).valueOf() || ''

  return ddl
}

const useTokenPairsMap = () => {
  const { chain } = useNetwork()
  const tokenList = useTokensByNetwork()
  const tokenAddrMap: { [key: Address]: IToken } = tokenList.reduce(
    (_tokenMap: { [key: Address]: IToken }, token: IToken) => {
      const { address } = token
      _tokenMap[address] = token
      return _tokenMap
    },
    {},
  )

  const generatedPairsMap: {
    [key: string]: { pairs: [IToken, IToken]; liquidityToken: IToken }
  } = useMemo(() => {
    if (!chain || !chain?.chainId) return {}
    let _map = {} as { [key: string]: [IToken, IToken] }

    const pairs = Object.keys(tokenAddrMap)
      .map(tokenAddr => {
        Object.keys(tokenAddrMap).map(tokenAddr2 => {
          if (tokenAddr === tokenAddr2) {
            return null
          }
          const { addr, tokens } = getSortedTokenPair({
            token1: tokenAddrMap[<Address>tokenAddr],
            token2: tokenAddrMap[<Address>tokenAddr2],
          })

          if (!addr || _map[addr]) {
            return null
          }

          _map[addr] = {
            pairs: tokens,
            // liquidityToken: toV2LiquidityToken(_tokens),
          }
        })
      })
      .filter(boolean)

    return pairs
  }, [tokenAddrMap, chain])

  // console.log('generatedPairs', generatedPairsMap)

  return generatedPairsMap
}

export const useMyPositionPair = liquidityAddress => {
  // const { balance } = useTokensBalance(pairContract)
  // const { data } = useToken({ address: pairContract })
  // const { totalSupply } = data || {}

  // pair.getLiquidityValue(tokenA, totalSupply, balance, false)
  const data = useV2Pair(liquidityAddress)

  console.log('useMyPosition data', data)
}

export const useLiquidityPair = (liquidityAddress: Address) => {
  const pairsMap = usePairsMap()
  const tokens = pairsMap[liquidityAddress]

  const { data: reserves } = useContractRead({
    address: (liquidityAddress || '') as Address,
    abi: pairAbi,
    functionName: 'getReserves',
  })

  // if (!tokens || !reserves) {
  //   return null
  // }
  const chainId = useChainId()
  const { address } = useAccount()

  if (!liquidityAddress || !chainId) {
    return null
  }

  // const { data: { users = [] } = {} } = useMyPositionGQL(address?.toLowerCase())
  // if (users && users[0] && users[0].liquidityPositions) {
  //   const liquidityPositions = users[0].liquidityPositions
  //   const pairInfo = liquidityPositions.find(it => it.id === liquidityAddress)
  //   console.log('111 useLiquidityPair', address, pairInfo)
  //   return pairInfo
  // }

  // const data = useV2Pair(liquidityAddress)
  // console.log('useLiquidityPair', data)

  // return null
  console.log('111 useLiquidityPair', reserves, pairsMap, liquidityAddress)

  return useV2Pair(liquidityAddress)
  // return getPairInfo({
  //   liquidityAddress,
  //   pairsMap,
  //   reserves,
  // })
}

export const useLiquidityPairsMap = () => {
  const { address: account } = useAccount()
  const chainId = useChainId()
  const pairsMap = usePairsMap()
  const pairEntries = Object.entries(pairsMap)
  const args = pairEntries.map(([liquidityAddress, tokens]) => {
    // const [token1, token2] = tokens
    return {
      abi: pairAbi,
      // address: token1.address,
      functionName: 'getReserves', // 比例
      address: (liquidityAddress || '') as Address,
    }
  })
  const {
    data: results,
    isError,
    isLoading,
  } = useContractReads({ contracts: args })

  const _map = {}
  // console.log('useLiquidityPairsMap1', results)

  results?.map((data, idx) => {
    const [liquidityAddress, tokens] = pairEntries[idx]
    const [tokenA, tokenB] = tokens
    const { result } = data

    _map[liquidityAddress] = getPairInfo({
      liquidityAddress,
      pairsMap,
      reserves: result,
    })
  })

  console.log('useLiquidityPairsMap2', _map)

  return _map
}

export const useTokenBalancesWithLoadingIndicator = ({ tokenPairsMap }) => {
  // const tokenList = useTokensByNetwork()
  // const tokenPairsMap = useTokenPairsMap()
  const tokenPairs = Object.keys(tokenPairsMap).map(
    id => tokenPairsMap[id]?.liquidityToken,
  ) as Token[]
  const { data: tokensBalances } = useTokensBalance(
    tokenPairs.map((it: Token) => it.address),
  )

  // console.log('tokensBalance', tokensBalance)

  const v2PairsBalances = useMemo(() => {
    tokenPairs.reduce((memo, token, i) => {
      const value = tokensBalances?.[i]?.result?.[0]
      const amount = value ? new BigNumber(value.toString()) : undefined

      if (amount) {
        memo[token.address] = value
      }
      return memo
    }, {})
  }, [tokenPairs, tokensBalances])

  // console.log('v2PairsBalances', v2PairsBalances)

  return v2PairsBalances
}

export const useLiquidityList = () => {
  // const generatedPairsMap = useTokenPairsMap()
  const generatedPairsMap = useLiquidityPairsMap()
  // const v2PairsBalances = useTokenBalancesWithLoadingIndicator({
  //   tokenPairsMap: generatedPairsMap,
  // })

  // const liquidityTokensWithBalances = useMemo(
  //   () =>
  //     Object.entries(generatedPairsMap).filter(({ liquidityToken }) =>
  //       v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
  //     ),
  //   [generatedPairsMap, v2PairsBalances],
  // )

  return Object.keys(generatedPairsMap).map(idx => generatedPairsMap[idx]) || []
}

export const useLiquidityTotalList = () => {
  const chainId = useChainId()
  const liquidityList = useLiquidityList()
  const { data: pairsInfo } = usePairsInfoByIds()
  console.log('111 useLiquidityTotalList pairsInfo', pairsInfo)
  return SUBGRAPH_URI_MAP[chainId] ? pairsInfo : liquidityList
}

export const useLiquidityTrending = () => {
  return list.slice(0, 3)
}

export const useEthPrice = () => {
  const chainId = useChainId()
  if (chainId) {
    const { data: { bundles = [] } = {} } = useEthPriceQuery()
    const { ethPrice = '0' } = bundles[0] || {}
    return ethPrice
  }
}

export const useMyPosition = () => {
  const chainId = useChainId()
  const { address } = useAccount()
  if (chainId) {
    const { data: { users = [] } = {} } = useMyPositionGQL(
      address?.toLowerCase(),
    )
    if (users && users[0] && users[0].liquidityPositions) {
      const liquidityPositions = users[0].liquidityPositions
      const myPositionList = liquidityPositions.map(it => {
        const { id, liquidityTokenBalance, pair } = it
        const { reserve0, reserve1, reserveETH, totalSupply } = pair
        const myPosition = +liquidityTokenBalance / +totalSupply
        return {
          liquidityAddress: id,
          liquidityTokenBalance: liquidityTokenBalance,
          ...it.pair,
          myPosition,
          token0Balance: +reserve0 * myPosition,
          token1Balance: +reserve1 * myPosition,
          estBalanceEth: +reserveETH * myPosition,
        }
      })
      console.log('111 userMyPosition', address, myPositionList)
      return myPositionList
    }

    // const myPositionKey = getMyPositionStorageKey(chainId)
    // const pairsInfo = localStorage.getItem(myPositionKey)
    // try {
    //   const _pairsInfo = pairsInfo ? JSON.parse(pairsInfo) : {}
    //   console.log('111 _pairsInfo', _pairsInfo)
    // } catch (e) {}
  }
  // const liquidityList = useLiquidityList()
  // console.log('111 userMyposition2', liquidityList)

  return []
}

export const useMyPositionById = pairAddr => {
  if (!pairAddr) {
    return {}
  }
  const myPositionList = useMyPosition()
  const position = myPositionList.find(it => {
    const { liquidityAddress } = it
    const [addr] = liquidityAddress.split('-')
    return addr === pairAddr.toLowerCase()
  })

  return position || {}
}

// export const formatValue = (val: string | number | undefined) => {
//   const currentAmount = val ? new BigNumber(val) : undefined
//   const convertedDecimalAmount = currentAmount
//     ? getDecimalAmount(currentAmount, 4)
//     : undefined
//   return [currentAmount, convertedDecimalAmount]
// }

export const useLiquidityBtnStatus = (
  balanceA: string | BigNumber,
  balanceB: string | BigNumber,
  isApproveA: boolean,
  isApproveB: boolean,
  isConnected: boolean,
  tokenA: Token,
  valueA: string,
  valueB: string,
  tokenB: Token,
): { code: string; btnMsg: string } => {
  const isEthTokenA = isNativeToken(tokenA)
  const isEthTokenB = isNativeToken(tokenB)

  const btnStatus = useMemo(() => {
    if (!isConnected)
      return {
        code: '-1',
        btnMsg: 'Unconnected',
      }

    if (!tokenA || !tokenB || tokenA?.symbol === tokenB?.symbol)
      return {
        code: '-1',
        btnMsg: 'Invalid pair',
      }

    if (!valueA || !valueB)
      return {
        code: '-1',
        btnMsg: 'Please enter amount',
      }

    // ETH no need to approve
    if (!isEthTokenA && !isApproveA) {
      return {
        code: '1',

        btnMsg: `Unlock ${tokenA.symbol}`,
      }
    }

    if (!isEthTokenB && !isApproveB) {
      return {
        code: '2',
        btnMsg: `Unlock ${tokenB.symbol}`,
      }
    }

    if (
      getDecimalAmount(new BigNumber(valueA), tokenA?.decimals)?.isGreaterThan(
        new BigNumber(balanceA),
      ) ||
      getDecimalAmount(new BigNumber(valueB), tokenB?.decimals).isGreaterThan(
        new BigNumber(balanceB),
      )
    ) {
      return {
        code: '-1',
        btnMsg: 'Insufficient Balance',
      }
    }
    return {
      code: '3',
      btnMsg: 'Deposit',
    }
  }, [
    balanceA,
    balanceB,
    isApproveA,
    isApproveB,
    isConnected,
    tokenA,
    valueA,
    valueB,
    tokenB,
  ])

  return btnStatus
}

export const useDepositData = ({
  tokenA,
  tokenB,
  valueA,
  valueB,
  spender,
  swapSettings,
}) => {
  const { address, isConnected } = useAccount()

  const { balance: balanceA } = useTokenBalanceV2(tokenA)
  const { balance: balanceB } = useTokenBalanceV2(tokenB)
  const { isApprovedEnough: isApproveA } = useIsApprovedEnough(
    tokenA?.address || '',
    new BigNumber(valueA),
    spender,
    tokenA?.decimals,
  )
  const { isApprovedEnough: isApproveB } = useIsApprovedEnough(
    tokenB?.address || '',
    new BigNumber(valueB),
    spender,
    tokenB?.decimals,
  )

  const btnStatus = useLiquidityBtnStatus(
    balanceA,
    balanceB,
    isApproveA,
    isApproveB,
    isConnected,
    tokenA,
    valueA,
    valueB,
    tokenB,
  )

  return {
    btnStatus,
    balanceA,
    balanceB,
  }
}

export const useWithdrawBtnStatus: { code: string; btnMsg: string } = ({
  tokenA,
  valueA,
  pairBalance,
  spender,
}) => {
  const { isConnected } = useAccount()

  const {
    isApprovedEnough: isApproveA,
    // allowance,
    // isApproved,
  } = useIsApprovedEnough(
    tokenA?.address || '',
    valueA,
    spender,
    0, // valueA including decimal
  )

  const btnStatus = useMemo(() => {
    if (!isConnected)
      return {
        code: '-1',
        btnMsg: 'Unconnected',
      }

    if (!valueA)
      return {
        code: '-1',
        btnMsg: 'Please enter amount',
      }

    if (new BigNumber(valueA)?.isGreaterThan(pairBalance)) {
      return {
        code: '-1',
        btnMsg: 'Insufficient Balance',
      }
    }

    if (!isApproveA) {
      return {
        code: '1',
        btnMsg: `Unlock ${tokenA?.symbol}`,
      }
    }

    return {
      code: '3',
      btnMsg: 'Withdraw',
    }
  }, [isApproveA, isConnected, tokenA, valueA])

  return btnStatus
}

export const useLiquidityPairInfo = (tokenA: Token, tokenB: Token) => {
  const { address: account } = useAccount()
  const [, pair] = useV2Pair([tokenA, tokenB])

  // balances
  const relevantTokenBalances = useTokensBalance(
    pair?.liquidityToken?.map(it => it.address),
  )
  const userLiquidity =
    relevantTokenBalances?.[pair?.liquidityToken?.address ?? '']

  const tokens = {
    0: tokenA,
    1: tokenB,
    liquidity: pair?.liquidityToken,
  }

  const percentToRemove = '100'

  // liquidity values
  const totalSupply = useTotalSupply(pair?.liquidityToken)
  const liquidityValueA =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenA &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(
          tokenA,
          pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false)
            .quotient,
        )
      : undefined
  const liquidityValueB =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenB &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(
          tokenB,
          pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false)
            .quotient,
        )
      : undefined
  const liquidityValues = {
    0: liquidityValueA,
    1: liquidityValueB,
  }

  const parsedAmounts = {
    liquidity: userLiquidity
      ? CurrencyAmount.fromRawAmount(
          userLiquidity.currency,
          percentToRemove.multiply(userLiquidity.quotient).quotient,
        )
      : undefined,
    0:
      tokenA && liquidityValueA
        ? CurrencyAmount.fromRawAmount(
            tokenA,
            percentToRemove.multiply(liquidityValueA.quotient).quotient,
          )
        : undefined,
    1:
      tokenB && liquidityValueB
        ? CurrencyAmount.fromRawAmount(
            tokenB,
            percentToRemove.multiply(liquidityValueB.quotient).quotient,
          )
        : undefined,
  }

  return { pair, parsedAmounts }
}

const getDepositParams = ({
  tokenA,
  tokenB,
  valueA,
  valueB,
  address,
  account,
  currBlockTime,
  swapSettings,
}): {
  functionName: string
  args: any
  payableAmount?: string
} => {
  if (!tokenA || !tokenB || !valueA || !valueB)
    return { functionName: '', args: [] }

  let depositParams = {}
  const isEthTokenA = isNativeToken(tokenA)
  const isEthTokenB = isNativeToken(tokenB)
  const tokenAAddr = tokenA?.address
  const tokenBAddr = tokenB?.address

  const amountADesired = getDecimalAmount(
    new BigNumber(valueA),
    tokenA?.decimals,
    true,
  )

  const amountBDesired = getDecimalAmount(
    new BigNumber(valueB),
    tokenB?.decimals,
    true,
  )

  const { slippage, timeout } = swapSettings

  const amountAMin = getDecimalAmount(
    getMinAmountBySlippage(valueA, slippage),
    tokenA?.decimals,
    true,
  )

  const amountBMin = getDecimalAmount(
    getMinAmountBySlippage(valueB, slippage),
    tokenB?.decimals,
    true,
  )

  const ttl = timeout || 30
  const deadline = getDeadline(ttl, currBlockTime)

  if (isEthTokenA) {
    depositParams = {
      functionName: 'addLiquidityETH',
      args: [
        tokenBAddr,
        amountBDesired,
        amountBMin,
        amountAMin,
        account, // to
        deadline,
      ],
      payableAmount: parseEther(valueA),
    }
  } else if (isEthTokenB) {
    depositParams = {
      functionName: 'addLiquidityETH',
      args: [
        tokenAAddr,
        amountADesired,
        amountAMin,
        amountBMin,
        account,
        deadline,
      ],
      payableAmount: parseEther(valueB),
    }
  } else {
    depositParams = {
      functionName: 'addLiquidity',
      args: [
        tokenAAddr,
        tokenBAddr,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        account,
        deadline,
      ],
    }
  }

  return depositParams
}

export const useLiquidityDeposit = ({
  address,
  tokenA,
  tokenB,
  valueA,
  valueB,
  swapSettings,
}) => {
  const { address: account } = useAccount()
  const [args, setArgs] = useState([])
  const [functionName, setName] = useState('')
  const [payableAmount, setAmount] = useState('')
  const chainId = useChainId()
  const currBlockTime = useCurrentTime(chainId)

  useEffect(() => {
    const { functionName, args, payableAmount } = getDepositParams({
      tokenA,
      tokenB,
      valueA,
      valueB,
      address,
      account,
      currBlockTime,
      swapSettings,
    })
    setArgs(args)
    setName(functionName)
    setAmount(payableAmount)
  }, [tokenA, tokenB, valueA, valueB, address, account, swapSettings])

  const extraPayload = payableAmount ? { value: payableAmount } : {}

  const router02 = CONTRACT_ROUTER02[chainId]
  // const pairContract = usePairContractAddress({
  //   liquidityAddress: router02 as Address,
  //   tokenA,
  //   tokenB,
  // })

  const pairContract = useGetPairContractAddressFromSubgraph({
    tokenA,
    tokenB,
  })
  console.log('111 pairContract', pairContract)

  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    abi: router02Abi,
    address,
    functionName,
    args,
    ...extraPayload,
    onSuccess(data) {
      if (pairContract && pairContract.id) {
        const checkSumId = utils.toChecksumAddress(pairContract.id)
        const pairInfo = {
          [checkSumId]: pairContract,
        }
        console.log('111 pairInfo', pairInfo)
        updateLocalStorage(getMyPositionStorageKey(chainId), pairInfo)
      }
      // console.log('Success', data)
      toast.success('Success', {
        position: 'top-right',
        hideProgressBar: true,
      })
    },
    onError(error) {
      console.log('Deposit Error', error)
      toast.error(error?.message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    },
  })

  // const write = () => {
  //   const pairInfo = {
  //     [address]: {
  //       token0: tokenA,
  //       token1: tokenB,
  //     },
  //   }
  //   console.log('111 pairInfo', pairInfo)
  //   updateLocalStorage(`_my_position_${chainId}`, pairInfo)
  // }

  return {
    data,
    isLoading,
    isSuccess,
    write,
    error,
    args,
    payableAmount,
  }
}

const useWithdrawParams = ({
  tokenA,
  tokenB,
  valueA,
  valueB,
  account,
  address,
  // currBlockTime,
  tokenValue,
  isUseNativeToken,
  liquidityAddress,
  pairInfo,
  swapSettings,
}): {
  functionName: string
  args: any
} => {
  const { decimals: pairDecimals = 18, address: pairAddress } =
    pairInfo?.pairToken?.liquidityToken || {}

  const chainId = useChainId()

  const isEthTokenA = isNativeToken(tokenA)
  const isEthTokenB = isNativeToken(tokenB)
  const isWrappedTokenA = isWrappedToken(tokenA)
  const isWrappedTokenB = isWrappedToken(tokenB)

  let withdrawParams = {}
  const tokenAAddr = tokenA?.address
  const tokenBAddr = tokenB?.address
  const liquidity = toFixedPurely(tokenValue, pairDecimals)
  const currBlockTime = useCurrentTime(chainId)

  const { data: addressWeth } = useContractRead({
    address,
    abi: router02Abi,
    functionName: 'WETH',
  })

  const { slippage, timeout } = swapSettings

  const amountAMin = getMinAmountBySlippage(valueA, slippage)

  const amountBMin = getMinAmountBySlippage(valueB, slippage)

  const ttl = timeout || 30
  const deadline = getDeadline(ttl, currBlockTime)

  if (!tokenA || !tokenB || !valueA || !valueB)
    return { functionName: '', args: [] }

  if (isUseNativeToken && isWrappedTokenA) {
    withdrawParams = {
      functionName: 'removeLiquidityETH',
      args: [
        tokenBAddr,
        liquidity,
        amountBMin?.integerValue(BigNumber.ROUND_CEIL), // token
        amountAMin?.integerValue(BigNumber.ROUND_CEIL), // eth
        account,
        deadline,
      ],
    }
  } else if (isUseNativeToken && isWrappedTokenB) {
    withdrawParams = {
      functionName: 'removeLiquidityETH',
      args: [
        tokenAAddr,
        liquidity,
        amountAMin?.integerValue(BigNumber.ROUND_CEIL),
        amountBMin?.integerValue(BigNumber.ROUND_CEIL),
        account,
        deadline,
      ],
    }
  } else {
    withdrawParams = {
      functionName: 'removeLiquidity',
      args: [
        tokenAAddr, // isEthTokenA ? addressWeth : tokenAAddr,
        tokenBAddr, // isEthTokenB ? addressWeth : tokenBAddr,
        liquidity,
        amountAMin?.integerValue(BigNumber.ROUND_CEIL),
        amountBMin?.integerValue(BigNumber.ROUND_CEIL),
        account,
        deadline,
      ],
    }
  }

  return withdrawParams
}

export const useWithdrawData = (pairToken, tokenA, tokenB, tokenLiquidity) => {
  const valueA =
    pairToken?.getLiquidityValue(tokenA, tokenLiquidity) || BIG_ZERO

  const valueB =
    pairToken?.getLiquidityValue(tokenB, tokenLiquidity) || BIG_ZERO

  return [valueA, valueB]
}

export const useLiquidityWithdraw = ({
  address,
  tokenValue,
  liquidityAddress,
  tokenA,
  tokenB,
  valueA,
  valueB,
  isUseNativeToken = false,
  pairInfo,
  swapSettings,
}) => {
  const { address: account } = useAccount()

  const chainId = useChainId()
  const currBlockTime = useCurrentTime(chainId)

  const { functionName, args } = useWithdrawParams({
    tokenA,
    tokenB,
    valueA,
    valueB,
    address,
    tokenValue,
    account,
    isUseNativeToken,
    // currBlockTime,
    liquidityAddress,
    pairInfo,
    swapSettings,
  })

  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    abi: router02Abi,
    address,
    functionName,
    args,
    onSuccess(data) {
      console.log('Success', data)
      toast.success('Success', {
        position: 'top-right',
        hideProgressBar: true,
      })
    },
    onError(error) {
      console.log('Withdraw Error', error)
      toast.error(error?.message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    },
  })

  return {
    data,
    isLoading,
    isSuccess,
    write,
    error,
    args,
  }
}
