import React, { useState } from 'react'
import { useDebounce } from 'ahooks'
import { Input } from 'components/Base/Input'
import { Modal } from 'components/Base/Modal'
import { Button, BTN_VARIANT } from 'components/Base/Button'

import RecentTokenList from './RecentTokenList'
import TokenList from './TokenList'

import { useTokensByQuery } from 'hooks/useTokenList'
import { Token } from 'sdk/tokens'
import TokenSelectPopup from './TokenSelectPopup'
import { DropDownF } from 'icons'

export interface DropdownButtonProps {
  token: Token
  tokenList: Array<Token>
  onChange?: (token: Token) => void
  className?: string
}

const DropdownButton = (props: DropdownButtonProps) => {
  const { token, className } = props
  const [show, setShow] = useState(false)
  const { symbol } = token || {}

  const handleOpen = () => {
    setShow(true)
  }

  return (
    <div className={className}>
      <Button variant={BTN_VARIANT.secondary} onClick={handleOpen}>
        <div className='flex items-baseline'>
          {symbol || 'Select token'}
          <DropDownF className='ml-3 text-xs' />
        </div>
      </Button>
      <TokenSelectPopup {...props} show={show} setShow={setShow} />
    </div>
  )
}

export default DropdownButton
