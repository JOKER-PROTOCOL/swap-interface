import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { Dropdown, Label, ErrorMsg } from 'components/Base'
import { DropDownF } from 'icons'
import { Input } from '../Input'

interface SelectProps {
  value: any
  render?: (val: any) => void
  onChange: (val: any, key?: string) => void
  isRequired?: boolean
  label?: string
  placeholder?: string
  options: Array<any>
  overlayClassName?: string
  className?: string
  dropdownClassName?: string
  errMsg?: string
  withSearch?: boolean
}

export const Select = ({
  value,
  options = [],
  withSearch = false,
  errMsg = '',
  render,
  onChange,
  isRequired = false,
  label = '',
  placeholder = '',
  overlayClassName = '',
  className = '',
  dropdownClassName = 'bg-white',
}: SelectProps) => {
  const onOptionClick = (val: any, key?: string) => onChange?.(val, key)

  const [searchVal, setSearchVal] = useState('')

  const filteredOptions = useMemo(() => {
    if (!searchVal) return options
    return options.filter(item =>
      JSON.stringify(item)
        ?.toLowerCase()
        ?.includes(searchVal?.toLocaleLowerCase()),
    )
  }, [searchVal, options])

  return (
    <div className={classNames('w-full md:min-w-[250px]', className)}>
      {label && <Label text={label} isRequired={isRequired} />}

      <Dropdown
        className={classNames('w-full')}
        overlayClassName={classNames(
          'pt-1 w-full mb-4 rounded-xl',
          overlayClassName,
        )}
        overlay={
          <div className='relative bg-white'>
            {withSearch && (
              <Input
                value={searchVal}
                placeholder='search...'
                className='rounded-[8px] mx-2 mb-2 sticky top-0 mt-1'
                bg='bg-bg3'
                width='calc(100% - 16px])'
                onClick={e => e?.stopPropagation()}
                onChange={setSearchVal}
              />
            )}
            <div className='max-h-[180px] overflow-auto'>
              {filteredOptions?.map((item, index) => (
                <div
                  tabIndex={-1}
                  className='mb-1 px-2 py-1 text-sm hover:bg-bg3 cursor-pointer'
                  key={index}
                  onClick={(_, key?: string) => onOptionClick(item, key)}
                >
                  {render?.(item) || item}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div
          className={classNames(
            'flex justify-between items-center px-4 py-2 rounded-xl',
            dropdownClassName,
          )}
        >
          <div className={value ? 'text-primary' : 'text-third'}>
            {value || placeholder}
          </div>
          <DropDownF size='12' className='ml-4' />
        </div>
      </Dropdown>

      {errMsg && <ErrorMsg msg={errMsg} />}
    </div>
  )
}
