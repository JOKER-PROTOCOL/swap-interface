import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LoadingCircleF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 120 120' {...props}>
    <path
      fill='url(#a)'
      d='M60 2.1c0-1.16-.94-2.104-2.1-2.063A60 60 0 1 0 119.963 62.1c.041-1.16-.903-2.1-2.063-2.1-1.16 0-2.096.94-2.14 2.1a55.792 55.792 0 0 1-34.406 49.452 55.795 55.795 0 0 1-60.81-12.095A55.8 55.8 0 0 1 57.9 4.24c1.16-.044 2.1-.98 2.1-2.14Z'
    />
    <path
      fill='url(#a)'
      d='M60 2.1c0-1.16-.94-2.104-2.1-2.063A60 60 0 1 0 119.963 62.1c.041-1.16-.903-2.1-2.063-2.1-1.16 0-2.096.94-2.14 2.1a55.792 55.792 0 0 1-34.406 49.452 55.795 55.795 0 0 1-60.81-12.095A55.8 55.8 0 0 1 57.9 4.24c1.16-.044 2.1-.98 2.1-2.14Z'
    />
    <defs>
      <linearGradient
        id='a'
        x1={60}
        x2={120}
        y1={0}
        y2={0}
        gradientUnits='userSpaceOnUse'
      >
        <stop />
        <stop offset={1} stopOpacity={0} />
      </linearGradient>
    </defs>
  </Svg>
)
