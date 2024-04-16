import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

// colorful
export const SocialMediaC = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 74 74' {...props}>
    <rect width={73.799} height={73.799} fill='url(#a)' rx={24} />
    <g filter='url(#b)'>
      <path
        fill='#fff'
        d='M39.57 36.081c0 6.116-5.04 11.081-11.285 11.081-6.244 0-11.285-4.965-11.285-11.08C17 29.965 22.04 25 28.285 25s11.286 4.966 11.286 11.081Zm12.364 0c0 5.749-2.533 10.421-5.642 10.421-3.11 0-5.643-4.672-5.643-10.42 0-5.75 2.533-10.422 5.642-10.422 3.11 0 5.643 4.648 5.643 10.421Zm5.066 0c0 5.162-.878 9.345-1.981 9.345-1.104 0-1.981-4.183-1.981-9.345 0-5.161.877-9.344 1.98-9.344 1.104 0 1.982 4.183 1.982 9.344Z'
      />
    </g>
    <defs>
      <linearGradient
        id='a'
        x1={42}
        x2={7.5}
        y1={76}
        y2={0}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.073} />
        <stop offset={0.927} stopColor='#393A3D' />
      </linearGradient>
      <filter
        id='b'
        width={45}
        height={45.5}
        x={14}
        y={14}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={0.5} />
        <feGaussianBlur stdDeviation={1.25} />
        <feComposite in2='hardAlpha' k2={-1} k3={1} operator='arithmetic' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
        <feBlend in2='shape' result='effect1_innerShadow_235_4295' />
      </filter>
    </defs>
  </Svg>
)
