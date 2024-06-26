import * as React from 'react'
import { Svg, SvgProps } from 'components/Base/Svg'

export const LaunchpadF = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 20 20' {...props}>
    <g fillRule='evenodd'>
      <path d='M0 0h20v20H0z' />
      <path
        stroke='currentColor'
        strokeWidth={1.5}
        d='M9.15 2.473c1.004 1.033 1.593 2.01 1.908 2.904.62 1.763.152 3.168-.097 3.944-.175.548-.203.913-.152 1.095.04.141.178.351.44.612 1.758-.387 2.817-1.116 3.825-2.286 1.174 1.705 1.376 3.505 1.007 5.082a6.826 6.826 0 0 1-1.52 2.947c-.683.768-1.493 1.31-2.28 1.444-.813.138-1.513-.162-2.117-.845-.745-.843-1.346-2.2-1.841-4.05L7.42 9.953l-.563 3.44c-.258 1.579-.424 2.878-.498 3.898a7.429 7.429 0 0 1-.733-.764 8.434 8.434 0 0 1-1.528-2.652c-.479-1.382-.563-2.948.373-4.283.641-.914 1.252-1.734 1.808-2.481C7.66 5.26 8.69 3.807 9.15 2.473Z'
      />
    </g>
  </Svg>
)
