import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TwitterF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 24 24' {...props}>
    <g fill='none' fillRule='evenodd'>
      <g fill='currentColor'>
        <use xlinkHref='#a' />
        <use xlinkHref='#a' filter='url(#b)' />
      </g>
      <path
        fill='currentColor'
        fillRule='nonzero'
        d='M14.597 6c-1.53 0-2.77 1.357-2.77 3.03 0 .237.024.468.072.69-2.302-.127-4.343-1.332-5.71-3.165a3.237 3.237 0 0 0-.375 1.522c0 1.051.49 1.98 1.233 2.522a2.573 2.573 0 0 1-1.254-.379l-.001.039c0 1.467.955 2.692 2.222 2.97a2.554 2.554 0 0 1-1.25.051c.352 1.204 1.374 2.08 2.587 2.104-.948.813-2.143 1.297-3.44 1.297-.224 0-.444-.014-.661-.042A7.362 7.362 0 0 0 9.496 18c5.094 0 7.88-4.616 7.88-8.62 0-.13-.002-.261-.008-.39a5.957 5.957 0 0 0 1.382-1.57 5.164 5.164 0 0 1-1.59.478 3.008 3.008 0 0 0 1.217-1.676c-.535.347-1.128.6-1.758.735C16.113 6.368 15.393 6 14.597 6Z'
      />
    </g>
  </Svg>
)
