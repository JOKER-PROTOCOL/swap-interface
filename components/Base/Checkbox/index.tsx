import classNames from 'classnames'
import React from 'react'
export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {}

export const Checkbox = ({
  children,
  value,
  onChange,
  className,
}: CheckboxProps) => {
  return (
    <div
      className={classNames(
        'w-[16px] h-[16px] ml-[3px] cursor-pointer',
        className,
      )}
      // @ts-ignore
      onClick={onChange}
    >
      <input
        type='radio'
        checked={Boolean(value)}
        onChange={onChange}
        className={classNames(
          'appearance-none w-[12px] h-[12px] cursor-pointer ring-primary rounded-lg ring-1 ring-offset-black ring-offset-2 checked:bg-paleOrange focus:bg-paleOrange',
        )}
      >
        {children}
      </input>
    </div>
  )
}
