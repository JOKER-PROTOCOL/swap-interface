import classNames from 'classnames'
import React, { ReactElement, ReactNode, useState } from 'react'

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  tip: string | ReactNode
  bg?: string
  padding?: string
  color?: string
  className?: string
  trigger?: 'click' | 'hover'
  children: ReactElement
}

export const Tooltip = ({
  children,
  bg,
  tip,
  padding,
  color,
  className,
  trigger = 'hover',
  ...otherProps
}: TooltipProps) => {
  const [open, setOpen] = useState(false)

  const display = open ? 'block' : 'hidden'

  const onMouseMove = () => {
    if (trigger === 'click') return
    !open && setOpen(true)
  }

  const onMouseLeave = () => {
    if (trigger === 'click') return
    open && setOpen(false)
  }

  const onClick = () => {
    if (trigger === 'hover') return
    setOpen(!open)
  }

  const childRenProps = {
    ...children.props,
    onClick,
    onMouseMove,
    onMouseLeave,
  }

  return (
    <div
      className={classNames('relative cursor-pointer', padding)}
      {...otherProps}
    >
      {React.cloneElement(children, childRenProps)}
      <div
        className={classNames(
          display,
          'px-3 py-2 w-fit',
          color || 'text-white',
          bg || 'bg-lightGray-700',
          'absolute top-[-4px] rounded text-xs font-normal',
          'translate-y-[-100%]',
          'whitespace-nowrap cursor-auto',
          className,
        )}
      >
        {tip}
      </div>
    </div>
  )
}
