import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const DiscordC = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 74 74' {...props}>
    <rect width={73.799} height={73.799} fill='url(#a)' rx={24} />
    <g filter='url(#b)'>
      <path
        fill='#fff'
        d='M50.218 24.463c4.291 6.354 6.41 13.522 5.618 21.774a.124.124 0 0 1-.05.088c-3.25 2.403-6.398 3.862-9.503 4.829a.12.12 0 0 1-.133-.046 25.584 25.584 0 0 1-1.94-3.177.123.123 0 0 1 .064-.17 19.356 19.356 0 0 0 2.966-1.42.123.123 0 0 0 .01-.204c-.2-.15-.4-.308-.59-.466a.115.115 0 0 0-.124-.015c-6.146 2.858-12.878 2.858-19.097 0a.118.118 0 0 0-.123.016c-.19.158-.39.315-.588.465a.123.123 0 0 0 .011.203c.947.547 1.931 1.028 2.965 1.423a.121.121 0 0 1 .065.168 22.742 22.742 0 0 1-1.94 3.179.123.123 0 0 1-.134.044c-3.09-.967-6.239-2.426-9.489-4.83a.13.13 0 0 1-.049-.089c-.662-7.137.687-14.364 5.614-21.774a.111.111 0 0 1 .05-.044 31.105 31.105 0 0 1 7.735-2.415.122.122 0 0 1 .125.06c.335.597.719 1.364.978 1.99 2.86-.44 5.766-.44 8.687 0 .26-.613.63-1.393.963-1.99a.118.118 0 0 1 .125-.06 31.18 31.18 0 0 1 7.734 2.415c.022.01.04.025.05.046Zm-16.105 13.57c.03-2.11-1.497-3.855-3.415-3.855-1.902 0-3.415 1.73-3.415 3.856 0 2.125 1.543 3.855 3.415 3.855 1.902 0 3.415-1.73 3.415-3.855Zm12.627 0c.03-2.11-1.498-3.855-3.415-3.855-1.903 0-3.415 1.73-3.415 3.856 0 2.125 1.543 3.855 3.415 3.855 1.917 0 3.415-1.73 3.415-3.855Z'
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
        width={40}
        height={40.5}
        x={17}
        y={17}
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
        <feBlend in2='shape' result='effect1_innerShadow_235_4317' />
      </filter>
    </defs>
  </Svg>
)
