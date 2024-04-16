import { ReactElement, useEffect, useState } from 'react'
import { useResponsive } from 'ahooks'
import PropTypes from 'prop-types'
import { Header } from 'components/header'
import Sidebar from 'components/Sidebar'

interface Props {
  withHeader?: boolean
  withSideBar?: boolean
  [key: string]: any
}
export function Layout({
  children,
  ...props
}: {
  children: ReactElement
  props: Props
}) {
  const [isClient, setIsClient] = useState(false)
  const { isXL } = useResponsive() || {}
  const { withHeader = true, withSideBar = true, withFooter = true } = props

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='flex flex-row w-full h-full divide-x divide-solid divide-black'>
      {isXL && withSideBar && <Sidebar />}
      <div
        className={
          withSideBar
            ? 'w-full h-[100vh] overflow-hidden divide-y divide-black divide-solid'
            : 'w-full'
        }
      >
        {withHeader && <Header />}
        {isClient && (
          <main
            className={
              withSideBar
                ? 'flex flex-col h-[calc(100vh-78px)] overflow-auto'
                : ''
            }
          >
            <div className={withSideBar ? 'flex-1 p-6 pb-[80px]' : ''}>
              {children}
            </div>
            {/* {withFooter && <Footer />} */}
          </main>
        )}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
