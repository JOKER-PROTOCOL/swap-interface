import Link from 'next/link'
import { BTN_VARIANT, Button } from 'components/Base/Button'
import { Input } from 'components/Base/Input'
import { Text } from 'components/Base/Text'
import { useMyPosition, useEthPrice } from 'hooks/useLiquidity'

import { PositionCard } from './PositionCard'

export const PositionList = () => {
  const positionList = useMyPosition()
  const ethPrice = useEthPrice()
  console.log('111 useEthPrice', ethPrice)
  return (
    <>
      <div className='flex space-x-8 justify-between'>
        <div className='space-y-3 flex-1'>
          <Text variant='h1'>Positions</Text>
          <Text variant='subTitle1' color='text-white'>
            Put your assets to work. Deposit to liquidity to earn.
          </Text>
          <Input
            placeholder='ETH, USDT, 0x…'
            width='w-full'
            className='rounded'
          ></Input>
        </div>
        <Link href='/liquidity/deposit'>
          <Button variant={BTN_VARIANT.dark} className='h-fit'>
            New Position
          </Button>
        </Link>
      </div>
      <div className='mt-6 space-y-5'>
        {positionList.map((it, idx) => (
          <PositionCard key={idx} data={it} ethPrice={ethPrice} />
        ))}
      </div>
    </>
  )
}
