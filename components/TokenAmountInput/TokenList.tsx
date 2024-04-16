import { Address } from 'wagmi'
import BigNumber from 'bignumber.js'

import { Box } from 'components/Base/Box'
import { Text } from 'components/Base/Text'
import { IToken } from 'types/token'
import { useTokenBalanceV2 } from 'hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { DEFAULT_DISPLAY_DECIMAL } from 'constants/ui'
import { TokenLogo } from 'components/Base/TokenLogo'

const Token = ({
  token,
  onSelectToken,
}: {
  token: IToken
  onSelectToken: (symbol: IToken) => void
}) => {
  const { symbol, name, logoURI = '', address } = token || {}
  const { balance } = useTokenBalanceV2(token)

  // console.log('balance', balance)
  const formatBalance = getFullDisplayBalance(
    balance,
    token?.decimals,
    DEFAULT_DISPLAY_DECIMAL,
  )

  return (
    <Box
      className='flex justify-between group hover:bg-black cursor-pointer'
      bg='bg-transparent'
      padding='px-3 py-3'
      border='border-0'
      onClick={() => {
        onSelectToken(token)
      }}
    >
      <TokenLogo size={40} token={token} />
      <div className='flex-1 ml-3'>
        <div className='flex justify-between'>
          <Text
            variant='subTitle1'
            color='text-primary'
            className='group-hover:text-third'
          >
            {symbol}
          </Text>
          <Text
            variant='subTitle1'
            color='text-primary'
            className='group-hover:text-third'
          >
            {formatBalance}
          </Text>
        </div>
        <div className='flex justify-between'>
          <Text className='text-xs' color='text-spunPearl'>
            {name}
          </Text>
          {/* <Text
            className='text-xs group-hover:text-lightRed'
            color='text-transparent'
          >
            ~{formatBalance}
          </Text> */}
        </div>
      </div>
    </Box>
  )
}

const TokenList = ({
  tokens,
  onSelectToken,
}: {
  tokens: Array<IToken>
  onSelectToken: (symbol: IToken) => void
}) => {
  if (!tokens || !tokens.length) return null
  return (
    <Box
      bg='bg-layerGray'
      className='min-h-[300px] max-h-[509px] overflow-scroll mt-5'
      padding='px-2 py-3'
      border='border-0'
    >
      {tokens.map((token, idx) => (
        <Token token={token} key={idx} onSelectToken={onSelectToken} />
      ))}
    </Box>
  )
}

export default TokenList
