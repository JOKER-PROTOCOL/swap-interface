import classNames from 'classnames'
import React from 'react'
export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {}

export const CheckboxV2 = ({
  children,
  checked,
  onClick,
  className,
}: CheckboxProps) => {
  return (
    <div
      className={classNames(
        'w-[16px] h-[16px] ml-[3px] cursor-pointer',
        className,
      )}
    >
      <input
        type='checkbox'
        checked={checked}
        onClick={onClick}
        className={classNames(
          'appearance-none w-[12px] h-[12px] cursor-pointer ring-primary rounded-lg ring-1 ring-offset-black ring-offset-2 checked:bg-primary',
        )}
      >
        {children}
      </input>
    </div>
  )
}
