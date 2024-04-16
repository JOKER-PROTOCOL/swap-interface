import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'
import { Box } from 'components/Base/Box'
import { Swap } from 'components/biz-swap'

const SwapPage = () => {
  return (
    <div>
      <div className='flex justify-center mt-4'>
        <Box className='w-[496px]' padding='px-6 py-6'>
          <Swap />
        </Box>
      </div>
    </div>
  )
}

SwapPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default SwapPage
