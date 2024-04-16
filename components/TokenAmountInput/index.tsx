import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Input } from 'components/Base/Input'
import { Text } from 'components/Base/Text'
import { Box } from 'components/Base/Box'
import { RangeSlider } from 'components/Base/RangeSlider'
import DropdownButton from './DropdownButton'

import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { Tag, TAG_VARIANT } from 'components/Base/Tag'
import { useTokenBalance } from 'hooks'
import { Token } from 'sdk/tokens'
import { DEFAULT_DISPLAY_DECIMAL } from 'constants/ui'
import TokenOutside from './TokenOutside'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { ZERO } from 'sdk/pairs/constants'

// TODO get type definition from wagmi
export interface BalanceInputProps {
  value?: BigNumber
  token: any
  tokenList: Array<any>
  onChange: (val: BigNumber) => void
  onChangeToken?: (token: Token) => void
  className?: string
  showTokenList?: boolean
  tokenInside?: boolean
  label?: string
  totalBalance?: BigNumber
  decimals?: number
  inputClassName?: string
  showMax?: boolean
}

const PERCENTAGES = [
  {
    label: '25%',
    value: 0.25,
  },
  {
    label: '50%',
    value: 0.5,
  },
  {
    label: '75%',
    value: 0.75,
  },
  {
    label: 'Max',
    value: 1,
  },
]

export const PercentInput = ({
  value,
  onChange,
  decimals,
  totalBalance,
  className,
}: BalanceInputProps) => {
  const [selectTag, setSelectTag] = useState<number | undefined>()
  const percentValue = value?.isEqualTo(BIG_ZERO)
    ? '0'
    : value?.dividedBy(totalBalance).multipliedBy(100).toString()

  console.log('PercentInput', value, value?.toString(), percentValue)

  const handleTagClick = (tag: number) => {
    setSelectTag(tag)
    onChange(totalBalance?.multipliedBy(tag) || BIG_ZERO)
  }

  const handleSliderChange = v => {
    setSelectTag(undefined)
    const percent = +v / 100
    const value = totalBalance?.multipliedBy(percent)
    onChange(value || BIG_ZERO)
  }

  const handleValueChange = (v: string) => {
    setSelectTag(undefined)
    onChange(+v ? getDecimalAmount(new BigNumber(v), decimals) : undefined)
  }

  return (
    <Box bg='bg-bg3' className={classNames('', className)}>
      <Input
        type='number'
        placeholder='0.00'
        className='-ml-4'
        // value={value}
        value={
          value || value?.isEqualTo(BIG_ZERO)
            ? getFullDisplayBalance(value, decimals, 8)
            : undefined
        }
        onChange={handleValueChange}
      />
      <div className='flex justify-between mt-2'>
        <Text variant='subTitle2' color='text-third'>
          {/* $0 */}
        </Text>
        <Text variant='subTitle2' color='text-third'>
          Available{' '}
          {totalBalance ? getFullDisplayBalance(totalBalance, decimals, 8) : 0}
        </Text>
      </div>
      <RangeSlider
        className='mt-2'
        value={percentValue}
        onChange={handleSliderChange}
      />
      <div className='flex space-x-4 mt-5'>
        {PERCENTAGES.map(({ label, value }) => (
          <Tag
            onClick={() => handleTagClick(value)}
            variant={
              selectTag === value ? TAG_VARIANT.highlight : TAG_VARIANT.primary
            }
            text={label}
            key={label}
            className='width-1/4 flex-1 text-center cursor-pointer'
          />
        ))}
      </div>
    </Box>
  )
}

export const TokenInput = ({
  showTokenList = true,
  tokenInside = true,
  showMax = false,
  value,
  token,
  tokenList,
  onChange,
  onChangeToken,
  className,
  label,
  totalBalance = new BigNumber(0),
  inputClassName,
}: BalanceInputProps) => {
  const formattedBalance = useMemo(
    () =>
      getFullDisplayBalance(
        totalBalance,
        token?.decimals || 18,
        DEFAULT_DISPLAY_DECIMAL,
      ),
    [token, totalBalance],
  )

  const isShowMax = useMemo(() => {
    return showMax && totalBalance.isGreaterThan(new BigNumber(0))
  }, [showMax, totalBalance])

  const handleSelectMax = useCallback(() => {
    console.log('handleSelectMax')
    onChange(formattedBalance)
  }, [formattedBalance])

  return (
    <div className={classNames('', className)}>
      <div className='flex space-x-1 justify-between mb-3 items-center'>
        {!tokenInside ? (
          <TokenOutside
            token={token}
            onChange={onChangeToken}
            tokenList={tokenList}
            showTokenList={showTokenList}
          />
        ) : (
          <div className='font-bold'>{label}</div>
        )}

        <div className='flex space-x-1 justify-end items-center'>
          <Text variant='subTitle2' color='text-spunPearl'>
            Balance:
          </Text>
          <Text variant='subTitle2' color='text-primary' className='font-bold'>
            {formattedBalance} {token?.symbol}
          </Text>
          {isShowMax && (
            <Text
              color='text-zkLink'
              className='cursor-pointer'
              onClick={handleSelectMax}
            >
              Max
            </Text>
          )}
        </div>
      </div>
      <Input
        type='number'
        min={0}
        value={value}
        className={inputClassName}
        prefix={
          showTokenList && tokenInside ? (
            <DropdownButton
              token={token}
              onChange={onChangeToken}
              tokenList={tokenList}
              className={'shrink-0'}
            />
          ) : null
        }
        textAlign={tokenInside ? 'right' : 'left'}
        onChange={onChange}
      ></Input>
    </div>
  )
}
