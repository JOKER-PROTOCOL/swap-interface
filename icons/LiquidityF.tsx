import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LiquidityF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M0 0h20v20H0z' />
      <path stroke='currentColor' strokeWidth={1.5} d='m3 5 2 13h10l2-13' />
      <path
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M4.5 13.5 7 12l3 1.5 3-1.5 2.5 2'
      />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M10 2.136C11.45 3.824 12.25 5.102 12.25 6c0 .621-.252 1.184-.659 1.591-.407.407-.97.659-1.591.659a2.243 2.243 0 0 1-1.591-.659A2.243 2.243 0 0 1 7.75 6c0-.898.801-2.177 2.25-3.864Z'
      />
    </g>
  </Svg>
)
