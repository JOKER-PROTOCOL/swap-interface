import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TwitterNewLogoF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <rect width={32} height={32} fill='#191C26' rx={8} />
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M23.936 8h-2.76l-4.548 5.113L12.695 8H7l6.805 8.75L7.355 24h2.762l4.978-5.593L19.445 24H25l-7.094-9.223L23.936 8Zm-2.2 14.375h-1.529L10.223 9.54h1.641l9.873 12.836Z'
      clipRule='evenodd'
    />
  </Svg>
)
