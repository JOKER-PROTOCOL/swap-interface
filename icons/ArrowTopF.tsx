import * as React from 'react'
import { SvgProps } from 'components/Base/Svg'
import { ArrowDownF } from './ArrowDownF'

export const ArrowTopF = (props: SvgProps) => (
  <ArrowDownF className='rotate-180' {...props} />
)
