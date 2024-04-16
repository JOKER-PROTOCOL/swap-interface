import { ReactElement } from 'react'

import { ProjectDetail } from 'components/biz-launchpad'
import Layout from 'components/layout/AppLayout'

const LaunchpadDetail = () => {
  return <ProjectDetail />
}

LaunchpadDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default LaunchpadDetail
