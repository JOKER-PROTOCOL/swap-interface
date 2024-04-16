import { Box, Text, OrangeLink, BORDER_RADIUS, Tooltip } from 'components/Base'
import { ArrowRightF } from 'icons'
interface Props {
  apr?: number
  totalAmount?: string
  isDetailPage?: boolean
}

export function StakingBanner({
  apr,
  totalAmount,
  isDetailPage = false,
}: Props) {
  return (
    <Box
      bg='bg-blackBlue'
      className='flex justify-between'
      borderRadius={BORDER_RADIUS['3xl']}
      padding='px-10 py-7'
    >
      <div>
        <Text variant='h1'>Stake ZKT</Text>
        <Text variant='normal' className='pt-3 pb-4'>
          Get staking rewards, and use ZKT across the ecosystem.
        </Text>
        <OrangeLink className='flex'>
          <Text variant='h4' color='text-paleOrange' className='mr-3'>
            Learn more
          </Text>
          <ArrowRightF size='32px' color='text-white' />
        </OrangeLink>
      </div>

      <div className='flex'>
        {/* APR */}
        <div className='mr-10'>
          <div className='flex items-center'>
            <Text className='mr-2'>APR</Text>
            {/* <Tooltip tip='test'>
              <TipsF color='text-paleOrange' />
            </Tooltip> */}
          </div>
          <Text variant='h1' color='text-lightGreen'>
            <div>{apr || '-'}%</div>
          </Text>
        </div>

        {/* Total Staked */}
        {isDetailPage && (
          <div>
            <Text>Total Staked</Text>
            <Text variant='h1'>{totalAmount || '--'}</Text>
          </div>
        )}
      </div>
    </Box>
  )
}
