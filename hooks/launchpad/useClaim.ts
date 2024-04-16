import BigNumber from 'bignumber.js'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { launchpadAbi } from 'abis/launchpad'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export const useClaim = ({
  lpdAddress,
}: {
  lpdAddress: Address
}) => {
  const { config, isError, error } = usePrepareContractWrite({
    address: lpdAddress,
    abi: launchpadAbi,
    functionName: 'claim',
  })
  // console.log('claim', { config, isError, error })

  return useContractWrite(config)
}
