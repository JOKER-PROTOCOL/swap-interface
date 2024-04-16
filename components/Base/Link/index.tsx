import classNames from 'classnames'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {}

export const PrimaryLink = ({
  children,
  className,
  ...otherProps
}: LinkProps) => {
  return (
    <a
      className={classNames(
        'py-3 px-4 text-white hover:cursor-pointer',
        className,
      )}
      {...otherProps}
    >
      {children}
    </a>
  )
}
export const DarkLink = ({ children, className, ...otherProps }: LinkProps) => {
  return (
    <a
      className={classNames(
        'py-3 px-4 text-black hover:cursor-pointer',
        className,
      )}
      {...otherProps}
    >
      {children}
    </a>
  )
}

// paleOrange
export const OrangeLink = ({
  children,
  className,
  ...otherProps
}: LinkProps) => {
  return (
    <a
      className={classNames('text-paleOrange hover:cursor-pointer', className)}
      {...otherProps}
    >
      {children}
    </a>
  )
}

// new design
export const DarkLinkV2 = ({
  children,
  className,
  ...otherProps
}: LinkProps) => {
  return (
    <a
      className={classNames('mx-1 text-black hover:cursor-pointer', className)}
      {...otherProps}
    >
      {children}
    </a>
  )
}
