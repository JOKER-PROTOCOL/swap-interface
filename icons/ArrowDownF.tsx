import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const ArrowDownF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 12 12' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M0 12h12V0H0z' />
      <path
        fill='currentColor'
        fillRule='nonzero'
        d='M10 7.798 6 12 2 7.798V6.09l3.415 3.53V0h1.17v9.62L10 6.09z'
      />
    </g>
  </Svg>
)
