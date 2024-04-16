import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const VisibleF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 18.6c5.625 0 8.807-4.49 9.963-6.564a.074.074 0 0 0 .012-.036c0-.004 0-.016-.012-.037C20.807 9.89 17.625 5.4 12 5.4c-5.625 0-8.808 4.489-9.964 6.563a.075.075 0 0 0-.012.037c0 .004 0 .015.012.036C3.19 14.111 6.374 18.6 11.999 18.6Zm11.536-5.688c.32-.573.32-1.252 0-1.825C22.323 8.91 18.678 3.6 11.999 3.6 5.32 3.6 1.675 8.91.462 11.087a1.857 1.857 0 0 0 0 1.825C1.675 15.088 5.32 20.4 12 20.4c6.68 0 10.324-5.312 11.537-7.487Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 9.3a2.7 2.7 0 1 0-.001 5.4 2.7 2.7 0 0 0 0-5.4ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z'
      clipRule='evenodd'
    />
  </Svg>
)
