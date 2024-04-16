import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CloseF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 14 14' {...props}>
    <path
      fill='none'
      fillRule='evenodd'
      stroke='currentColor'
      strokeWidth={2}
      d='m1 1 12 12m0-12L1 13'
    />
  </Svg>
)
