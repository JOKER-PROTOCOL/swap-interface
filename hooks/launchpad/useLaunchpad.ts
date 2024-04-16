import { useEffect, useMemo, useState } from 'react'
import { usePublicClient, useNetwork, Address } from 'wagmi'
import { BTN_VARIANT } from 'components/Base/Button'
import { LAUNCHPAD_NETWORK_MAP } from 'constants/launchpad/list'
import BigNumber from 'bignumber.js'
import { useCurrentTime } from '../useCurrentTime'

const projectList: DetailInfoProps[] = [
  {
    projectName: 'FOMO DUCK - WARMUP',
    projectId: 1,
    productId: 'DUCK_ZKT',
    productCode: 'DUCK',
    status: 'WARMUP',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: '100000.1',
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'LION DEX - PURCHASING',
    projectId: 2,
    productId: 'LION_ZKT',
    productCode: 'LION',
    status: 'PURCHASING',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: 1000,
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'FOMO DUCK 2 - PURCHASE_END',
    projectId: 3,
    productId: 'DUCK2_ZKT',
    productCode: 'DUCK2',
    status: 'PURCHASE_END',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: 1000,
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'FOMO DUCK 3 - WAITING_CLAIM',
    projectId: 4,
    productId: 'DUCK3_ZKT',
    productCode: 'DUCK2',
    status: 'WAITING_CLAIM',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: '1000',
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'FOMO DUCK 3 - CLAIMING',
    projectId: 5,
    productId: 'DUCK4_ZKT',
    productCode: 'DUCK2',
    status: 'CLAIMING',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: '1000',
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'FOMO DUCK 3 - CLAIMED',
    projectId: 6,
    productId: 'DUCK5_ZKT',
    productCode: 'DUCK2',
    status: 'CLAIMED',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: '1000',
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
  {
    projectName: 'FOMO DUCK 3 - END',
    projectId: 7,
    productId: 'DUCK6_ZKT',
    productCode: 'DUCK2',
    status: 'END',
    distributeNum: '50000000', // tokens offered
    distributePrice: '0.01', // sale price
    totalCommitted: '988834.12345',
    hardCap: '1000',
    assetType: 'ZKT',
    currentRaised: 800,
    startTime: +new Date('2023-07-18'),
    purchaseStartTime: +new Date('2023-07-18'),
    purchaseEndTime: +new Date('2023-07-20'),
    claimStartTime: +new Date('2023-07-22'),
    claimEndTime: +new Date('2023-07-28'),
    endTime: +new Date('2023-07-30'),
    desc: 'Open Campus Protocol is a web3 education protocol for tokenizing educational content by enabling teachers and creators to monetize the content that they created. Its mission .',
  },
]

export interface DetailInfoProps {
  projectName: string
  productId: string
  status?: PROJECT_STATUS
  distributeNum: string
  distributePrice: string
  totalCommitted: string
  hardCap: number | string
  productCode: string
  assetType: string
  currentRaised: number | string
  imgUrl?: string
  startTime: number
  purchaseStartTime: number
  purchaseEndTime: number
  claimStartTime: number
  claimEndTime: number
  endTime: number
  [key: string]: any
}

export interface GetStatusByTimeProps {
  chainId: number
  startTime?: BigNumber
  endTime?: BigNumber
  claimStartTime?: BigNumber
  purchaseEndTime?: BigNumber
  purchaseStartTime?: BigNumber
  lpdAddress: Address
  isClaimed?: boolean
}

export enum PROJECT_STATUS {
  WARMUP = 'WARMUP',
  PURCHASING = 'PURCHASING',
  PURCHASE_END = 'PURCHASE_END',
  WAITING_CLAIM = 'WAITING_CLAIM',
  CLAIMING = 'CLAIMING',
  CLAIMED = 'CLAIMED',
  END = 'END',
}

const STATUS_MAP: { [key: string]: any } = {
  [PROJECT_STATUS.WARMUP]: {
    timeDesc: 'PURCHASE START IN',
    timeColor: 'text-lightGreen',
    countDownField: 'purchaseStartTime',
    detailBtnTxt: 'Ready in {{d}} days {{h}} hours {{m}} minutes',
    detailBtnVariant: BTN_VARIANT.disabled,
    detailBtnDisabled: true,
    tagDesc: 'Preparation',
    tagColor: 'lightGreen',
    tagBg: 'bgGreen',
    timeline: 0,
  },
  [PROJECT_STATUS.PURCHASING]: {
    timeDesc: 'PURCHASE END IN',
    timeColor: 'text-lightGreen',
    countDownField: 'purchaseEndTime',
    detailBtnTxt: 'Purchase',
    detailBtnVariant: BTN_VARIANT.primary,
    detailBtnDisabled: false,
    tagDesc: 'Purchase Start',
    tagColor: 'paleOrange',
    timeline: 1,
  },
  [PROJECT_STATUS.PURCHASE_END]: {
    timeDesc: 'CLAIM START IN',
    timeColor: 'text-strongOrange',
    countDownField: 'claimStartTime',
    detailBtnTxt: 'Purchase End',
    detailBtnVariant: BTN_VARIANT.green,
    detailBtnDisabled: true,
    tagDesc: 'Purchase End',
    tagColor: 'lightGreen',
    timeline: 2,
  },
  [PROJECT_STATUS.WAITING_CLAIM]: {
    timeDesc: 'CLAIM START IN',
    timeColor: 'text-strongOrange',
    countDownField: 'claimStartTime',
    detailBtnTxt: 'Claim in {{d}} days {{h}} hours {{m}} minutes',
    detailBtnVariant: BTN_VARIANT.disabled,
    detailBtnDisabled: true,
    tagDesc: 'Purchase End',
    tagColor: 'lightGreen',
    timeline: 2,
  },
  [PROJECT_STATUS.CLAIMING]: {
    timeDesc: 'CLAIM END IN',
    timeColor: 'text-lightGreen',
    countDownField: 'claimEndTime',
    detailBtnTxt: 'Claim',
    detailBtnVariant: BTN_VARIANT.primary,
    detailBtnDisabled: false,
    tagDesc: 'Claim Start',
    tagColor: 'paleOrange',
    timeline: 3,
  },
  [PROJECT_STATUS.CLAIMED]: {
    timeDesc: 'CLAIM END IN',
    timeColor: 'text-lightGreen',
    countDownField: 'claimEndTime',
    detailBtnTxt: 'Already Claimed',
    detailBtnVariant: BTN_VARIANT.green,
    detailBtnDisabled: true,
    tagDesc: 'Claim Start',
    tagColor: 'lightGreen',
    timeline: 3,
  },
  [PROJECT_STATUS.END]: {
    timeDesc: 'END TIME',
    timeColor: 'text-white',
    countDownField: 'endTime',
    detailBtnTxt: 'End',
    detailBtnVariant: BTN_VARIANT.disabled,
    detailBtnDisabled: true,
    tagDesc: 'End',
    tagColor: 'darkGrayBlue-300',
    timeline: 3,
  },
}

export const getProjectThemeByStatus = (status: PROJECT_STATUS) => {
  const key: string = PROJECT_STATUS[status]
  return STATUS_MAP[key] || {}
}

export const useGetStatusByTime = ({
  chainId,
  startTime,
  purchaseStartTime,
  purchaseEndTime,
  claimStartTime,
  endTime,
  isClaimed = false,
}: GetStatusByTimeProps) => {
  const currTimestamp = useCurrentTime(chainId)

  const status = useMemo(() => {
    if (!currTimestamp) return PROJECT_STATUS.WARMUP

    if (endTime && currTimestamp.isGreaterThanOrEqualTo(endTime))
      return PROJECT_STATUS.END

    if (claimStartTime && currTimestamp.isGreaterThanOrEqualTo(claimStartTime))
      return isClaimed ? PROJECT_STATUS.CLAIMED : PROJECT_STATUS.CLAIMING

    if (
      purchaseEndTime &&
      currTimestamp.isGreaterThanOrEqualTo(purchaseEndTime)
    )
      return PROJECT_STATUS.WAITING_CLAIM

    if (
      purchaseStartTime &&
      currTimestamp.isGreaterThanOrEqualTo(purchaseStartTime)
    )
      return PROJECT_STATUS.PURCHASING

    if (startTime && currTimestamp.isGreaterThanOrEqualTo(startTime))
      return PROJECT_STATUS.WARMUP

    return PROJECT_STATUS.WARMUP
  }, [
    currTimestamp,
    startTime,
    endTime,
    claimStartTime,
    purchaseEndTime,
    purchaseStartTime,
  ])
  // console.log('status', {
  //   status,
  //   currTimestamp,
  //   startTime,
  //   endTime,
  //   claimStartTime,
  //   purchaseEndTime,
  //   purchaseStartTime,
  // })

  return status
}

export const useLaunchpadList = () => {
  const { chain } = useNetwork()
  const launchpadList = useMemo(
    () => LAUNCHPAD_NETWORK_MAP[chain?.id] || [],
    [chain],
  )

  return launchpadList
}
