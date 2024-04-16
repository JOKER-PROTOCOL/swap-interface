import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const SwapF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M20 0v20H0V0z' />
      <path
        fill='currentColor'
        d='m2 8 6-4-.468 2.5H18V8H2Zm16 4-6 4 .468-2.5H2V12h16Z'
      />
    </g>
  </Svg>
)
