import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CheckedF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <circle cx={10} cy={10} r={10} fill='currentColor' />
    <path
      fill='#fff'
      d='m15 6-6.277 8L5 9.423l2.302-.022 1.42 1.78L12.778 6H15Z'
    />
  </Svg>
)
