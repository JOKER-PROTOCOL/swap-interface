import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const MiningF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 72 72' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M14 49.5 42.5 21'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={4}
      d='M48.5 33v0a40.249 40.249 0 0 0-18-18v0'
    />
    <circle
      cx={48.5}
      cy={48}
      r={9}
      stroke='currentColor'
      strokeLinejoin='round'
      strokeWidth={4}
    />
  </Svg>
)
