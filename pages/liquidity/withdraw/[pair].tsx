import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'
import {
  WithdrawDepositContainer,
  ADD_LIQUIDITY_MENU,
} from 'components/biz-liquidity/WithdrawDepositContainer'

const WithdrawPage = () => {
  const router = useRouter()
  // console.log('query pair', router.query.pair)
  const { pair: pairAddress } = router.query || {}
  console.log('query pair', router, pairAddress)

  return (
    <>
      <WithdrawDepositContainer
        tabId={ADD_LIQUIDITY_MENU[1].id}
        pairAddress={pairAddress}
      />
    </>
  )
}

WithdrawPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default WithdrawPage
