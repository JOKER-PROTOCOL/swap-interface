import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Text, Progress } from 'components/Base'
import { getFullDisplayBalance } from 'utils/formatBalance'

export const ProgressInfo = ({
  hardCap,
  totalWeiRaised,
  decimal,
  baseToken,
}: {
  hardCap: BigNumber
  totalWeiRaised: BigNumber
  decimal: number
  baseToken: string
}) => {
  const percentage = useMemo(
    () => totalWeiRaised?.dividedBy(hardCap)?.multipliedBy(100)?.valueOf(),
    [hardCap, totalWeiRaised],
  )

  return (
    <Box
      className='flex h-fit items-end'
      bg='bg-darkGrayBlue-900'
      padding='py-[30px] px-6'
    >
      <div className='mr-8'>
        <Text variant='subTitle2' color='text-paleOrange'>
          Hard Cap
        </Text>
        <Text variant='h3' className='font-medium'>
          {getFullDisplayBalance(hardCap, decimal, 4)} {baseToken}
        </Text>
      </div>

      <div className='mr-5'>
        <Text variant='subTitle2' color='text-paleOrange'>
          Current Raised
        </Text>
        <Text variant='h3' className='font-medium'>
          {getFullDisplayBalance(totalWeiRaised, decimal, 4)} {baseToken}
        </Text>
      </div>

      <Progress percentage={Math.floor(+percentage)} />
    </Box>
  )
}
