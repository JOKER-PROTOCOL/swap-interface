import { Box, TAG_VARIANT, Tag, Text } from 'components/Base'
import { TokenLogo } from 'components/Base/TokenLogo'
import { ArrowDownF } from 'icons'
import { ReactElement, useState } from 'react'
import { Token } from 'sdk/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'

const PreviewItem = ({
  label,
  children,
}: {
  label: string
  children?: ReactElement
}) => {
  return (
    <div className='flex justify-between'>
      <Text variant='subTitle1'>{label}</Text>
      {children}
    </div>
  )
}

const SwapResultPreview = ({
  tokenA,
  tokenB,
  gasFeeData,
  swapPrice,
  isInvalidPair,
}: {
  tokenA?: Token
  tokenB?: Token
  gasFeeData: any
  swapPrice: any
  isInvalidPair: boolean
}) => {
  const [expand, setExpand] = useState(false)

  if (!tokenA || !tokenB) {
    return null
  }

  return (
    <>
      <Box
        className='flex mt-6 justify-between'
        bg='bg-bg3'
        onClick={() => setExpand(!expand)}
        padding='p-4'
      >
        <div className='flex'>
          <TokenLogo token={tokenA} size={24} className='mr-2' />
          <Text>1 {tokenA?.symbol} =</Text>
          <TokenLogo token={tokenB} size={24} className='mx-2' />
          <Text>
            {!isInvalidPair
              ? getFullDisplayBalance(swapPrice, tokenB?.decimals, 8)
              : '--'}{' '}
            {tokenB?.symbol}
          </Text>
        </div>
        <div className='flex items-center cursor-pointer space-x-1.5'>
          {gasFeeData?.formatted?.gasPrice && (
            <Text variant='subTitle1'>
              {/* fee {gasFeeData?.formatted?.gasPrice} */}
              fee 0.03
            </Text>
          )}
          {/* <ArrowDownF color='text-lightRed' size={'12'} /> */}
        </div>
      </Box>
      {/* {expand && (
        <Box className='mt-6 space-y-3' bg='bg-blackBlue' padding='p-4'>
          <PreviewItem label='Gas Refund'>
            <Tag
              text={'UP TO 99%'}
              variant={TAG_VARIANT.secondary}
              className='text-paleOrange'
            />
          </PreviewItem>
          <PreviewItem label='Price Impact'>
            <Text variant='subTitle1' color='text-lightGreen'>
              0.01%
            </Text>
          </PreviewItem>
          <PreviewItem label='Min Received'>
            <Text variant='subTitle1' color='text-white'>
              1,801.04727 {tokenB.symbol}
            </Text>
          </PreviewItem>
          <PreviewItem label='Max Slippage'>
            <Text variant='subTitle1'>0.2%</Text>
          </PreviewItem>
        </Box>
      )} */}
    </>
  )
}

export default SwapResultPreview
