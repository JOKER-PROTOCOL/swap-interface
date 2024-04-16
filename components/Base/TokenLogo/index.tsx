import classNames from 'classnames'
import Image from 'next/image'
import { Token } from 'sdk/tokens'

export const TokenLogo = ({
  token,
  size = 24,
  className,
}: {
  token: Token
  size: number
  className?: string
}) => {
  const { logoURI = '', symbol } = token || {}

  if (!token || !logoURI) {
    return null
  }

  return (
    <Image
      src={logoURI}
      alt={symbol}
      className={classNames('rounded-full', className)}
      width={size}
      height={size}
      // to load external images, unoptimized must be true
      unoptimized={true}
    />
  )
}
