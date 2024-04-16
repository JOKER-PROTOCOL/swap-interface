import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const InfoF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <path
      fill='currentColor'
      fillRule='nonzero'
      d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 5.75a.75.75 0 0 1 .75.75v4a.75.75 0 1 1-1.5 0V8A.75.75 0 0 1 8 7.25ZM8 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z'
    />
  </Svg>
)
