import { Address, useContractRead, useToken } from 'wagmi'

// get reward token info from staking contract
export const useRewardTokenInfo = ({
  stakingAddress,
  stakingAbi,
}: {
  stakingAddress: Address
  stakingAbi: any
}) => {
  const { data: rewardAddress, isSuccess } = useContractRead({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'rewardToken',
  })

  const { data: rewardTokenInfo = {} } = useToken({
    address: rewardAddress as Address,
  })

  return { rewardSymbol: rewardTokenInfo?.symbol }
}
