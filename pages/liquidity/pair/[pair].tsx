import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'

import { DarkLink } from 'components/Base/Link'
import { Text } from 'components/Base/Text'
import { Button, BTN_VARIANT } from 'components/Base'
import { ArrowLeft2F } from 'icons'

import { PairDetail } from 'components/biz-liquidity'
import { Address } from 'wagmi'

const DetailPage = () => {
  const router = useRouter()
  const { pair: pairAddress } = router.query || {}
  console.log('query pair', router, pairAddress)

  return (
    <>
      <DarkLink href='/liquidity/position' className='flex items-center'>
        <ArrowLeft2F className='mr-3' />
        Back
      </DarkLink>
      <div className='flex space-x-8 justify-between items-end'>
        <Text variant='h1' className='mt-8'>
          My Position
        </Text>
        {pairAddress && (
          <a href={`/liquidity/withdraw/${pairAddress}`}>
            <Button variant={BTN_VARIANT.dark} className='h-fit'>
              Withdraw
            </Button>
          </a>
        )}
      </div>
      {pairAddress && <PairDetail pairAddress={pairAddress as Address} />}
    </>
  )
}

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default DetailPage
