import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LogoutF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M9.25 11V2h1.5v9h-1.5Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M5.58 5.58a6.25 6.25 0 1 0 8.84 0l1.06-1.06a7.75 7.75 0 1 1-10.96 0l1.06 1.06Z'
      clipRule='evenodd'
    />
  </Svg>
)
