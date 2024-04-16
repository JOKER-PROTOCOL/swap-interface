import { useMemo } from 'react'
import { toast } from 'react-toastify'
import {
  Address,
  useAccount,
  useNetwork,
  useChainId,
  useFeeData,
  useContractWrite,
} from 'wagmi'

import { useTokenBalanceV2 } from './useTokenBalance'
import BigNumber from 'bignumber.js'
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { isNativeToken, isWrappedToken } from 'utils/token'
import { Token } from 'sdk/tokens'
import { useIsApprovedEnough } from 'hooks/useToken'
import router02Abi from 'abis/v2/router02'
import wethAbi from 'abis/v2/weth'
import { SWAP_NETWORK_MAP } from 'constants/swap'
import { getMinAmountBySlippage, getDeadline } from 'utils/swap'
import { useGetAmountsOut } from 'hooks/liquidity/useGetAmount'
import { useCurrentTime } from 'hooks'

export const useSwapBtnStatus = (
  balanceA: string | BigNumber,
  //   bnValueA,
  isApproveA: boolean,
  isConnected: boolean,
  tokenA: Token,
  valueA: string,
  tokenB: Token,
  isInvalidPair: boolean,
  valueB: string,
  balanceB: string | BigNumber,
  queryAmountInError: any,
  queryAmountOutError: any,
  isSwapBetweenNativeTokenAndWrappedToken?: boolean,
): { code: string; btnMsg: string } => {
  const btnStatus = useMemo(() => {
    if (!isConnected)
      return {
        code: '-1',
        btnMsg: 'Unconnected',
      }

    if (
      !tokenA ||
      !tokenB ||
      tokenA?.address === tokenB?.address ||
      isInvalidPair
    )
      return {
        code: '-1',
        btnMsg: 'Invalid pair',
      }

    if (!valueA)
      return {
        code: '-1',
        btnMsg: 'Please enter amount',
      }

    if (
      getDecimalAmount(new BigNumber(valueA), tokenA?.decimals)?.isGreaterThan(
        new BigNumber(balanceA),
      )
    )
      return {
        code: '-1',
        btnMsg: 'Insufficient Balance',
      }

    if (
      (queryAmountInError?.cause?.reason ||
        queryAmountOutError?.cause?.reason) &&
      !isSwapBetweenNativeTokenAndWrappedToken
    )
      return {
        code: '-1',
        btnMsg: (
          queryAmountInError?.cause?.reason ||
          queryAmountOutError?.cause?.reason
        )?.replace('UniswapV2Library:', ''),
      }

    if (!isApproveA && !isNativeToken(tokenA)) {
      return {
        code: '1',
        btnMsg: `Unlock ${tokenA?.symbol}`,
      }
    }

    return {
      code: '3',
      btnMsg: 'Swap',
    }
  }, [
    isConnected,
    balanceA,
    balanceB,
    isApproveA,
    tokenA,
    tokenB,
    valueA,
    valueB,
    queryAmountInError,
    queryAmountOutError,
    isInvalidPair,
  ])

  return btnStatus
}

export const useSwapData = ({
  tokenA,
  valueA,
  tokenB,
  valueB,
  address,
  path,
  queryAmountInError,
  queryAmountOutError,
}: {
  tokenA: Token | undefined
  tokenB: Token | undefined
  valueA: string
  valueB: string
  address: Address
  path: Array<string>
  queryAmountInError: null | object
  queryAmountOutError: null | object
}) => {
  const { isConnected } = useAccount()

  const isSwapBetweenNativeTokenAndWrappedToken = useMemo(
    () =>
      (isNativeToken(tokenA as Token) && isWrappedToken(tokenB as Token)) ||
      (isNativeToken(tokenB as Token) && isWrappedToken(tokenA as Token)),
    [tokenA, tokenB],
  )

  const { balance: balanceA, refetch: refetchBalanceA } =
    useTokenBalanceV2(tokenA)

  const { balance: balanceB, refetch: refetchBalanceB } =
    useTokenBalanceV2(tokenB)

  const refetchBalance = () => {
    refetchBalanceA?.()
    refetchBalanceB?.()
  }

  const { isApprovedEnough: isApproveA } = useIsApprovedEnough(
    tokenA?.address || '',
    new BigNumber(valueA),
    address,
    tokenA?.decimals,
  )

  // 链上的 fee
  const { data, isFetched } = useFeeData()

  const { amountOut: swapPrice, status: swapPriceStatus } = useGetAmountsOut({
    liquidityAddress: address,
    amountOutParams: {
      valueIn: 1,
      path,
      decimals: tokenA?.decimals,
    },
  })

  const btnStatus = useSwapBtnStatus(
    balanceA,
    isApproveA,
    isConnected,
    tokenA,
    valueA,
    tokenB,
    swapPriceStatus !== 'success' && !isSwapBetweenNativeTokenAndWrappedToken, // isInvalidPair
    valueB,
    balanceB,
    queryAmountInError,
    queryAmountOutError,
    isSwapBetweenNativeTokenAndWrappedToken,
  )

  return {
    btnStatus,
    balanceA,
    balanceB,
    refetchBalance,
    gasFeeData: {
      isFetched,
      data,
      formatted: data?.formatted,
    },
    // 1ETH = 1 WETH
    swapPrice: isSwapBetweenNativeTokenAndWrappedToken ? 10 ** 18 : swapPrice,
    isInvalidPair:
      swapPriceStatus !== 'success' && !isSwapBetweenNativeTokenAndWrappedToken,
    isSwapBetweenNativeTokenAndWrappedToken,
  }
}

