import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TipsF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <g fill='none' fillRule='nonzero'>
      <path
        fill='currentColor'
        d='M8 12.8a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Zm0-9.6a3.2 3.2 0 0 0-3.2 3.2h1.6c0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6 0 1.6-2.4 1.4-2.4 4h1.6c0-1.8 2.4-2 2.4-4A3.2 3.2 0 0 0 8 3.2Z'
      />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M8 .75c2.001 0 3.813.812 5.126 2.124A7.227 7.227 0 0 1 15.25 8a7.227 7.227 0 0 1-2.124 5.126A7.227 7.227 0 0 1 8 15.25a7.227 7.227 0 0 1-5.126-2.124A7.227 7.227 0 0 1 .75 8c0-2.001.812-3.813 2.124-5.126A7.227 7.227 0 0 1 8 .75Z'
      />
    </g>
  </Svg>
)
