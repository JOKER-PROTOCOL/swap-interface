import { StakingBanner, DetailContent } from 'components/biz-staking'
import { useRouter } from 'next/router'
import { DarkLink } from 'components/Base'
import Layout from 'components/layout/AppLayout'
import { ReactElement } from 'react'

const StakingDetail = () => {
  const router = useRouter()

  return (
    <div>
      {/* <DarkLink className='inline-block' onClick={() => router.back()}>
        Back
      </DarkLink> */}
      <DetailContent />
    </div>
  )
}

StakingDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default StakingDetail
