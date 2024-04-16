import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LogoF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 512 512' {...props}>
    <g fill='none' fillRule='nonzero'>
      <path
        fill='#060612'
        d='m256 76 160 265.999-.003.001H309.996L256 252.999l-54 89 .002.001h-106L256 76Z'
      />
      <path
        fill='#CBCBCB'
        d='M256 373.998 310 342h106l-159.999 93.997L96 341.999h106l54 32Z'
      />
    </g>
  </Svg>
)
