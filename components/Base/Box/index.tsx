import classNames from 'classnames'

export enum BORDER_RADIUS {
  'xl',
  '2xl',
  '3xl',
  '3lg',
}

export interface BoxProps extends React.ComponentPropsWithoutRef<'div'> {
  bg?: string
  borderRadius?: BORDER_RADIUS
  padding?: string
  border?: string
}

const BorderRadiusMap = {
  [BORDER_RADIUS['xl']]: 'rounded-xl',
  [BORDER_RADIUS['2xl']]: 'rounded-2xl',
  [BORDER_RADIUS['3xl']]: 'rounded-3xl',
  [BORDER_RADIUS['3lg']]: 'rounded-3lg',
}

export const Box = ({
  children,
  bg,
  color,
  padding,
  borderRadius = BORDER_RADIUS['2xl'],
  border,
  className,
  ...otherProps
}: BoxProps) => {
  return (
    <div
      className={classNames(
        padding || 'px-6 py-4',
        BorderRadiusMap[borderRadius],
        bg || 'bg-white',
        color || 'text-primary',
        border || 'border border-grayBorder-800',
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}
