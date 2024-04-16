import { utils } from 'web3'
import { Text } from 'components/Base/Text'
import { Box } from 'components/Base/Box'
import { ZKLabel } from 'components/Base/ZKLabel'
import { ArrowRightF } from 'icons'

// import {
//   getFullDisplayBalance,
//   getBalanceAmount,
//   getDecimalAmount,
// } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useV2Pair } from 'hooks/usePairs'
import { getFullDisplayBalance } from 'utils/formatBalance'

export const PositionCard = ({ data, ethPrice }) => {
  const {
    liquidityAddress,
    token0,
    token1,
    reserveETH,
    myPosition,
    token0Balance,
    token1Balance,
    estBalanceEth,
  } = data
  const [pairAddress, address] = liquidityAddress.split('-')
  const checksumAddr = utils.toChecksumAddress(pairAddress)
  const pairInfo = useV2Pair(checksumAddr)
  console.log('111 positioncard', pairInfo)
  // const { tokenAReserves, tokenBReserves } = pairInfo || {}
  const estUSDValue = +ethPrice * estBalanceEth

  return (
    <a href={`/liquidity/pair/${checksumAddr}`}>
      <Box className='flex mb-6 p-6 items-center' padding='p-6'>
        <div className='flex-1'>
          <Text variant='h3'>{[token0.symbol, token1.symbol].join(' / ')}</Text>
          <div className='flex space-x-6 mt-1.5'>
            <ZKLabel
              label='Est. Value'
              value={`$${new BigNumber(estUSDValue).toFixed(8)}`}
            />
            <ZKLabel
              label={token0?.symbol}
              // value={getFullDisplayBalance(tokenAReserves, 18, 4)}
              value={new BigNumber(token0Balance).toFixed(8)}
            />
            <ZKLabel
              label={token1?.symbol}
              // value={getFullDisplayBalance(tokenBReserves, 18, 4)}
              value={new BigNumber(token1Balance).toFixed(8)}
            />
          </div>
        </div>
        <ArrowRightF />
      </Box>
    </a>
  )
}
