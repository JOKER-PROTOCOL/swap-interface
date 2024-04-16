import { ReactNode, useMemo } from 'react'
import { Box, Text, BORDER_RADIUS } from 'components/Base'
import { useRouter } from 'next/router'
import {
  useLaunchpadList,
  getProjectThemeByStatus,
  PROJECT_STATUS,
  useGetStatusByTime,
  useProjectInfo,
} from 'hooks'
import { ProgressInfo } from './ProgressInfo'
import { Countdown } from '../common/CountDown'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

export interface ItemProps {
  name: string
  productId: string
  status: PROJECT_STATUS
  distributeNum: string
  distributePrice: string
  totalCommitted: string
  hardCap: BigNumber
  softCap: BigNumber
  totalTokensSold: BigNumber
  productCode: string
  currentRaised: number | string
  [key: string]: any
}

export const projectInfo: { label: string; valueField: keyof ItemProps }[] = [
  {
    label: 'Total Tokens Offered',
    valueField: 'totalTokensSold',
  },
  {
    label: 'Hard Cap',
    valueField: 'hardCap',
  },
  {
    label: 'Sale Price',
    valueField: 'distributePrice',
  },
  {
    label: 'Total Committed',
    valueField: 'totalCommitted',
  },
]

const Label = ({ children }: { children: ReactNode }) => (
  <Text
    variant='subTitle2'
    color='text-lightGray-500'
    className='w-[140px] mr-10'
  >
    {children}
  </Text>
)

const Value = ({ children }: { children: ReactNode }) => (
  <Text variant='subTitle2' color='text-primary' className='font-semibold'>
    {children}
  </Text>
)

export const renderVal = (key: keyof ItemProps, obj: ItemProps) =>
  key && getFullDisplayBalance(new BigNumber(+obj[key]), obj?.decimals, 4)

const Item = ({ item }: { item: ItemProps }) => {
  const {
    networkName,
    chain,
    productId,
    name,
    currentRaised,
    baseToken,
    purchaseStartTime,
    purchaseEndTime,
    claimStartTime,
    decimal,
    softCap,
    hardCap,
    totalTokensSold,
  } = item

  const { totalWeiRaised, salePrice } = useProjectInfo({
    lpdAddress: item.address,
    softCap,
    hardCap,
    totalTokensSold,
  })

  const status: PROJECT_STATUS = useGetStatusByTime({
    chainId: chain,
    lpdAddress: item.address,
    purchaseStartTime,
    purchaseEndTime,
    claimStartTime,
  })

  const { timeDesc, timeColor, countDownField } =
    getProjectThemeByStatus(status)

  const isShowProgress = useMemo(() => status === 'PURCHASING', [status])
  const router = useRouter()

  return (
    <Box
      bg='bg-lightBlue'
      className='flex mb-8 py-8 cursor-pointer rounded-[24px]'
      onClick={() => router.push(`/launchpad/${networkName}/${productId}`)}
    >
      <img src='' className='mr-8 w-60 h-60 rounded-tr-2xl rounded-bl-2xl' />
      <div>
        <Text variant='h2' className='mb-3 font-extrabold'>
          {name}
        </Text>

        <div className='flex'>
          <Box bg='bg-white' className='mb-5 mr-8 py-[12px] px-4 w-fit'>
            <Text
              className='mb-2 font-bold'
              color={timeColor}
              variant='subTitle2'
            >
              {timeDesc}
            </Text>

            <Countdown
              timeStamp={item[countDownField]}
              chainId={chain}
              isEnd={status === PROJECT_STATUS.END}
            />
          </Box>
          {isShowProgress && (
            <ProgressInfo
              hardCap={hardCap}
              totalWeiRaised={totalWeiRaised}
              decimal={decimal}
              baseToken={baseToken}
            />
          )}
        </div>

        {/* info */}
        <div className='grid grid-cols-2 grid-rows-2 gap-x-20 gap-y-3'>
          <div className='flex'>
            <Label>{projectInfo[0].label}</Label>
            <Value>{`${renderVal(
              projectInfo[0].valueField,
              item,
            )} ${productId}`}</Value>
          </div>

          <div className='flex'>
            <Label>{projectInfo[1].label}</Label>
            <Value>{`${renderVal(
              projectInfo[1].valueField,
              item,
            )} ${baseToken}`}</Value>
          </div>

          <div className='flex'>
            <Label>{projectInfo[2].label}</Label>
            <Value>{`1 ${productId} = ${salePrice} ${baseToken}`}</Value>
          </div>

          <div className='flex'>
            <Label>{projectInfo[3].label}</Label>
            <Value>{`${getFullDisplayBalance(
              totalWeiRaised,
              decimal,
              4,
            )} ${baseToken}`}</Value>
          </div>
        </div>
      </div>
    </Box>
  )
}

export const ProjectList = () => {
  const router = useRouter()
  const projectList: ItemProps[] = useLaunchpadList()

  return (
    <div>
      {projectList?.map((item: ItemProps) => (
        <Item item={item} key={item.symbol} />
      ))}
    </div>
  )
}
