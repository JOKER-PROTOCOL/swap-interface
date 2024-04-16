import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CopyV2F = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 21' {...props}>
    <path fill='currentColor' d='M5 6h7v1.5H5V6ZM5 9h5v1.5H5V9Z' />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M1.75 1.25h13.5v12.5a3 3 0 0 1-3 3H1.75V1.25Zm1.5 1.5v12.5h8.5a2 2 0 0 0 2-2V2.75H3.25Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12.75 18.25a4 4 0 0 0 4-4V5h1.5v9.75a5 5 0 0 1-5 5H5.5v-1.5h7.25Z'
      clipRule='evenodd'
    />
  </Svg>
)
