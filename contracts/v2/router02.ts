import { BASE_TOKEN_ADDRESS, CONTRACT_ROUTER02 } from 'constants/chains'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useContractWrite, usePrepareContractWrite, useAccount, useNetwork } from 'wagmi'
import router02Abi from 'abis/v2/router02'
import { BigNumber } from '@ethersproject/bignumber'
import { useCurrentBlockTimestamp } from './multicall'

const getRouter02Address = (chainId: number) => {
  return CONTRACT_ROUTER02[chainId]
}

// addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)
const _addLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  tokenAAmount: BigNumber,
  tokenBAmount: BigNumber,
  deadline: BigNumber
) => {
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: getRouter02Address(chainId),
    abi: router02Abi,
    functionName: 'addLiquidity',
    args: [tokenA, tokenB, tokenAAmount, tokenBAmount, tokenAAmount, tokenBAmount, address, deadline],
  })
  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite(config)
  return {
    write,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    swapETH: false,
  }
}

// addLiquidityETH(address,uint256,uint256,uint256,address,uint256)
const _addLiquidityETH = (
  chainId: number,
  token: string,
  amount: BigNumber,
  ethAmount: BigNumber,
  deadline: BigNumber
) => {
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: getRouter02Address(chainId),
    abi: router02Abi,
    functionName: 'addLiquidityETH',
    args: [token, amount, amount, ethAmount, address, deadline],
    value: ethAmount,
  })
  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite(config)
  return {
    write,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    swapETH: true,
  }
}

const useAddLiquidity = (
  chainId: number,
  tokenA: string,
  tokenB: string,
  tokenAAmount: BigNumber,
  tokenBAmount: BigNumber,
  deadline: BigNumber
) => {
  if ([tokenA, tokenB].includes(BASE_TOKEN_ADDRESS))
    return _addLiquidityETH(
      chainId,
      tokenA === BASE_TOKEN_ADDRESS ? tokenB : tokenA,
      tokenA === BASE_TOKEN_ADDRESS ? tokenAAmount : tokenBAmount,
      tokenA === BASE_TOKEN_ADDRESS ? tokenBAmount : tokenAAmount,
      deadline
    )
  return _addLiquidity(chainId, tokenA, tokenB, tokenAAmount, tokenBAmount, deadline)
}

export { useAddLiquidity }
