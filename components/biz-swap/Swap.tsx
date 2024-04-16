import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useAccount,
  useBalance,
  useNetwork,
  useToken,
  Address,
  useFeeData,
} from 'wagmi'

import { Text } from 'components/Base/Text'
import { Switch } from 'components/Base/Switch'
import { Button, BTN_VARIANT } from 'components/Base/Button'
import Title from 'components/Title'
import { TokenInput } from 'components/TokenAmountInput'
import { useAllowance } from '../../hooks/useAllowance'
import { CONTRACT_ROUTER02 } from '../../constants/chains'
import { useApproveToken } from '../../hooks/useApproveToken'
import { useSwapData, useSwap } from 'hooks'
import { useTokensByNetwork } from 'hooks/useTokenList'
import { Token } from 'sdk/tokens'
import { EmptyFn } from 'utils/base'
import { getBalanceAmount } from 'utils/formatBalance'
import SwapResultPreview from './SwapResultPreview'
import { ExchangeF, SettingsF } from 'icons'
import { SettingPopup } from '../SettingPopup'
import { useGetReserves } from 'hooks/liquidity/useGetReserves'
import { useGetAmountsOut, useGetAmountsIn } from 'hooks/liquidity/useGetAmount'
import { toFixedPurely } from 'utils/formatNumber'
import { isNativeToken } from 'utils/token'
import { getSwapSettings } from 'utils/swap'
import { useNetworkListStore } from 'dataStore/network'

const DISPLAY_DECIMAL = 8

