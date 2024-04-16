import * as React from 'react'
import { SvgProps } from 'components/Base/Svg'
import { ArrowRightF } from './ArrowRightF'

export const ArrowLeftF = (props: SvgProps) => (
  <ArrowRightF className='rotate-180' {...props} />
)
