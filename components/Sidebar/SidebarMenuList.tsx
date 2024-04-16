import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, BTN_VARIANT } from 'components/Base/Button'
import { SIDEBAR_MENU } from 'constants/ui'
import { ComingSoon } from 'components/header'

interface IMenu {
  getIcon: (props: boolean) => ReactNode
  key: string
  url: string
}

const MenuItem = ({
  menu,
  active = false,
}: {
  active?: boolean
  menu: IMenu
}) => {
  const { getIcon, key, url } = menu
  const icon = getIcon?.(active)

  return active ? (
    <Link href={url} className='block'>
      <Button
        variant={BTN_VARIANT.dark}
        className='flex w-full justify-start items-center shrink-0'
        space='py-2 px-4'
      >
        {icon}
        {key}
      </Button>
    </Link>
  ) : (
    <Link href={url} className='block'>
      <div className='flex items-center text-primary px-4 py-2'>
        <div
          className={`flex items-center shrink-0 ${!url ? 'opacity-30' : ''}`}
        >
          {icon}

          {key}
        </div>
        {!url && <ComingSoon className='left-0' />}
      </div>
    </Link>
  )
}

const SocialMedia = () => {
  const { pathname } = useRouter()

  return (
    <>
      {SIDEBAR_MENU.map((menu, idx) => (
        <MenuItem
          key={idx}
          menu={menu}
          active={menu.url && pathname.startsWith(menu.url)}
        />
      ))}
    </>
  )
}

export default SocialMedia
