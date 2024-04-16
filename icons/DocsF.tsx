import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const DocsF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='none' d='M0 0h20v20H0z' />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M17.25 1.75v16.5H5a2.243 2.243 0 0 1-1.591-.659A2.243 2.243 0 0 1 2.75 16V5.5c0-1.036.42-1.973 1.098-2.652A3.738 3.738 0 0 1 6.5 1.75h10.75Z'
      />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M17.25 13.75v4.5H5a2.243 2.243 0 0 1-1.591-.659A2.243 2.243 0 0 1 2.75 16c0-.621.252-1.184.659-1.591.407-.407.97-.659 1.591-.659h12.25Z'
      />
      <path fill='currentColor' d='M6.5 5h8v1.5h-8Zm0 3h6v1.5h-6Z' />
    </g>
  </Svg>
)
