import { Address, useContractWrite,  usePrepareContractWrite } from 'wagmi';

export const useClaimRewards = ({ stakingAddress, stakingAbi}:{
  stakingAddress: Address
  stakingAbi: any
})=> {
  const { config } = usePrepareContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'claimReward',
  })

  return useContractWrite(config)
}