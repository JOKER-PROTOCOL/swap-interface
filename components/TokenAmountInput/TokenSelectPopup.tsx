import React, { useState } from 'react'
import { useDebounce } from 'ahooks'
import { Input } from 'components/Base/Input'
import { Modal } from 'components/Base/Modal'

import RecentTokenList from './RecentTokenList'
import TokenList from './TokenList'

import { useTokensByQuery } from 'hooks/useTokenList'
import { IToken } from 'types/token'

export interface PopupProps {
  show: boolean
  setShow: (show: boolean) => void
  token: IToken
  tokenList: Array<IToken>
  onChange?: (token: IToken) => void
}

const TokenSelectPopup = ({
  show,
  setShow,
  tokenList,
  onChange,
}: PopupProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, { wait: 200 })
  const filteredSortedTokens = useTokensByQuery(debouncedQuery, tokenList)

  const handleClose = () => {
    setSearchQuery('')
    setShow(false)
  }

  const handleSelectToken = (token: IToken) => {
    onChange && onChange(token)
    handleClose()
  }

  const handleSelectRecentToken = (token: string) => {
    setSearchQuery(token)
  }

  return (
    <Modal title='Select a token' showClose show={show} onClose={handleClose}>
      <div className='md:min-w-[400px]'>
        <Input
          placeholder='search name or paste address'
          className='mb-4 rounded-lg'
          onChange={setSearchQuery}
          value={searchQuery}
        />
        <RecentTokenList
          className='mt-4'
          tokens={tokenList}
          onSelectToken={handleSelectRecentToken}
        />
        <TokenList
          tokens={filteredSortedTokens}
          onSelectToken={handleSelectToken}
        />
      </div>
    </Modal>
  )
}

export default TokenSelectPopup
