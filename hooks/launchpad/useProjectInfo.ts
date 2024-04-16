import { ReactNode, useMemo, useState } from 'react'
import { Address, useContractReads, useContractRead, useAccount } from 'wagmi'
import { launchpadAbi } from 'abis/launchpad'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'
import { useLaunchpadList } from './useLaunchpad'

export const useSingleProjectConfig = (projectId: string) => {
  const projectList = useLaunchpadList()

  const config = useMemo(
    () => projectList?.filter(item => item.productId === projectId),
    [projectList, projectId],
  )

  return config?.length > 0 ? config[0] : {}
}

export const useProjectInfo = ({
  lpdAddress,
  softCap,
  hardCap,
  totalTokensSold,
}: {
  lpdAddress: Address
  softCap: BigNumber
  hardCap: BigNumber
  totalTokensSold: BigNumber
}) => {
  const { address: account } = useAccount()

  const contractBase = {
    address: lpdAddress,
    abi: launchpadAbi,
  }

  const contracts = [
    {
      ...contractBase,
      functionName: 'totalWeiRaised',
    },
    {
      ...contractBase,
      functionName: 'claimedTokens',
      args: [account],
    },
    {
      ...contractBase,
      functionName: 'donations',
      args: [account],
    },
  ]

  const { data, isSuccess } = useContractReads({
    contracts,
    watch: true,
  })

  const { data: calculateTokensClaimable, isSuccess: claimableSuccess } =
    useContractRead({
      ...contractBase,
      functionName: 'calculateTokensClaimable',
      account,
      watch: true,
    })

  const [totalWeiRaised, claimedTokens, donations] = data || []
  const _totalWeiRaised = new BigNumber(totalWeiRaised?.result)

  const salePrice = useMemo(() => {
    // userAsset < softCap
    if (_totalWeiRaised?.isLessThan(softCap))
      return softCap?.dividedBy(totalTokensSold)
    // softCap < userAsset < hardCap
    else if (_totalWeiRaised?.isLessThan(hardCap))
      return _totalWeiRaised?.dividedBy(totalTokensSold)
    // userAsset > hardCap
    else return hardCap?.dividedBy(totalTokensSold)
  }, [_totalWeiRaised, softCap, hardCap, totalTokensSold])

  return {
    totalWeiRaised: _totalWeiRaised,
    salePrice,
    donations: new BigNumber(donations?.result),
    calculateTokensClaimable: new BigNumber(calculateTokensClaimable),
    isClaimed: claimedTokens?.result,
    isSuccess,
  }
}
