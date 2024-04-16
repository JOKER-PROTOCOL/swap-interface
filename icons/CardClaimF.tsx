import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CardClaimF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <path fill='currentColor' fillOpacity={0.4} d='M19.2 20H24v3.2h-4.8V20Z' />
    <path
      fill='currentColor'
      // fillOpacity={0.4}
      fillRule='evenodd'
      d='M1.6 22.4A6.4 6.4 0 0 0 8 28.8h16a6.4 6.4 0 0 0 6.4-6.4V9.6A6.4 6.4 0 0 0 24 3.2H8a6.4 6.4 0 0 0-6.4 6.4v12.8ZM8 5.6h16a4 4 0 0 1 4 4v1.6H4V9.6a4 4 0 0 1 4-4Zm-4 8h24v8.8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-8.8Z'
      clipRule='evenodd'
    />
  </Svg>
)
