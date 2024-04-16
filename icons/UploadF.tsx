import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const UploadF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 32 32' {...props}>
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M16 3.75C9.235 3.75 3.75 9.235 3.75 16S9.235 28.25 16 28.25 28.25 22.765 28.25 16 22.765 3.75 16 3.75Zm0 2C10.34 5.75 5.75 10.34 5.75 16S10.34 26.25 16 26.25 26.25 21.66 26.25 16 21.66 5.75 16 5.75ZM17 8v7h7v2h-7v7h-2v-7H8v-2h7V8h2Z'
      clipRule='evenodd'
    />
  </Svg>
)
