import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useResponsive } from 'ahooks'
import classNames from 'classnames'
import Link from 'next/link'

import { BurgerF, CloseF } from 'icons'
import { SIDEBAR_MENU } from 'constants/ui'
import { ZKDConnectButton as ConnectButton } from 'components/ConnectButton'
import { Text } from 'components/Base'
import { Logo } from 'components/Logo'

export const ComingSoon = ({ className }: { className?: string }) => (
  <div
    className={classNames(
      'px-2 py-[6px] rounded-md shrink-0 text-warmingUp text-xl scale-50 leading-[10px] relative left-[-26px] top-[1px]',
      className,
    )}
    style={{
      background: 'rgba(255, 91, 0, 0.05)',
    }}
  >
    Coming soon
  </div>
)

export function Header() {
  const { isXL } = useResponsive() || {}
  const router = useRouter()
  const pathname = usePathname()
  const isShowExtraMenu = pathname?.startsWith('/liquidity')
  const isPositionActive =
    pathname?.startsWith('/liquidity/position') ||
    pathname?.startsWith('/liquidity/pair')
  const isPoolsActive = pathname?.startsWith('/liquidity') && !isPositionActive

  const HeaderPc = () => (
    <nav className='flex justify-between my-4 mx-10'>
      <div className='flex'>
        {isShowExtraMenu && (
          <Link href='/liquidity'>
            <Text
              variant='h2'
              className='text-bold'
              color={isPoolsActive ? 'text-primary' : 'text-lightGray-900'}
            >
              Pools
            </Text>
          </Link>
        )}
        {isShowExtraMenu && (
          <Link href='/liquidity/position'>
            <Text
              variant='h2'
              className='ml-10 text-bold'
              color={isPositionActive ? 'text-primary' : 'text-lightGray-900'}
            >
              Position
            </Text>
          </Link>
        )}
      </div>
      <ConnectButton />
    </nav>
  )

  const HeaderMobile = () => {
    const [currTitle, setTitle] = useState('')
    const [isShowMenu, setIsShow] = useState(false)

    const toggleShow = () => setIsShow(!isShowMenu)

    const onMenuClick = (_, item: { url: string }) => {
      item?.url && router.push(item.url)
    }

    return (
      <>
        <nav className='px-6 py-2 relative z-10 bg-white'>
          <div className='relative z-10 flex justify-between items-center'>
            <Logo />

            {isShowMenu ? (
              <CloseF size='14px' onClick={toggleShow} />
            ) : (
              <BurgerF size='20px' onClick={toggleShow} />
            )}
          </div>

          {currTitle && (
            <Text variant='subTitle1' className='mt-3 font-semibold'>
              {currTitle}
            </Text>
          )}

          {/* menu panel */}
          {isShowMenu && (
            <div className='z-10 absolute left-0 right-0 pb-4 px-6 bg-white text-primary'>
              <div className='mb-6 mt-9'>
                <ConnectButton />
              </div>
              {SIDEBAR_MENU.map((item, index) => {
                const icon = item?.getIcon?.(false)
                const isComingSoon = !item?.url

                return (
                  <div
                    className='flex py-2 px-3 mb-4 last:mb-0 h-10'
                    key={item.key}
                  >
                    <div
                      className={`flex items-center ${
                        isComingSoon ? 'opacity-30' : ''
                      }`}
                      key={index}
                      onClick={e => onMenuClick(e, item)}
                    >
                      {icon}
                      <Text>{item?.key}</Text>
                    </div>

                    {isComingSoon && <ComingSoon />}
                  </div>
                )
              })}
            </div>
          )}
        </nav>

        {/* mask */}
        {isShowMenu && (
          <div
            className='mask z-[2] fixed top-0 left-0 right-0 bottom-0'
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        )}
      </>
    )
  }

  return isXL ? <HeaderPc /> : <HeaderMobile />
}
