import classNames from 'classnames'

export interface SvgProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: string
  color?: string
  viewBox?: string
  className?: string
}

const defaultSize = '1em'

export const Svg = ({ size, color, className, ...otherProps }: SvgProps) => {
  return (
    <svg
      width={size || defaultSize}
      height={size || defaultSize}
      xmlns='http://www.w3.org/2000/svg'
      className={classNames(color, className)}
      {...otherProps}
    />
  )
}
