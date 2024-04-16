import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TradingF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 48 48' {...props}>
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(12 12)'>
        <path
          fill='currentColor'
          fillRule='nonzero'
          d='m9.041 6.667 1.217 1.216-1.32 1.321h9.542v1.825H5.6v-.921l3.441-3.441Zm5.998 10.666-1.216-1.216 1.32-1.321H5.6V12.97h12.88v.921l-3.44 3.441h-.001Z'
        />
        <circle
          cx={12}
          cy={12}
          r={12}
          stroke='currentColor'
          strokeWidth={1.6}
        />
      </g>
    </g>
  </Svg>
)
