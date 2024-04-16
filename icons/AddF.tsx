import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const AddF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 24 24' {...props}>
    <g fill='none' fillRule='evenodd'>
      <circle cx={12} cy={12} r={11} stroke='currentColor' strokeWidth={2} />
      <path
        fill='currentColor'
        d='M13 6v5h5v2h-5.001L13 18h-2l-.001-5H6v-2h5V6h2Z'
      />
    </g>
  </Svg>
)
