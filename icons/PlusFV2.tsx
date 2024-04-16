import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const PlusFV2 = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <rect width={16} height={2} x={8} y={15} fill='currentColor' rx={1} />
    <rect width={2} height={16} x={15} y={8} fill='currentColor' rx={1} />
  </Svg>
)
