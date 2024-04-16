import React, { useState } from 'react'
import { Input, Text } from 'components/Base'
import { Modal } from 'components/Base/Modal'

import { BTN_VARIANT, Button } from 'components/Base'
import { WarningF } from 'icons'
import { getSwapSettings, setSwapSettings } from 'utils/swap'
import { AUTO_SLIPPAGE } from 'constants/ui'

export interface PopupProps {
  show: boolean
  setShow: (show: boolean) => void
  onSwapSettingsChange?: (obj: any) => void
}

export const SettingPopup = ({
  show,
  setShow,
  onSwapSettingsChange,
}: PopupProps) => {
  const [settings, setSettings] = useState(getSwapSettings())
  const [isAutoSlippage, setIsAutoSlippage] = useState(true)

  const handleClose = () => {
    setShow(false)
  }

  const setSetting = (key: string, value: string) => {
    // console.log('setSlippage', value)
    const swapSetting = getSwapSettings()
    const updateObj = { ...swapSetting, [key]: value }

    setSwapSettings(updateObj)
    setSettings(updateObj)
    onSwapSettingsChange?.(updateObj)
  }

  const handleSlippageChange = (val: string) => {
    setIsAutoSlippage(false)
    setSetting('slippage', val)
  }

  return (
    <Modal title='Setting' showClose show={show} onClose={handleClose}>
      <Text variant='normal' className='font-semibold'>
        Slippage tolerance
      </Text>
      <div className='flex mt-4 text-white'>
        <Button
          variant={isAutoSlippage ? BTN_VARIANT.dark : BTN_VARIANT.disabled}
          space='py-2.5 px-6'
          onClick={() => {
            setIsAutoSlippage(true)
            setSetting('slippage', AUTO_SLIPPAGE)
          }}
        >
          Auto
        </Button>

        <Input
          className='ml-4 text-primary rounded-lg'
          width={'w-full'}
          onChange={handleSlippageChange}
          // value={searchQuery}
          suffix={'%'}
          value={settings.slippage}
        />
      </div>
      <div className='flex mt-3 items-center'>
        <WarningF />
        <Text color='text-warning' className='ml-2'>
          Your transaction may be frontrun
        </Text>
      </div>
      <Text variant='normal' className='mt-6 font-semibold'>
        Transaction deadline
      </Text>
      <div className='flex mt-4 text-white items-baseline'>
        <Input
          placeholder='30'
          className='mb-4 rounded-lg'
          width={'w-[156px]'}
          onChange={val => setSetting('timeout', val || '30')}
          // value={searchQuery}
          value={settings.timeout}
        />
        <Text variant='normal' className='ml-3 font-semibold'>
          minutes
        </Text>
      </div>
    </Modal>
  )
}
