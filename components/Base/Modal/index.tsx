import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Text } from 'components/Base/Text'
import { BTN_VARIANT, Button } from '../Button'
import { CloseF } from 'icons'

export interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  show: boolean
  title?: string
  showClose?: boolean
  onClose?: () => void
}

export const Modal = ({
  title,
  show,
  showClose = true,
  onClose,
  children,
  ...otherProps
}: ModalProps) => {
  const [isShow, setIsShow] = useState(false)

  const handleClose = () => {
    setIsShow(false)
    onClose && onClose()
  }

  useEffect(() => {
    setIsShow(show)
  }, [show])

  return (
    <Transition appear show={isShow} as={Fragment}>
      <div>
        <Dialog className='relative z-10' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-fit min-w-[300px] max-w-full md:max-w-[600px] transform bg-white rounded-2xl px-6 py-5 text-left align-middle shadow-xl transition-all'>
                  {title && (
                    <Dialog.Title className='flex justify-between items-center text-lg font-medium leading-6 mb-6'>
                      <Text variant='h3'>{title}</Text>
                      {showClose && (
                        <CloseF
                          color='text-primary'
                          className='cursor-pointer'
                          onClick={handleClose}
                        />
                      )}
                    </Dialog.Title>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        {isShow && (
          <div
            className='mask z-[2] fixed top-0 left-0 right-0 bottom-0'
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        )}
      </div>
    </Transition>
  )
}
