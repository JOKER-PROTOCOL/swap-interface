import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LogoAusdF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 56 56' {...props}>
    <path
      fill='currentColor'
      d='m28 8.313 17.5 29.093H33.906L28 27.672l-5.906 9.734H10.5L28 8.313ZM28 40.906l5.906-3.5H45.5L28 47.687l-17.5-10.28h11.594l5.906 3.5Z'
    />
    <rect
      width={55}
      height={55}
      x={0.5}
      y={0.5}
      stroke='currentColor'
      rx={27.5}
    />
  </Svg>
)
