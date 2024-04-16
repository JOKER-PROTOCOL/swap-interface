import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'
import {
  WithdrawDepositContainer,
  ADD_LIQUIDITY_MENU,
} from 'components/biz-liquidity/WithdrawDepositContainer'
import { useRouter } from 'next/router'
import { Address } from 'wagmi'

const AddLiquidity = () => {
  const router = useRouter()
  const { pair: pairAddress } = router?.query || {}

  return (
    <WithdrawDepositContainer
      tabId={ADD_LIQUIDITY_MENU[0].id}
      pairAddress={pairAddress as Address}
    />
  )
}

AddLiquidity.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AddLiquidity
