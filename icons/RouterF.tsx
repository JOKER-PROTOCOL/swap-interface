import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const RouterF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <g fill='none' fillRule='evenodd' stroke='currentColor' strokeWidth={1.5}>
      <path d='M0 8.5h3.5L11 3M3.5 8.5 11 13' />
      <path d='M10.75.75h4.5v4.5h-4.5zM10.75 10.75h4.5v4.5h-4.5z' />
    </g>
  </Svg>
)
