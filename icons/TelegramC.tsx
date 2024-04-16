import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TelegramC = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 74 74' {...props}>
    <rect width={73.799} height={73.799} fill='url(#a)' rx={24} />
    <g filter='url(#b)'>
      <path
        fill='#fff'
        d='M18.452 34.565S36.143 26.72 42.28 23.957c2.352-1.105 10.328-4.642 10.328-4.642s3.682-1.547 3.375 2.21c-.102 1.548-.92 6.962-1.739 12.82-1.227 8.287-2.556 17.349-2.556 17.349s-.205 2.541-1.943 2.983c-1.738.442-4.602-1.547-5.113-1.989-.41-.331-7.67-5.304-10.328-7.735-.716-.663-1.534-1.99.102-3.536 3.681-3.647 8.078-8.178 10.737-11.05 1.227-1.327 2.454-4.421-2.659-.664-7.26 5.415-14.418 10.498-14.418 10.498s-1.636 1.105-4.704.11c-3.068-.994-6.647-2.32-6.647-2.32s-2.454-1.658 1.738-3.426Z'
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
        x={13}
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
        <feBlend in2='shape' result='effect1_innerShadow_235_4306' />
      </filter>
    </defs>
  </Svg>
)
