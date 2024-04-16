import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CircledCheckMarkF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd'>
      <circle
        cx={10}
        cy={10}
        r={9.25}
        stroke={props?.color ? 'currentColor' : '#515166'}
        fill={props?.color ? 'currentColor' : undefined}
        strokeWidth={1.5}
      />
      <path
        fill='#515166'
        fillRule='nonzero'
        d='m15 6-6.277 8L5 9.423l2.302-.022 1.42 1.78L12.778 6z'
      />
    </g>
  </Svg>
)
