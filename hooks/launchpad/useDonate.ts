import BigNumber from 'bignumber.js'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { launchpadAbi } from 'abis/launchpad'
import { parseEther } from 'viem'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export const useDonate = ({
  payableAmount,
  lpdAddress,
}: {
  payableAmount: string
  lpdAddress: Address
}) => {
  const { config } = usePrepareContractWrite({
    address: lpdAddress,
    abi: launchpadAbi,
    functionName: 'donate',
    value: parseEther(payableAmount),
  })

  return useContractWrite(config)
}
