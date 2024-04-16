import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CardF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <path fill='currentColor' d='M12 12.5h3v2h-3v-2Z' />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M1 14a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v8ZM5 3.5h10A2.5 2.5 0 0 1 17.5 6v1h-15V6A2.5 2.5 0 0 1 5 3.5Zm-2.5 5h15V14a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 14V8.5Z'
      clipRule='evenodd'
    />
  </Svg>
)
