import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const ExpandF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='m9 0-.001 7H16v2H8.999L9 16H7l-.001-7H0V7h6.999L7 0h2Z'
    />
  </Svg>
)