export function Swap() {
  const [tokenA, setTokenA] = useState<Token>()
  const [tokenB, setTokenB] = useState<Token>()
  const [valueA, setValueA] = useState<number | string | undefined>()
  const [valueB, setValueB] = useState<number | string | undefined>()
  const [swapSettings, setSettings] = useState({})
  const { updateNetworkList } = useNetworkListStore()

  useEffect(() => {
    updateNetworkList()
  }, [])

  useEffect(() => {
    const res = getSwapSettings()
    setSettings(res)
  }, [])

  const [queryAmountOutParam, setOutParam] = useState({
    valueIn: '',
    path: [],
    decimals: 18,
  })

  const [queryAmountInParam, setInParam] = useState({
    valueOut: '',
    path: [],
    decimals: 18,
  })

  const [settingPopup, setSettingPopup] = useState(false)

  const { chain } = useNetwork()

  const tokenList = useTokensByNetwork()

  const router02 = CONTRACT_ROUTER02[chain?.id]

  const { tokenAReserves, tokenBReserves, addressWeth } = useGetReserves({
    liquidityAddress: router02 as Address,
    tokenA,
    tokenB,
  })

  const path: Array[Address] = useMemo(() => {
    if (!tokenA || !tokenB) return []

    if (isNativeToken(tokenA)) {
      return [addressWeth, tokenB?.address]
    }
    if (isNativeToken(tokenB)) {
      return [tokenA?.address, addressWeth]
    }
    return [tokenA?.address, tokenB?.address]
  }, [tokenA, tokenB, addressWeth])

  //
  const { status: queryAmountOutStatus, error: queryAmountOutError } =
    useGetAmountsOut({
      liquidityAddress: router02,
      amountOutParams: queryAmountOutParam,
    })

  const {
    status: queryAmountInStatus,
    error: queryAmountInError, // error.cause.reason
  } = useGetAmountsIn({
    liquidityAddress: router02,
    amountInParams: queryAmountInParam,
  })

  const {
    isInvalidPair,
    swapPrice,
    btnStatus,
    balanceA,
    balanceB,
    refetchBalance,
    gasFeeData,
    isSwapBetweenNativeTokenAndWrappedToken,
  } = useSwapData({
    tokenA,
    valueA,
    tokenB,
    valueB,
    address: router02,
    path,
    queryAmountInError,
    queryAmountOutError,
  })

  const {
    swap,
    isLoading: isSwapLoading,
    swapNativeTokenAndWrappedToken,
    isLoadingWrappedToken,
  } = useSwap({
    tokenA,
    tokenB,
    valueA,
    valueB,
    addressWeth,
    swapSettings,
  })

  const isSwapBtnLoading = useMemo(
    () =>
      !isSwapBetweenNativeTokenAndWrappedToken
        ? isSwapLoading ||
          queryAmountOutStatus === 'loading' ||
          queryAmountInStatus === 'loading'
        : isLoadingWrappedToken,
    [
      isSwapLoading,
      queryAmountOutStatus,
      queryAmountInStatus,
      isLoadingWrappedToken,
      isSwapBetweenNativeTokenAndWrappedToken,
    ],
  )

  const { write: approveA } = useApproveToken(tokenA?.address || '', router02)

  const handleTokenChange = (type: string, token?: Token) => {
    if (type === 'A') {
      setTokenA(token)
      setValueA('')
      return
    }
    if (type === 'B') {
      setTokenB(token)
      setValueB('')
      return
    }
    if (type === 'X') {
      setTokenA(tokenB)
      setTokenB(tokenA)
      setValueA('')
      setValueB('')
    }
  }

  const handleGetApproval = useCallback(() => {
    if (btnStatus.code === '1' && approveA && !isNativeToken(tokenA)) {
      approveA()
    }
  }, [btnStatus.code, approveA, tokenA])

  const handleSubmit = () => {
    console.log('trigger swap', { isSwapBetweenNativeTokenAndWrappedToken })
    isSwapBetweenNativeTokenAndWrappedToken
      ? swapNativeTokenAndWrappedToken?.()
      : swap?.()
  }

  const handleBtnClick = useCallback(() => {
    if (btnStatus.code === '-1') {
      return
    }
    if (['1'].includes(btnStatus.code)) {
      handleGetApproval()
    }
    if (btnStatus.code === '3') {
      handleSubmit()
    }
  }, [
    btnStatus.code,
    handleGetApproval,
    swap,
    tokenA,
    tokenB,
    valueA,
    valueB,
    approveA,
  ])

  useEffect(() => {
    if (tokenList && tokenList.length) {
      setTokenA(tokenList[0])
    }
  }, [tokenList])

  // on value A change
  const handleValueAChange = val => {
    if (+val < 0) return

    setValueA(val)

    if (isSwapBetweenNativeTokenAndWrappedToken) return setValueB(val)

    val
      ? setOutParam({
          valueIn: val,
          path,
          decimals: tokenA?.decimals || 18,
          onSuccess: res => {
            setValueB(getBalanceAmount(res[1], tokenB?.decimals))
          },
        })
      : setValueB('')
  }

  // on value B change
  const handleValueBChange = val => {
    if (+val < 0) return

    setValueB(val)

    if (isSwapBetweenNativeTokenAndWrappedToken) return setValueA(val)

    val
      ? setInParam({
          valueOut: val,
          path,
          decimals: tokenB?.decimals || 18,
          onSuccess: res =>
            setValueA(getBalanceAmount(res[0], tokenA?.decimals)),
        })
      : setValueA('')
  }
  return (
    <div className='pt-2'>
      <Title
        title='Swap'
        rightIcon={
          <SettingsF
            className='cursor-pointer'
            color='text-primary'
            onClick={() => setSettingPopup(true)}
          />
        }
      ></Title>
      <TokenInput
        className='mt-6'
        value={valueA ? toFixedPurely(valueA, DISPLAY_DECIMAL) : ''}
        token={tokenA}
        tokenList={tokenList}
        onChange={handleValueAChange}
        onChangeToken={token => handleTokenChange('A', token)}
        label='Sell'
        totalBalance={balanceA}
        showMax
      />
      <div className='flex justify-center mt-5'>
        <ExchangeF
          size='32'
          color='text-primary'
          onClick={() => handleTokenChange('X')}
          className='cursor-pointer'
        />
      </div>
      <TokenInput
        className='mt-1'
        value={valueB ? toFixedPurely(valueB, DISPLAY_DECIMAL) : ''}
        token={tokenB}
        tokenList={tokenList}
        onChange={handleValueBChange}
        onChangeToken={token => handleTokenChange('B', token)}
        label='Receive'
        totalBalance={balanceB}
      />
      <SwapResultPreview
        tokenA={tokenA}
        tokenB={tokenB}
        gasFeeData={gasFeeData}
        swapPrice={swapPrice}
        isInvalidPair={isInvalidPair}
      />
      <Button
        variant={
          btnStatus.code === '-1' || isSwapBtnLoading
            ? BTN_VARIANT.disabled
            : BTN_VARIANT.primary
        }
        roundCornerStyle='rounded-xl'
        disabled={btnStatus.code === '-1' || isSwapBtnLoading}
        className='mt-6 w-full'
        onClick={btnStatus.code === '-1' ? EmptyFn : handleBtnClick}
      >
        {isSwapBtnLoading ? 'loading...' : btnStatus.btnMsg}
      </Button>
      {settingPopup && (
        <SettingPopup
          show={settingPopup}
          setShow={setSettingPopup}
          onSwapSettingsChange={obj => setSettings(obj)}
        />
      )}
    </div>
  )
}
