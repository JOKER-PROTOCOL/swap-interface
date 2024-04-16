import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { MergeElementProps } from 'components/utils'
import { Label, ErrorMsg } from 'components/Base'

export type InputProps = MergeElementProps<
  'input',
  {
    textAlign?: string
    bg?: string
    prefix?: string | number | ReactNode
    suffix?: string | number | ReactNode
    onChange?: (val: string) => void
    label?: string
    isRequired?: boolean
    wrapperClass?: string
    errMsg?: string
    isShowRequiredIcon?: boolean
    border?: string
  }
>

export const Input = ({
  children,
  label,
  errMsg,
  prefix,
  suffix,
  width,
  bg,
  color,
  border,
  value,
  textAlign,
  onChange,
  className,
  wrapperClass,
  isRequired,
  isShowRequiredIcon = true,
  ...otherProps
}: InputProps) => {
  // const [val, setVal] = useState()
  const handleChange = (e: any) => {
    // setIsChecked(!isChecked)
    let value = e?.target?.value
    // setVal(value)
    onChange && onChange(value)
  }

  // useEffect(() => {
  //   setVal(value)
  // }, [value])

  return (
    <div className={wrapperClass}>
      {label && (
        <Label text={label} isRequired={isRequired && isShowRequiredIcon} />
      )}

      <div
        className={classNames(
          'flex items-center rounded-2xl px-2 py-2 space-x-2',
          border || 'border-transparent focus:border-paleOrange',
          className,
          width || 'w-full',
          bg ? bg : 'bg-layerGray',
        )}
      >
        {prefix}
        <input
          value={value}
          onChange={handleChange}
          className={classNames(
            'bg-transparent outline-none px-2 w-full',
            textAlign === 'right' ? 'text-right' : 'text-left',
            'grow',
            color || 'text-grayBorder-500',
          )}
          placeholder='0.00'
          {...otherProps}
        ></input>
        {suffix}
      </div>

      {errMsg && <ErrorMsg msg={errMsg} />}
    </div>
  )
}
