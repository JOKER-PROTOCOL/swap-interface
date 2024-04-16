import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

export interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  checked: boolean
  onChange?: (checked: boolean, e: any) => void
}

export const Switch = ({
  children,
  checked,
  onChange,
  ...otherProps
}: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const handleClick = (e: any) => {
    setIsChecked(!isChecked)
    onChange && onChange(!isChecked, e)
  }

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  return (
    <div className='flex items-center'>
      <button
        className={classNames(
          'relative w-[32px] h-[10px] rounded-full bg-darkGrayBlue-300',
          isChecked ? 'text-primary' : 'text-grayBlue',
        )}
        {...otherProps}
        onClick={handleClick}
      >
        <span
          className={classNames(
            'absolute top-[-3px] w-[16px] h-[16px] rounded-full inline-block',
            'transition-all duration-200 ease-in-out',
            isChecked ? 'right-0 bg-primary' : 'left-0 bg-grayBlue',
          )}
        ></span>
      </button>
    </div>
  )
}
