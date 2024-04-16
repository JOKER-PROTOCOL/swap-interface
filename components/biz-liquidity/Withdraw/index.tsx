import { useCallback, useMemo, useState, useEffect } from 'react'
import { Address, useAccount, useBalance, useNetwork } from 'wagmi'

import { SettingsF } from 'icons'
import { Text } from 'components/Base/Text'
import { Switch } from 'components/Base/Switch'
import { Button, BTN_VARIANT } from 'components/Base/Button'
import { Box, Tab, TabList } from 'components/Base'
import Title from 'components/Title'
import { PercentInput } from 'components/TokenAmountInput'
import { SettingPopup } from 'components/SettingPopup'
import { CONTRACT_ROUTER02 } from 'constants/chains'
import { useApproveToken } from 'hooks/useApproveToken'
import { useWithdrawBtnStatus } from 'hooks'
import { useLiquidityPair, useWithdrawData } from 'hooks/useLiquidity'
import { EmptyFn } from 'utils/base'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useLiquidityWithdraw } from 'hooks'
import { getSwapSettings } from 'utils/swap'
import TabPanel from './TabPanel'
import { TAB } from './constants'
import { NATIVE_TOKEN } from 'constants/token'

export function Withdraw({ pairAddress }: { pairAddress: Address }) {
  const [tab, setTab] = useState(TAB[1].id)
  const pairInfo = useLiquidityPair(pairAddress)
  const {
    liquidityAddress,
    tokenA,
    tokenB,
    pairBalance,
    pairToken,
    isWrappedToken = [],
  } = pairInfo || {}

  const { chain } = useNetwork()
  const router02 = chain?.id && CONTRACT_ROUTER02[chain?.id]

  const [selectToken, setSelectToken] = useState('USDC')
  const [tokenValue, setTokenValue] = useState()
  const [isUseNativeToken, setIsUseNativeToken] = useState(false)
  const [swapSettings, setSettings] = useState({})
  const [settingPopup, setSettingPopup] = useState(false)
  const nativeToken = NATIVE_TOKEN[chain?.id]
  const formattedPairBalance = getFullDisplayBalance(
    pairBalance,
    pairToken?.liquidityToken?.decimals || 18,
    8,
  )

  useEffect(() => {
    const res = getSwapSettings()
    setSettings(res)
  }, [])

  const btnStatus = useWithdrawBtnStatus({
    valueA: tokenValue,
    tokenA: pairToken?.liquidityToken,
    spender: router02,
    pairBalance,
  })

  const [valueA, valueB] = useWithdrawData(
    pairToken,
    tokenA,
    tokenB,
    tokenValue,
  )

  const {
    data: approveData,
    isLoading: isApproveLoading,
    isSuccess,
    write: approvePairToken,
  } = useApproveToken(pairToken?.liquidityToken?.address || '', router02)

  const handleTokenChange = (token: string) => {
    setSelectToken(token)
  }

  const handleTabClick = (id: string) => {
    setTab(id)
  }

  const {
    write: writeWithdraw,
    data: withdrawData,
    isLoading: isWithdrawLoading,
    isSuccess: isWithdrawSuccess,
    error,
    args,
  } = useLiquidityWithdraw({
    address: router02,
    tokenValue,
    tokenA,
    tokenB,
    valueA,
    valueB,
    isUseNativeToken,
    liquidityAddress,
    pairInfo,
    swapSettings,
  })

  const isBtnLoading = useMemo(
    () => isWithdrawLoading || isApproveLoading,
    [isApproveLoading, isWithdrawLoading],
  )

  const handleGetApproval = useCallback(() => {
    approvePairToken?.()
  }, [btnStatus.code, approvePairToken])

  const handleSubmit = useCallback(() => {
    console.log('withdraw')
    writeWithdraw()
  }, [writeWithdraw])

  const handleBtnClick = useCallback(() => {
    if (btnStatus.code === '-1') {
      return
    }
    if (['1', '2'].includes(btnStatus.code)) {
      handleGetApproval()
    }
    if (btnStatus.code === '3') {
      handleSubmit()
    }
  }, [btnStatus.code, handleSubmit])

  if (!pairInfo) {
    return null
  }

  return (
    <div className='pt-2'>
      <Title
        title='Withdraw'
        subTitle='Withdraw to receive pool tokens and earned trading fees.'
        rightIcon={
          <SettingsF
            className='cursor-pointer'
            onClick={() => setSettingPopup(true)}
          />
        }
      ></Title>
      <div className='flex mt-6'>
        <Text variant='h3'>Amount to withdraw</Text>
      </div>
      {/* <TokenInput className="mt-2" balance={data} />
      <TokenInput className="mt-2" balance={data} /> */}
      <PercentInput
        type='percent'
        totalBalance={pairBalance}
        className='mt-4'
        decimals={pairToken?.liquidityToken?.decimals || 18}
        value={tokenValue}
        onChange={setTokenValue}
      />
      <Box bg='bg-bg3' className='mt-4'>
        <TabList className='py-0'>
          {TAB.map(({ id, title, disabled }) => (
            <Tab
              key={id}
              active={tab === id}
              onClick={() => handleTabClick(id)}
              space='py-2.5 px-5'
              className='w-1/2 py-2'
              disabled={disabled}
            >
              {title}
            </Tab>
          ))}
        </TabList>
        <TabPanel
          tab={tab}
          selectToken={selectToken}
          onChange={handleTokenChange}
          pairInfo={pairInfo}
          tokenValuePreview={[valueA, valueB]}
        />
      </Box>
      {/* <div className="flex mt-6 space-x-2">
        <Switch checked={true} onChange={addTokensInBalancedProportion} />
        <Text variant="normal" color="text-paleOrange">
          Add tokens in balanced proportion
        </Text>
      </div> */}
      <Box bg='bg-bg3' className='mt-4'>
        {(isWrappedToken[0] || isWrappedToken[1]) && (
          <div className='flex justify-between'>
            <Text variant='subTitle1'>Collect as {nativeToken?.symbol}</Text>
            <Switch
              checked={isUseNativeToken}
              onChange={setIsUseNativeToken}
            ></Switch>
          </div>
        )}
        {/* <div className='flex justify-between mt-3 mb-6'>
          <Text variant='subTitle1'>Slippage</Text>
          <Text variant='subTitle1' color='text-lightGreen'>
            &lt; 0.01%
          </Text>
        </div> */}

        <Button
          variant={
            btnStatus.code === '-1' || isBtnLoading || !+formattedPairBalance
              ? BTN_VARIANT.disabled
              : BTN_VARIANT['outline-primary']
          }
          disabled={
            isBtnLoading || btnStatus.code === '-1' || !+formattedPairBalance
          }
          className='mt-4 w-full'
          onClick={btnStatus.code === '-1' ? EmptyFn : handleBtnClick}
        >
          {isBtnLoading ? 'loading...' : btnStatus.btnMsg}
        </Button>
      </Box>
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
