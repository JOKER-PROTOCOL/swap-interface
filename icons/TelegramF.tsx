import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const TelegramF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 24 24' {...props}>
    <g fill='none' fillRule='evenodd'>
      <g fill='#000'>
        <use xlinkHref='#a' />
        <use xlinkHref='#a' filter='url(#b)' />
      </g>
      <path
        fill='currentColor'
        d='M5.428 11.593c3.624-1.588 6.04-2.634 7.25-3.14 3.452-1.444 4.169-1.695 4.637-1.703.102-.002.332.024.481.145.126.103.16.242.177.339.017.097.037.319.021.492-.187 1.977-.997 6.773-1.408 8.987-.175.937-.518 1.25-.85 1.281-.722.067-1.27-.48-1.97-.94-1.093-.721-1.711-1.17-2.773-1.874-1.228-.813-.432-1.26.267-1.99.183-.192 3.364-3.101 3.426-3.365.007-.033.015-.156-.058-.221-.073-.065-.18-.043-.258-.025-.11.025-1.857 1.187-5.243 3.485-.496.342-.945.51-1.348.5-.444-.009-1.298-.252-1.932-.46-.779-.254-1.398-.388-1.344-.82.028-.225.337-.456.925-.69Z'
      />
    </g>
  </Svg>
)
