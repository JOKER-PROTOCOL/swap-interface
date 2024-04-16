import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const ArrowRightF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path
        stroke='currentColor'
        strokeWidth={2.4}
        d='M1.2 1.2h29.6v29.6H1.2z'
        opacity={0.1}
      />
      <path
        fill='currentColor'
        fillRule='nonzero'
        d='M15.781 22.4 22.4 16l-6.619-6.4h-2.689l5.559 5.463H9.6v1.874h9.051L13.092 22.4z'
      />
    </g>
  </Svg>
)
