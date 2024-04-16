import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const WarningF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <g fill='none' fillRule='nonzero'>
      <path fill='none' d='M0 0h16v16H0z' />
      <path
        fill='#FA8C16'
        d='M7.046 1.543.145 13.387a1.067 1.067 0 0 0 .41 1.47c.165.094.353.143.545.143h13.8c.608 0 1.1-.483 1.1-1.078 0-.188-.05-.372-.145-.535l-6.9-11.844a1.111 1.111 0 0 0-1.91 0Z'
      />
      <path
        fill='#FFF'
        d='M7.04 5.993 7.17 9.2A.834.834 0 0 0 8.836 9.2l.12-3.207A.956.956 0 0 0 7.996 5a.96.96 0 0 0-.956.993Zm-.04 6V12a.998.998 0 0 0 1.003 1A.998.998 0 0 0 9 12v-.007A1.002 1.002 0 0 0 7.997 11a.995.995 0 0 0-.997.993Z'
      />
    </g>
  </Svg>
)
