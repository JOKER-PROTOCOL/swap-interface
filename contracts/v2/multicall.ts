import { BigNumber } from '@ethersproject/bignumber'
import { useContractRead } from 'wagmi'
import { CONTRACT_MULTICALL } from 'constants/chains'
import multicallAbi from 'abis/v2/multicall'

const getMulticallAddress = (chainId: number) => {
  return CONTRACT_MULTICALL[chainId]
}

const useCurrentBlockTimestamp = (chainId: number) => {
  const { data, isError, isLoading } = useContractRead({
    address: getMulticallAddress(chainId),
    abi: multicallAbi,
    functionName: 'getCurrentBlockTimestamp',
  })
  return { data, isError, isLoading }
}

export { useCurrentBlockTimestamp }
