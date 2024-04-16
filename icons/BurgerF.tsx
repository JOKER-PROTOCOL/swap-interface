import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const BurgerF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M17 5.5H3V4h14v1.5ZM17 10.75H3v-1.5h14v1.5ZM17 16H3v-1.5h14V16Z'
      clipRule='evenodd'
    />
  </Svg>
)
