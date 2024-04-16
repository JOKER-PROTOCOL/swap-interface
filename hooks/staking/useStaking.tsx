import React, { useMemo, useState } from 'react'
import { Address, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { BigNumber } from 'bignumber.js'
import { MaxUint256 } from 'utils/bigNumber'
import { getFullDisplayBalance } from 'utils/formatBalance'
import {
  useApproveToken,
  useStakeToken,
  useUnstakeToken,
  useClaimRewards,
} from '../index'

interface UseStakingButtonProps {
  tokenAddress: Address | string
  stakingAddress: Address | string
  convertedValueWithDecimal: BigNumber | undefined
  stakingAbi: any[]
  isStake: boolean
  stakeInsufficient: boolean | undefined
  isApprovedEnough: boolean | undefined
}

interface UseClaimableRewardsProps {
  publicClient: any
  stakedAmount: BigNumber
  apr: number
  lastStakeTime: BigNumber
  lastRewards: BigNumber
}

export const useStakingButton = ({
  tokenAddress,
  stakingAddress,
  convertedValueWithDecimal,
  stakingAbi,
  isStake,
  stakeInsufficient,
  isApprovedEnough,
}: UseStakingButtonProps) => {
  // approve
  const {
    data: approveData,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    write: writeApprove,
  } = useApproveToken(tokenAddress, stakingAddress)

  // stake
  const {
    data: stakeData,
    isLoading: isStakeLoading,
    isSuccess: isStakeSuccess,
    write: writeSkate,
  } = useStakeToken({
    stakingAmount: convertedValueWithDecimal as BigNumber,
    stakingAddress: stakingAddress as Address,
    stakingAbi,
  })

  // unstake
  const {
    data: unstakeData,
    isLoading: isUnstakeLoading,
    isSuccess: isUnstakeSuccess,
    write: writeUnstake,
  } = useUnstakeToken({
    unstakeAmount: convertedValueWithDecimal as BigNumber,
    stakingAddress: stakingAddress as Address,
    stakingAbi,
  })

  // claim
  const {
    data: claimData,
    isLoading: isClaimLoading,
    isSuccess: isClaimSuccess,
    write: writeClaim,
  } = useClaimRewards({
    stakingAddress: stakingAddress as Address,
    stakingAbi,
  })

  // left button info
  const {
    leftButtonText,
    isLeftButtonDisabled,
    onLeftButtonClick = () => {},
  } = useMemo(() => {
    if (isStake) {
      if (isApprovedEnough)
        return {
          leftButtonText: !isStakeLoading ? 'Stake' : 'Staking...',
          isLeftButtonDisabled:
            isStakeLoading || !writeSkate || stakeInsufficient,
          onLeftButtonClick: () => {
            // console.log('stake')
            writeSkate?.()
          },
        }
      return {
        isLeftButtonDisabled: isApproveLoading || !writeApprove,
        leftButtonText: !isApproveLoading ? 'Approve ZKT' : 'Approving...',
        onLeftButtonClick: () => {
          // console.log('approve')
          writeApprove?.()
        },
      }
    } else {
      return {
        isLeftButtonDisabled: isClaimLoading || !writeClaim,
        leftButtonText: !isClaimLoading ? 'Claim' : 'Claiming...',
        onLeftButtonClick: () => {
          // console.log('claim')
          writeClaim?.()
        },
      }
    }
  }, [
    isStake,
    stakeInsufficient,
    isApprovedEnough,
    isStakeLoading,
    isApproveLoading,
    isClaimLoading,
    writeSkate,
    writeApprove,
    writeClaim,
  ])

  // right button info
  const {
    rightButtonText,
    isRightButtonDisable,
    onRightButtonClick = () => {},
  } = useMemo(() => {
    if (isStake)
      return stakeInsufficient
        ? { rightButtonText: 'Insufficient', isRightButtonDisable: true }
        : { rightButtonText: '', isRightButtonDisable: false }

    return {
      rightButtonText:
        !isClaimLoading && !isUnstakeLoading
          ? 'Unstake & Claim'
          : 'Unstake & Claim ...',
      isRightButtonDisable: isClaimLoading || !writeUnstake || isUnstakeLoading,
      onRightButtonClick: () => {
        // console.log('unstake & claim')
        writeUnstake?.()
      },
    }
  }, [
    isStake,
    stakeInsufficient,
    isClaimLoading,
    isUnstakeLoading,
    writeUnstake,
  ])

  return {
    leftButtonText,
    isLeftButtonDisabled,
    onLeftButtonClick,
    rightButtonText,
    isRightButtonDisable,
    onRightButtonClick,
  }
}

const SECONDS_OF_A_YEAR = 365 * 24 * 60 * 60

export const useClaimableRewards = ({
  publicClient,
  stakedAmount,
  apr,
  lastStakeTime,
  lastRewards,
}: UseClaimableRewardsProps) => {
  const secondApr = apr / SECONDS_OF_A_YEAR
  const [currTimestamp, setCurrTimestamp] = useState(0)

  publicClient
    .getBlock()
    .then(blockInfo => setCurrTimestamp(blockInfo?.timestamp))

  // claimableRewards = lastRewards + (currTimestamp - lastStakeTime) * (secondApr / 100) * stakedAmount
  const claimableRewards = useMemo(
    () =>
      new BigNumber(currTimestamp)
        .minus(new BigNumber(lastStakeTime))
        .multipliedBy(secondApr / 100)
        .multipliedBy(stakedAmount)
        .plus(lastRewards),
    [currTimestamp, lastStakeTime, secondApr, stakedAmount, lastRewards],
  )

  return getFullDisplayBalance(claimableRewards, 0, 8)
}
