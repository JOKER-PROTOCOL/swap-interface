import { Text } from 'components/Base/Text'
import { Box, BORDER_RADIUS } from 'components/Base/Box'
import { ZKLabel } from 'components/Base/ZKLabel'
import { Tag, TAG_VARIANT } from 'components/Base/Tag'

import { useV2Pair } from 'hooks/usePairs'

import { getFullDisplayBalance } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { Address } from 'wagmi'
import BigNumber from 'bignumber.js'
import { useEthPrice, useMyPositionById } from 'hooks/useLiquidity'

const Asset = ({ percentage, token, amount }) => {
  const displayAmount = amount
    ? getFullDisplayBalance(amount, token.decimal || token.decimals, 8)
    : ''
  // const displayPerc = percentage.multipliedBy(100).toFixed(2)
  return (
    <div className='flex justify-between mt-4'>
      <div className='flex items-center'>
        {/* <Tag variant={TAG_VARIANT.primary} text={`${displayPerc}%`} /> */}
        <Text variant='normal'>{token.symbol}</Text>
      </div>
      <Text variant='normal'>
        {displayAmount} {token.symbol}
      </Text>
    </div>
  )
}

export const PairDetail = ({ pairAddress }: { pairAddress: Address }) => {
  // const router = useRouter()
  // console.log('query pair', router.query.pair)
  const pairInfo = useV2Pair(pairAddress)
  const positionInfo = useMyPositionById(pairAddress)
  const { myPosition = 0, estBalanceEth } = positionInfo
  const ethPrice = useEthPrice()
  const estUSDValue = +ethPrice * estBalanceEth
  console.log('222 estUSDValue', ethPrice, estBalanceEth)
  const {
    // liquidityAddress,
    tokenA,
    tokenB,
    reserves,
    reservesRatioAB,
    reservesRatioBA,
    tokenAReserves,
    tokenBReserves,
    pairBalance,
    tokenBalance,
    totalSupply,
    pairToken,
    // poolShare,
  } = pairInfo || {}

  const _totalSupply = totalSupply
    ? getFullDisplayBalance(
        totalSupply,
        pairToken?.liquidityToken?.decimals || 18,
        8,
      )
    : 0
  const _pairBalance = pairBalance
    ? getFullDisplayBalance(
        pairBalance,
        pairToken?.liquidityToken?.decimals || 18,
        8,
      )
    : 0
  const poolShare = new BigNumber(+_pairBalance / +_totalSupply)
    .multipliedBy(100)
    .toFixed(2)

  console.log('PairDetail1', poolShare)

  console.log('PairDetail', {
    // tokenA,
    // tokenB,
    // tokenBalance,
    // pairAddress,
    // pairInfo,
    pairBalance: pairBalance
      ? getFullDisplayBalance(
          pairBalance,
          pairToken?.liquidityToken?.decimals || 18,
          8,
        )
      : 0,
    totalSupply: totalSupply
      ? getFullDisplayBalance(
          totalSupply,
          pairToken?.liquidityToken?.decimals || 18,
          8,
        )
      : 0,
    _poolShare: poolShare
      ? getFullDisplayBalance(
          poolShare,
          pairToken?.liquidityToken?.decimals || 18,
          8,
        )
      : 0,
  })

  if (!pairInfo) {
    return <div className='my-10'>Pair info does not exist.</div>
  }

  return (
    <>
      <div className='flex space-x-10 mt-6'>
        <Box borderRadius={BORDER_RADIUS['3lg']} bg='bg-bg3' className='w-1/2'>
          <ZKLabel label={'Position Value'} />
          <Text variant='h2' className='mt-2'>
            {/* {totalSupply ? getFullDisplayBalance(totalSupply, 18, 8) : 0} */}
            ${new BigNumber(estUSDValue).toFixed(8)}
            {/* {pairBalance
              ? getFullDisplayBalance(
                  pairBalance,
                  pairToken?.liquidityToken?.decimals || 18,
                  8,
                )
              : 0} */}
          </Text>
        </Box>
        <Box borderRadius={BORDER_RADIUS['3lg']} bg='bg-bg3' className='w-1/2'>
          <ZKLabel label={'Pool Share'} />
          <div className='flex mt-2 items-center space-x-4'>
            <Text variant='h2'>{poolShare}%</Text>
            {/* <ZKLabel label={'0.0000003 SLP'} /> */}
          </div>
        </Box>
      </div>
      <Box borderRadius={BORDER_RADIUS['3lg']} bg='bg-bg3' className='mt-6'>
        <Text variant='h3'>Assets</Text>
        <Asset token={tokenA} amount={tokenBalance?.[0]} />
        <Asset token={tokenB} amount={tokenBalance?.[1]} />
      </Box>
    </>
  )
}
