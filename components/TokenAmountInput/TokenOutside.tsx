import { memo, useState } from 'react'
import classNames from 'classnames'
import { Text } from 'components/Base/Text'
import { DropDownF } from 'icons'
import TokenSelectPopup from './TokenSelectPopup'
import { TokenLogo } from 'components/Base/TokenLogo'

const TokenOutside = props => {
  const { token, showTokenList } = props
  const [show, setShow] = useState(false)
  const { logoURI = '', symbol } = token || {}

  const handleOpen = () => {
    setShow(true)
  }

  return (
    <div>
      <div
        className={classNames('flex space-x-1 items-center', {
          'cursor-pointer': showTokenList,
        })}
        onClick={handleOpen}
      >
        <TokenLogo token={token} className='mr-1' size={28} />
        <Text variant='normal' className='text-primary font-semibold'>
          {symbol}
        </Text>
        {showTokenList && <DropDownF size='10px' color='text-secondary' />}
      </div>
      <TokenSelectPopup {...props} show={show} setShow={setShow} />
    </div>
  )
}

export default memo(TokenOutside)
