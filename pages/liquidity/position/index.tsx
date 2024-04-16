import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'
import { PositionList } from 'components/biz-liquidity'

const Position = () => {
  return <PositionList />
}

Position.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Position
