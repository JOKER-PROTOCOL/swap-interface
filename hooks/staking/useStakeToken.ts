import BigNumber from 'bignumber.js'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export const useStakeToken = ({
  stakingAmount,
  stakingAddress,
  stakingAbi,
}: {
  stakingAmount: BigNumber
  stakingAddress: Address
  stakingAbi: any
}) => {
  const { config, isError, error } = usePrepareContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'stake',
    args: [stakingAmount],
  })


  return useContractWrite(config)
}
