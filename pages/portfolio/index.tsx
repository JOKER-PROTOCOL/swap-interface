import { ReactElement } from 'react'
import Layout from 'components/layout/AppLayout'

const Portfolio = () => {
  return <div>Portfolio coming soon...</div>
}

Portfolio.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Portfolio
