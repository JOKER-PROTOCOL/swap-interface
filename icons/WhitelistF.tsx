import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const WhitelistF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 48 48' {...props}>
    <g fill='none' fillRule='evenodd'>
      <g
        fillRule='nonzero'
        stroke='currentColor'
        strokeDasharray='0,0'
        strokeWidth={1.6}
      >
        <path d='m28 33 2 2 4-4' />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M23.814 22A4.983 4.983 0 0 1 19 17.006 4.992 4.992 0 0 1 23.994 12 5.009 5.009 0 0 1 29 17.006 4.99 4.99 0 0 1 24.186 22a2.05 2.05 0 0 0-.372 0Z'
        />
        <path d='M23.235 36c-2.463 0-4.912-.48-6.78-1.44-3.274-1.689-3.274-4.442 0-6.12 3.722-1.92 9.824-1.92 13.545 0' />
      </g>
    </g>
  </Svg>
)
