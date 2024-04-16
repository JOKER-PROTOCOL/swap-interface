import { Box, Text, OrangeLink } from 'components/Base'
import { Item } from './Assets'

interface Props {
  apr: number
  totalAmount: string
}

export function Statistics({ apr, totalAmount }: Props) {
  return (
    <Box bg='bg-blackBlue' className='mb-[88px]' padding='px-5 py-4'>
      <div className='mb-6 flex justify-between'>
        <Text variant='h3'>My Assets</Text>
        <div className='flex'>
          <OrangeLink>View on Etherscan</OrangeLink>
        </div>
      </div>

      <Item label='Annual percentage rate' value={`${apr}%`} tip='' />
      <Item label='Total staked with ZKT' value={totalAmount} />
      <Item label='Stakers' value={apr} />
    </Box>
  )
}
