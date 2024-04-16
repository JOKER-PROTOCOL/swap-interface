import * as React from 'react'
import { SvgProps } from 'components/Base/Svg'
import { ArrowTopF } from './ArrowTopF'
import classNames from 'classnames'

export const ArrowLeft2F = (props: SvgProps) => {
  const { className, ...others } = props
  return (
    <ArrowTopF className={classNames('rotate-90', className)} {...others} />
  )
}
