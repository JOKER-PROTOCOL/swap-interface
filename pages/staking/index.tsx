import { ReactElement } from 'react'
import { StakingBanner, TokenList } from 'components/biz-staking'
import Layout from 'components/layout/AppLayout'

const Staking = () => {
  return (
    <div>
      <StakingBanner />
      <TokenList />
    </div>
  )
}

Staking.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Staking
