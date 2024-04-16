import * as React from 'react'
import { SvgProps } from 'components/Base/Svg'
import { SwapF } from './SwapF'
import classNames from 'classnames'

export const ExchangeF = (props: SvgProps) => {
  const { className, ...others } = props
  return <SwapF className={classNames('rotate-90', className)} {...others} />
}
