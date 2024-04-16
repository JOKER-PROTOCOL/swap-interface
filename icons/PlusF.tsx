import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const PlusF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11.5 9V2h-2v7h-7v2h7v7h2v-7h7V9h-7Z'
      clipRule='evenodd'
    />
  </Svg>
)
