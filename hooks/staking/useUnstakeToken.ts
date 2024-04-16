import BigNumber from 'bignumber.js';
import { Address, useContractWrite,  usePrepareContractWrite } from 'wagmi';

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export const useUnstakeToken = ({ unstakeAmount, stakingAddress, stakingAbi}:{
  unstakeAmount: BigNumber
  stakingAddress: Address
  stakingAbi: any
})=> {
  const { config } = usePrepareContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'unstake',
    args: [unstakeAmount]
  })

  return useContractWrite(config)
}