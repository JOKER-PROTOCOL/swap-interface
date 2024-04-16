import { Box, BORDER_RADIUS } from 'components/Base/Box'
import { Text } from 'components/Base/Text'
import { ZKLabel } from 'components/Base/ZKLabel'

import { useLiquidityTrending } from 'hooks/useLiquidity'

export const TrendingList = () => {
  const list = useLiquidityTrending()

  return (
    <div className='flex mt-3 space-x-6'>
      {list.map((it, idx) => (
        <Box
          key={idx}
          borderRadius={BORDER_RADIUS['3xl']}
          className='flex-1'
          padding='p-5'
        >
          <div className='min-h-[32px]'></div>
          <Text variant='h3' className='mt-3 font-semibold'>
            {[it.base, it.quote].join(' / ')}
          </Text>
          <div className='flex mt-3'>
            <ZKLabel label='Liquidity' value={`${it.liquidityAmount}`} />
            <ZKLabel label='APR' value={`${it.apr}`} className='ml-6' />
          </div>
        </Box>
      ))}
    </div>
  )
}
