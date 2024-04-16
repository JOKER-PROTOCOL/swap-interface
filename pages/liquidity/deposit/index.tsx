import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'
import {
  WithdrawDepositContainer,
  ADD_LIQUIDITY_MENU,
} from 'components/biz-liquidity/WithdrawDepositContainer'

const AddLiquidity = () => {
  return <WithdrawDepositContainer tabId={ADD_LIQUIDITY_MENU[0].id} />
}

AddLiquidity.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AddLiquidity
