import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TwitterLogoWhite = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 45 45' {...props}>
    <g filter='url(#a)'>
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M40.106 5h-6.21L23.663 16.503 14.815 5H2l15.312 19.69L2.8 41h6.214l11.2-12.585L30.003 41H42.5L26.539 20.25 40.106 5Zm-4.948 32.344h-3.442L9.252 8.463h3.693l22.213 28.881Z'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <filter
        id='a'
        width={45}
        height={45.5}
        x={0}
        y={0}
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
        <feBlend in2='shape' result='effect1_innerShadow_1313_1099' />
      </filter>
    </defs>
  </Svg>
)
