import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LoadingLogoF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 48 48' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M23.608 2 43.5 34.511 23.945 46 4.45 34.511 23.7 2'
    />
  </Svg>
)
