import { ReactElement, useEffect, useRef } from 'react'
import Layout from 'components/layout/AppLayout'
import { Text } from 'components/Base/Text'

import { LiquidityTable } from 'components/biz-liquidity'
import { usePairsInfoByIds } from 'hooks/useGQL'

const Liquidity = () => {
  const { data: pairsInfo } = usePairsInfoByIds()

  return (
    <div>
      {/* <Text variant='h3'>Trending</Text> */}
      {/* <TrendingList /> */}
      <LiquidityTable pairsInfo={pairsInfo} />
    </div>
  )
}

Liquidity.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Liquidity
