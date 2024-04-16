import { ReactNode } from 'react'
import { Box, Text, OrangeLink, Tooltip } from 'components/Base'
import BigNumber from 'bignumber.js'
import { useClaimableRewards } from 'hooks'
import { TipsF } from 'icons'
import classNames from 'classnames'

interface ItemProps {
  label: string | ReactNode
  value: string | ReactNode
  labelClassName?: string
  valueClassName?: string
  tip?: ReactNode
}

interface AssetsProps {
  publicClient: any
  stakedAmount: BigNumber
  // lastRewards: BigNumber
  lastStakeTime: BigNumber
  iconUrl: string
  symbol: string
  apr: number
  rewardSymbol: string
  lastRewards: BigNumber
}

export const Item = ({
  label,
  value,
  labelClassName,
  valueClassName,
  tip,
}: ItemProps) => (
  <div className='flex justify-between mb-4 last:mb-2'>
    <Text
      variant='normal'
      color='text-lightGray'
      className={classNames('flex items-center', labelClassName)}
    >
      {label}
      {tip && (
        <Tooltip tip={tip} padding='ml-2'>
          <TipsF color='text-paleOrange' />
        </Tooltip>
      )}
    </Text>
    <Text variant='normal' className={valueClassName}>
      {value}
    </Text>
  </div>
)

const Items = [
  // 'Gauge Relative Weight', 'My Current Boost', 'My Next Boost',
  'Claimable Rewards',
]

export function Assets({
  publicClient,
  stakedAmount,
  lastStakeTime,
  iconUrl,
  symbol,
  apr,
  rewardSymbol,
  lastRewards,
}: AssetsProps) {
  const claimableRewards = useClaimableRewards({
    publicClient,
    stakedAmount,
    apr,
    lastStakeTime,
    lastRewards,
  })
  console.log('lastRewards:', lastRewards)

  return (
    <Box bg='bg-blackBlue' className='mb-[88px]' padding='px-5 py-4'>
      <Text variant='h3' className='mb-6'>
        My Assets
      </Text>
      <div className='mb-6 flex justify-between'>
        <div className='flex align-center'>
          <img src={iconUrl} className='w-6 h-6 rounded-full' />
          <Text variant='normal' className='ml-2 leading-6'>
            {rewardSymbol || '--'} Rewards
          </Text>
        </div>
        <div className='flex'>
          <OrangeLink>Boost</OrangeLink>
          <Text className='ml-1' variant='normal'>
            your yield up to 2.5x
          </Text>
        </div>
      </div>

      {Items?.map((item, index) => (
        <Item key={index} label={item} value={claimableRewards} />
      ))}
    </Box>
  )
}
