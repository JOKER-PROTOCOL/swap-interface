import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

// colorful
export const TwitterC = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 74 74' {...props}>
    <rect width={73.799} height={73.799} fill='url(#a)' rx={24} />
    <g filter='url(#b)'>
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M54.106 19h-6.21L37.663 30.503 28.815 19H16l15.312 19.69L16.8 55h6.214l11.2-12.585L44.002 55H56.5L40.539 34.25 54.106 19Zm-4.948 32.344h-3.442L23.252 22.463h3.693l22.213 28.881Z'
        clipRule='evenodd'
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
        <feBlend in2='shape' result='effect1_innerShadow_235_4284' />
      </filter>
    </defs>
  </Svg>
)
