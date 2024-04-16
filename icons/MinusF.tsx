import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const MinusF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <rect width={16} height={2} x={8} y={15} fill='currentColor' rx={1} />
  </Svg>
)
