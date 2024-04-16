import { ReactNode, useMemo } from 'react'
import { Box, Text, BORDER_RADIUS } from 'components/Base'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'
import {
  useSingleProjectConfig,
  PROJECT_STATUS,
  useGetStatusByTime,
  useProjectInfo,
} from 'hooks'
import { ProjectInfo } from './ProjectInfo'
import { TimeLine } from './TimeLine'
import { Overview } from './Overview'
import { useChainId, useConnect, useNetwork } from 'wagmi'

export interface DetailInfoProps {
  projectName: string
  productId: string
  status?: PROJECT_STATUS
  distributeNum: string
  distributePrice: string
  totalCommitted: string
  hardCap: BigNumber
  softCap: BigNumber
  productCode: string
  assetType: string
  currentRaised: number | string
  imgUrl?: string
  [key: string]: any
}

export const ProjectDetail = () => {
  const router = useRouter()
  const { chain: currChain } = useNetwork()
  const { projectId = '', networkName } = router.query

  const isRightNetwork = useMemo(
    () => currChain && currChain?.network === networkName,
    [currChain, networkName],
  )

  const projectConfig: DetailInfoProps = useSingleProjectConfig(projectId)

  const {
    chain,
    address,
    purchaseStartTime,
    purchaseEndTime,
    claimStartTime,
    softCap,
    hardCap,
    totalTokensSold,
  } = projectConfig

  const {
    totalWeiRaised,
    salePrice,
    donations,
    calculateTokensClaimable,
    isClaimed,
  } = useProjectInfo({
    lpdAddress: address,
    softCap,
    hardCap,
    totalTokensSold,
  })

  const status = useGetStatusByTime({
    chainId: chain,
    lpdAddress: address,
    purchaseStartTime,
    purchaseEndTime,
    claimStartTime,
    isClaimed,
  })

  if (!isRightNetwork)
    return <div>{`wrong network, please switch to ${networkName}`}</div>
  return (
    <Box padding='px-8 py-6' borderRadius={BORDER_RADIUS['3xl']}>
      <ProjectInfo
        projectConfig={projectConfig}
        status={status}
        totalWeiRaised={totalWeiRaised}
        salePrice={salePrice}
      />
      <TimeLine
        detailInfo={projectConfig}
        status={status}
        donations={donations}
        calculateTokensClaimable={calculateTokensClaimable}
      />
      <Overview productId={projectConfig?.productId} />
    </Box>
  )
}
