import { Address, useContractRead } from 'wagmi'

export const useStakeTotalAmount = ({
  stakingAddress,
  stakingAbi,
}: {
  stakingAddress: Address
  stakingAbi: any
}) => {
  const { data, isSuccess, refetch } = useContractRead({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'stakeTotalAmount',
    watch: true,
  })

  return { totalAmount: data, isTotalStakeSuccess: isSuccess }
}
