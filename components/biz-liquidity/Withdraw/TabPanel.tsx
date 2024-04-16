import { useState } from 'react'

import { Text } from 'components/Base/Text'
import { Checkbox } from 'components/Base/Checkbox'

import { TAB } from './constants'
import { Token } from 'sdk/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

const TokenCheckbox = ({
  tab,
  checked,
  onChange,
  tokenName,
  tokenAmount,
  decimals = 18,
}: {
  tab: string
  checked?: boolean
  onChange: (tokenName: string) => void
  tokenName: string
  tokenAmount: BigNumber
  decimals?: number
}) => {
  return (
    <div className='flex justify-between :not-first'>
      <div className='flex'>
        {tab === TAB[0].id && (
          <Checkbox
            value={checked ? +checked : undefined}
            onChange={() => onChange(tokenName)}
            className='mr-3'
          />
        )}
        <Text variant='normal'>{tokenName}</Text>
      </div>
      <Text>{getFullDisplayBalance(tokenAmount, decimals, 8)}</Text>
    </div>
  )
}

const TabPanel = ({
  tab,
  selectToken,
  pairInfo,
  onChange,
  tokenValuePreview,
}: // tokenPair,
{
  tab: string
  selectToken: string
  pairInfo: any
  onChange: (tokenName: string) => void
  tokenValuePreview: [BigNumber, BigNumber]
}) => {
  const { pairBalance, pairToken } = pairInfo
  const { tokenA, tokenB } = pairInfo
  // const [valueA, valueB] = tokenValuePreview
  // const tokens = ['USDC', 'ETH']
  return (
    <div className='space-y-4 mt-4'>
      <Text variant='normal' color='text-third'>
        You will only receive the single token of your choice.
      </Text>
      <div className='border-b border-lineGray'></div>
      <Text variant='normal'>Expect to receive</Text>
      {[tokenA, tokenB].map((token, idx) => (
        <TokenCheckbox
          tab={tab}
          key={idx}
          // checked={selectToken === token}
          onChange={onChange}
          tokenName={token.symbol}
          tokenAmount={tokenValuePreview[idx]}
          decimals={pairToken?.liquidityToken?.decimals || 18}
        />
      ))}
    </div>
  )
}

export default TabPanel
