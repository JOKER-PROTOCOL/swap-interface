import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LogoPurpleF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 512 512' {...props}>
    <path
      fill='url(#a)'
      d='m256 76 160 265.999-.003.001H309.996L256 252.999l-54 89 .002.001h-106L256 76Z'
    />
    <path
      fill='url(#b)'
      d='m256 373.997 54-31.999h106l-159.999 93.997L96 341.998h106l54 31.999Z'
    />
    <defs>
      <linearGradient
        id='a'
        x1={276.212}
        x2={183.314}
        y1={75.447}
        y2={348.144}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#9D6CFF' />
        <stop offset={1} stopColor='#4130D9' />
      </linearGradient>
      <linearGradient
        id='b'
        x1={512}
        x2={478.23}
        y1={560.498}
        y2={285.591}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#4130D9' />
        <stop offset={1} stopColor='#9D6CFF' />
      </linearGradient>
    </defs>
  </Svg>
)
