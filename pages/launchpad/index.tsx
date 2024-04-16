import { ProjectList } from 'components/biz-launchpad'
import Layout from 'components/layout/AppLayout'
import { ReactElement } from 'react'

const Launchpad = () => {
  return <ProjectList />
}

Launchpad.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Launchpad
