import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const FreshF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd' stroke='currentColor' strokeWidth={1.5}>
      <path d='m16.5 7.5-.432-.992a7 7 0 1 0 .591 5.655' />
      <path d='M17 3v4.5L12.5 7' />
    </g>
  </Svg>
)
