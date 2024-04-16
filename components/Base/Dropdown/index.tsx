import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'

export const Dropdown = ({
  children,
  overlay,
  className = '',
  overlayClassName = '',
}) => {
  const [show, setShow] = useState(false)

  //   const onMouseOver = () => {
  //     setShow(true)
  //   }

  //   const onMouseOut = () => {
  //     setShow(false)
  //   }

  const onClick = () => {
    setShow(!show)
  }

  const closeOverlay = () => {
    setShow(false)
  }

  return (
    <div className={className}>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              as='div'
              // className={`
              // ${open ? 'text-white' : 'text-white/90'}
              // group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              {children}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel
                className={classNames(
                  'absolute z-10 w-fit mt-2 max-w-sm transform px-4 sm:px-0 lg:max-w-3xl',
                  overlayClassName,
                )}
              >
                {({ close }) => (
                  <div
                    onClick={() => close()}
                    className='overflow-hidden rounded-lg shadow-lg border-line bg-white'
                  >
                    {overlay}
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
  // return (
  //   <div className={classNames('relative inline-block text-left', className)}>
  //     <div onClick={onClick} className='w-full cursor-pointer'>
  //       {children}
  //     </div>
  //     <div
  //       className={classNames(
  //         'absolute left-0 z-10 mt-2 origin-top-right rounded-b-md bg-white focus:outline-none min-w-full',
  //         show ? 'block' : 'hidden',
  //         overlayClassName || 'w-56 border-line border-t-1',
  //       )}
  //       role='menu'
  //       aria-orientation='vertical'
  //       aria-labelledby='menu-button'
  //       tabIndex={-1}
  //       onClick={closeOverlay}
  //     >
  //       <div className='py-1 shadow rounded-xl' role='none'>
  //         {overlay}
  //       </div>
  //     </div>
  //   </div>
  // )
}
