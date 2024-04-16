import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const SearchF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M5.197 5.197a7.498 7.498 0 0 0 0 10.606 7.498 7.498 0 0 0 10.606 0 7.498 7.498 0 0 0 0-10.606 7.498 7.498 0 0 0-10.606 0ZM21.5 24l-4.772-5.155c-4.106 3.07-9.928 2.78-13.658-.952-4.093-4.092-4.093-10.729 0-14.823 4.093-4.093 10.73-4.093 14.823 0 3.731 3.73 4.022 9.552.952 13.658L24 21.5V24h-2.5Z'
    />
  </Svg>
)
