import { memo } from 'react'
import classNames from 'classnames'
import { Text } from 'components/Base/Text'
import { Box, BORDER_RADIUS } from 'components/Base'

import { IToken } from 'types/token'
import { TokenLogo } from 'components/Base/TokenLogo'

export interface RecentTokenListProps {
  tokens: Array<IToken>
  className: string
  onSelectToken: (symbol: string) => void
}

const PureToken = ({
  token,
  onSelectToken,
}: {
  token: IToken
  onSelectToken: (symbol: string) => void
}) => {
  const { symbol } = token || {}
  return (
    <Box
      borderRadius={BORDER_RADIUS.xl}
      padding='py-2 pl-2 pr-3'
      bg='bg-layerGray'
      className='flex space-x-2 cursor-pointer shrink-0'
      onClick={() => onSelectToken(symbol)}
    >
      <TokenLogo token={token} size={20} />
      <Text variant='subTitle2' className='text-primary'>
        {symbol}
      </Text>
    </Box>
  )
}

const RecentTokenList = ({
  tokens,
  onSelectToken,
  className,
}: RecentTokenListProps) => {
  if (!tokens || !tokens.length) {
    return null
  }

  return (
    <div className={classNames('flex space-x-3 overflow-auto', className)}>
      {tokens.map((token, idx) => (
        <PureToken key={idx} token={token} onSelectToken={onSelectToken} />
      ))}
    </div>
  )
}

export default memo(RecentTokenList)
