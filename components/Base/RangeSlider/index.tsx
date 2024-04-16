import classNames from 'classnames'
import React from 'react'
export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {}

export const RangeSlider = ({
  children,
  value = 0,
  onChange,
  className,
}: CheckboxProps) => {
  value = +value > 100 ? 100 : value
  const width = `w-${value}/100`
  const handleChange = e => {
    if (e && e?.target?.value) {
      onChange && onChange(e?.target?.value)
    }
  }
  return (
    <div className={classNames('relative leading-none', className)}>
      <input
        type='range'
        min='0'
        max='100'
        value={value}
        defaultValue={value}
        onChange={handleChange}
        className={classNames(
          'appearance-none',
          'w-full cursor-pointer bg-grayBorder-500 h-0.5 accent-primary hover:accent-primary',
        )}
      >
        {children}
      </input>
      <div
        className={classNames('h-0.5 bg-primary absolute bottom-0.5')}
        style={{
          width: `${value}%`,
        }}
      ></div>
    </div>
  )
}

// export const RangeSlider = ({ children, value = 0, onChange, className }: CheckboxProps) => {
//   const width = `w-${value}/100`
//   return (
//     <div className="relative mt-1.25 h-[7px]">
//       <div className="flex mx-auto" style={{ width: 'calc(100% - 16px)' }}>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           defaultValue={value}
//           onChange={onChange}
//           className={classNames(
//             'appearance-none',
//             'w-full cursor-pointer bg-grayBorder-500 h-0.5 accent-strongRed',
//             className
//           )}
//         >
//           {children}
//         </input>
//       </div>
//       <div className={classNames('h-0.5 bg-grayBorder-500 absolute top-0 w-full ')}></div>
//       <div
//         className={classNames('h-0.5 bg-paleOrange absolute top-0')}
//         style={{
//           width: `${value}%`,
//         }}
//       ></div>
//       <div className="flex mx-auto relative" style={{ width: 'calc(100% - 16px)', top: '-7px' }}>
//         <div
//           className={classNames('w-4 h-3 bg-paleOrange absolute -bottom-0.75 cursor-pointer')}
//           style={{
//             left: `calc(${value}% - 8px)`,
//           }}
//         ></div>
//       </div>
//     </div>
//   )
// }
