import classNames from 'classnames'
import { Button, BTN_VARIANT } from 'components/Base/Button'

interface TabListProps extends React.ComponentPropsWithoutRef<'div'> {
  // onChange?: (id: string) => void
  activeTab?: string
}

export const TabList = ({
  children,
  onChange,
  className,
  ...otherProps
}: TabListProps) => {
  const handleClick = () => {}

  return (
    <div
      className={classNames('bg-bg3 rounded-lg', className)}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </div>
  )
}

interface TabProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean
  space?: string
}

export const Tab = ({
  active,
  space,
  children,
  className,
  disabled,
  ...otherProps
}: TabProps) => {
  if (active) {
    return (
      <Button
        variant={BTN_VARIANT.dark}
        space={space || 'px-6 py-2.5'}
        className={classNames('', className)}
        {...otherProps}
      >
        {children}
      </Button>
    )
  }
  if (disabled) {
    return (
      <Button
        variant={BTN_VARIANT.transparent}
        color='text-lightGray-500'
        space={space || 'px-6 py-2.5'}
        className={classNames('cursor-not-allowed', className)}
        {...otherProps}
        onClick={() => {}}
        disabled
      >
        {children}
      </Button>
    )
  }
  return (
    <Button
      variant={BTN_VARIANT.secondary}
      color='text-lightGray-500'
      space={space || 'px-6 py-2.5'}
      className={classNames('', className)}
      {...otherProps}
    >
      {children}
    </Button>
  )
}