const getSwapParams = ({
  tokenA,
  tokenB,
  valueA,
  valueB,
  currBlockTime,
  addressWeth,
  swapSettings,
}) => {
  const { address: to } = useAccount()
  const { slippage, timeout } = swapSettings

  const amountOutMin = getDecimalAmount(
    getMinAmountBySlippage(valueB, slippage),
    tokenB?.decimals,
    true,
  )

  const amountIn = getDecimalAmount(new BigNumber(valueA), tokenA?.decimals)

  const ttl = timeout || 30
  const deadline = getDeadline(ttl, currBlockTime)

  let swapParams = {}
  if (isNativeToken(tokenA)) {
    swapParams = {
      functionName: 'swapExactETHForTokens',
      args: [
        amountOutMin,
        [addressWeth, tokenB?.address],
        to,
        new BigNumber(deadline),
      ],
      ethValue: amountIn,
    }
  } else if (isNativeToken(tokenB)) {
    swapParams = {
      functionName: 'swapExactTokensForETH',
      args: [
        amountIn,
        amountOutMin,
        [tokenA?.address, addressWeth],
        to,
        new BigNumber(deadline),
      ],
    }
  } else {
    swapParams = {
      functionName: 'swapExactTokensForTokens',
      args: [
        amountIn,
        amountOutMin,
        [tokenA?.address, tokenB?.address],
        to,
        new BigNumber(deadline),
      ],
    }
  }

  return swapParams
}

export const useSwap = ({
  tokenA,
  tokenB,
  valueA,
  valueB,
  addressWeth,
  swapSettings,
}) => {
  const { chain } = useNetwork()
  const chainId = useChainId()
  const currBlockTime = useCurrentTime(chainId)

  const { functionName, args, ethValue } = getSwapParams({
    tokenA,
    tokenB,
    valueA,
    valueB,
    currBlockTime,
    addressWeth,
    swapSettings,
  })

  const {
    data,
    isLoading,
    isSuccess,
    write: swap,
  } = useContractWrite({
    chainId: chain?.id,
    abi: router02Abi,
    address: SWAP_NETWORK_MAP[chain?.id]?.contractAddress || '',
    functionName,
    args,
    value: ethValue,
    onSuccess() {
      toast.success('Success', {
        position: 'top-right',
        hideProgressBar: true,
      })
    },
    onError(e) {
      console.log('swap error', { e, args })
      toast.error(e?.message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      })
    },
  })

  // eth <-> weth
  const {
    isLoading: isLoadingWrappedToken,
    write: swapNativeTokenAndWrappedToken,
  } = useContractWrite({
    chainId: chain?.id,
    abi: wethAbi,
    address: addressWeth,
    functionName: isNativeToken(tokenA) ? 'deposit' : 'withdraw',
    args: isNativeToken(tokenA)
      ? []
      : [getDecimalAmount(new BigNumber(valueA))],
    value: ethValue,
    onError(e) {
      console.log('swap native token error', { e, args })
    },
  })

  return {
    data,
    isLoading,
    isSuccess,
    swap,
    swapNativeTokenAndWrappedToken,
    isLoadingWrappedToken,
  }
}
