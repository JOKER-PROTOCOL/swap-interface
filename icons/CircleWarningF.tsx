import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const CircleWarningF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 16 16' {...props}>
    <path
      stroke='currentColor'
      d='M.5 8C.5 3.86 3.86.5 8 .5c4.14 0 7.5 3.36 7.5 7.5 0 4.14-3.36 7.5-7.5 7.5C3.86 15.5.5 12.14.5 8Z'
    />
    <path
      fill='currentColor'
      d='m8.781 2.738-.1 7.319H7.529l-.1-7.319h1.353ZM8.105 13a.861.861 0 0 1-.632-.264.861.861 0 0 1-.263-.631c0-.245.088-.456.263-.632a.861.861 0 0 1 .632-.263c.245 0 .456.088.631.263a.861.861 0 0 1 .264.632.928.928 0 0 1-.447.776.852.852 0 0 1-.448.119Z'
    />
  </Svg>
)
