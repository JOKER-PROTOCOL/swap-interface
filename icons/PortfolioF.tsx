import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const PortfolioF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M0 0h20v20H0z' />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M2.75 2.75h14.5v14.5H2.75z'
      />
      <path fill='currentColor' d='M9.111 2h1.6v16h-1.6z' />
      <path fill='currentColor' d='M10 9h8v1.5h-8z' />
    </g>
  </Svg>
)
