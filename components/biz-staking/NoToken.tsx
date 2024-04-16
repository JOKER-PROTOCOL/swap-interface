import { Box, Text } from 'components/Base'

export function NoToken() {
  return (
    <Box bg='bg-blackBlue' className='mb-[88px]' padding='px-5 py-4'>
      <Text variant='h3' color='text-white' className='py-6'>
        Coming soon, <br />
        switch network to see more...
      </Text>
    </Box>
  )
}
