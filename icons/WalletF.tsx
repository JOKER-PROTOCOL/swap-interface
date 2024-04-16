import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const WalletF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill='currentColor' d='M10 8.5h2v2h-2z' />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M13.5 3.75c.48 0 .915.202 1.23.526.322.332.52.79.52 1.295v7.858c0 .505-.198.963-.52 1.295-.315.324-.75.526-1.23.526H.833L.75 3.75Z'
      />
      <path
        fill='currentColor'
        fillRule='nonzero'
        d='M0 1.5A1.5 1.5 0 0 1 1.5 0h9A1.5 1.5 0 0 1 12 1.5H0Z'
      />
    </g>
  </Svg>
)
