import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const VolumeF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 48 48' {...props}>
    <g fill='none' fillRule='evenodd'>
      <g
        stroke='currentColor'
        strokeDasharray='0,0'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
      >
        <path d='M32 29.22c0 3.744-3.582 6.78-8 6.78s-8-3.036-8-6.78v-4.44c0 3.744 3.582 6.42 8 6.42s8-2.676 8-6.42v4.44Z' />
        <path d='M31.15 21.744C29.835 23.856 27.127 25.2 24 25.2c-3.126 0-5.834-1.344-7.15-3.456A5.54 5.54 0 0 1 16 18.78c0-1.872.898-3.564 2.338-4.788C19.791 12.756 21.785 12 24 12s4.21.756 5.662 1.98c1.44 1.236 2.338 2.928 2.338 4.8a5.54 5.54 0 0 1-.85 2.964Z' />
        <path d='M32 24.78c0 3.744-3.582 6.42-8 6.42s-8-2.676-8-6.42v-6c0-3.744 3.582-6.78 8-6.78 2.215 0 4.21.756 5.662 1.98 1.44 1.236 2.338 2.928 2.338 4.8v6Z' />
      </g>
    </g>
  </Svg>
)
