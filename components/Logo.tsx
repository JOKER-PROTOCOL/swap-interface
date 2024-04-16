import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Text } from 'components/Base'
import { LogoF, LogoGreenF, LogoPurpleF } from 'icons'

const logoMap = {
  primary: LogoF,
  zkLink: LogoGreenF,
}

export const Logo = ({
  className,
  mainColor = 'primary',
}: {
  className?: string
  mainColor?: string
}) => {
  const AsyncLogo = LogoPurpleF
  // logoMap[mainColor] || LogoF

  const [isHomePage, setIsHomepage] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHomepage(window?.location?.pathname === '/')
    }
  }, [])

  return (
    <Link href='/'>
      <div
        className={`flex items-center cursor-pointer ${className}`}
        onClick={() => (window.location.href = '/')}
      >
        <AsyncLogo
          size='38px'
          className='mr-2 text-zkLink'
          color='text-zkLink'
        />
        <Text
          variant='h2'
          color={mainColor}
          className={`font-semibold text-[24px] ${
            isHomePage ? 'md:text-[32px]' : ''
          }`}
        >
          ASYNC
        </Text>
      </div>
    </Link>
  )
}
