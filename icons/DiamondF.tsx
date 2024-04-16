import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const DiamondF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 30 30' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M0 14.594A19.529 19.529 0 0 0 14.593 0a19.529 19.529 0 0 0 14.593 14.593 19.529 19.529 0 0 0-14.593 14.593A19.528 19.528 0 0 0 0 14.594Z'
      clipRule='evenodd'
    />
  </Svg>
)
