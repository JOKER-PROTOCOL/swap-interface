import classNames from 'classnames'

export interface TextProps extends React.ComponentPropsWithRef<'div'> {
  variant?: string
}

// TODO: maybe can use plugin to simplify below?
// https://tailwindcss.com/docs/plugins#adding-base-styles

const TEXT_DEFAULT = {
  color: 'text-primary',
}

export const Text = ({
  children,
  className,
  variant = 'normal',
  color,
  ...otherProps
}: TextProps) => {
  // font-size: 32px, line-height: 32px, weight: 700
  if (variant === 'h1') {
    return (
      <h1
        className={classNames(
          'font-bold',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </h1>
    )
  }

  // font-size: 24px, line-height: 32px
  if (variant === 'h2') {
    return (
      <h2
        className={classNames(
          'text-2xl',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </h2>
    )
  }

  // font-size: 20px, line-height: 28px
  if (variant === 'h3') {
    return (
      <h3
        className={classNames(
          'text-lg sm:text-xl',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </h3>
    )
  }
  // font-size: 18px, line-height: 28px
  if (variant === 'h4') {
    return (
      <h4
        className={classNames(
          'text-lg',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </h4>
    )
  }

  // font-size: 16px, line-height: 24px
  if (variant === 'normal') {
    return (
      <div
        className={classNames(
          'text-base',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </div>
    )
  }

  // font-size: 16px, line-height: 20px, font-weight: bolder
  if (variant === 'subTitle1') {
    return (
      <h4
        className={classNames(
          'text-base/5',
          color || 'text-secondary',
          className,
        )}
        {...otherProps}
      >
        {children}
      </h4>
    )
  }

  // font-size: 14px, font-weight: bolder
  if (variant === 'subTitle2') {
    return (
      <h5
        className={classNames(
          'text-sm',
          color || TEXT_DEFAULT.color,
          className,
        )}
        {...otherProps}
      >
        {children}
      </h5>
    )
  }

  // font-size: 12px, line-height: 16px
  if (variant === 'subTitle3') {
    return (
      <h5
        className={classNames(
          'text-xs',
          color || 'text-lightGray-500',
          className,
        )}
        {...otherProps}
      >
        {children}
      </h5>
    )
  }

  return (
    <span className={className} {...otherProps}>
      {children}
    </span>
  )
}
