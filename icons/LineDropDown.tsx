import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LineDropDown = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 12 12' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M0 0h12v12H0z' />
      <path stroke='currentColor' strokeWidth={1.5} d='m1 4 5 5 5-5' />
    </g>
  </Svg>
)
