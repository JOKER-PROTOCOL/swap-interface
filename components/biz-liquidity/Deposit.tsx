import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useBalance, useNetwork, useToken, Address } from 'wagmi'

import { Text } from 'components/Base/Text'
import { Switch } from 'components/Base/Switch'
import { Button, BTN_VARIANT } from 'components/Base/Button'
import Title from 'components/Title'
import { TokenInput } from 'components/TokenAmountInput'
import { useAllowance } from '../../hooks/useAllowance'
import { CONTRACT_ROUTER02 } from '../../constants/chains'
import { useApproveToken } from '../../hooks/useApproveToken'
import { useDepositData, useLiquidityDeposit } from 'hooks'
import { useTokensByNetwork } from 'hooks/useTokenList'
import { Token } from 'sdk/tokens'
import { EmptyFn } from 'utils/base'
import { SettingsF } from 'icons'
import { SettingPopup } from 'components/SettingPopup'
import { useGetReserves } from 'hooks/liquidity/useGetReserves'
import { toFixedPurely } from 'utils/formatNumber'
import { getSwapSettings } from 'utils/swap'
import router from 'next/router'
import { useNetworkListStore } from 'dataStore/network'

const DISPLAY_DECIMAL = 8

export function Deposit({
  pairAddress,
  token0,
  token1,
}: {
  pairAddress?: Address
  token0?: Address
  token1?: Address
}) {
  const [tokenA, setTokenA] = useState<Token>()
  const [tokenB, setTokenB] = useState<Token>()
  const [valueA, setValueA] = useState<number | string | undefined>()
  const [valueB, setValueB] = useState<number | string | undefined>()
  const [swapSettings, setSettings] = useState({})
  const { updateNetworkList } = useNetworkListStore()

  useEffect(() => {
    updateNetworkList()
  }, [])

  const tokenList = useTokensByNetwork()

  useEffect(() => {
    const res = getSwapSettings()
    setSettings(res)
  }, [])

  useEffect(() => {
    // if have pairAddress in router, try to match corresponding token pair
    // if cannot match, redirect to default deposit page
    // for default deposit page, set default pair according to first tokenPair in tokenList
    if (token0 && token1) {
      let tokenA, tokenB

      if (token0 && token1) {
        const [res1] = tokenList?.filter(token => token?.address === token0)
        const [res2] = tokenList?.filter(token => token?.address === token1)
        tokenA = res1 || tokenA
        tokenB = res2 || tokenB
      }
      if (tokenA && tokenB) {
        setTokenA(tokenA)
        setTokenB(tokenB)
      } else {
        router.push(`/liquidity/deposit`)
      }
    } else if (tokenList && tokenList.length) {
      setTokenA(tokenList[0])
      tokenList[1] && setTokenB(tokenList[1])
    }
  }, [tokenList, token0, token1])

  const [settingPopup, setSettingPopup] = useState(false)

  const { chain } = useNetwork()

  const router02 = chain?.id && CONTRACT_ROUTER02[chain?.id]

  const { btnStatus, balanceA, balanceB } = useDepositData({
    tokenA,
    tokenB,
    valueA,
    valueB,
    spender: router02,
  })

  const { reservesRatioBA, reservesRatioAB } = useGetReserves({
    liquidityAddress: router02 as Address,
    tokenA,
    tokenB,
  })

  const {
    data: approveData,
    isLoading: isApproveALoading,
    isSuccess,
    write: approveA,
  } = useApproveToken(tokenA?.address || '', router02)

  const { write: approveB, isLoading: isApproveBLoading } = useApproveToken(
    tokenB?.address || '',
    router02,
  )

  const {
    write: writeDeposit,
    data: depositData,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccess,
    error,
    args,
    payableAmount,
  } = useLiquidityDeposit({
    address: router02,
    tokenA,
    tokenB,
    valueA,
    valueB,
    swapSettings,
  })
  // console.log('deposit', {
  //   tokenA,
  //   tokenB,
  //   valueA,
  //   valueB,
  // })

  const isDepositBtnLoading = useMemo(
    () => isApproveALoading || isApproveBLoading || isDepositLoading,
    [isApproveALoading, isApproveBLoading, isDepositLoading],
  )

  const handleTokenChange = (type: string, token: Token) => {
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
  }

  // if value A change
  const handleValueAChange = (value: string) => {
    if (+value < 0) return

    setValueA(value)

    if (reservesRatioBA) {
      // value B = value A * (reserve B / reserve A)
      const expectedValB = new BigNumber(value).multipliedBy(reservesRatioBA)

      setValueB(expectedValB?.valueOf())
    }
  }

  // if value B change
  const handleValueBChange = (value: string) => {
    if (+value < 0) return

    setValueB(value)

    if (reservesRatioAB) {
      // value A = value B * (reserve A / reserve B)
      const expectedValA = new BigNumber(value).multipliedBy(reservesRatioAB)
      setValueA(expectedValA?.valueOf())
    }
  }

  // const addTokensInBalancedProportion = (checked: boolean) => {
  //   console.log('checked', checked)
  // }

  const handleGetApproval = useCallback(() => {
    if (btnStatus.code === '1' && approveA) {
      approveA()
    }
    if (btnStatus.code === '2' && approveB) {
      approveB()
    }
  }, [btnStatus.code, approveA, approveB])

  const handleSubmit = () => {
    const extraPayload = payableAmount ? { value: payableAmount } : {}
    console.log('deposit args:', { args, extraPayload, valueA })
    writeDeposit()
  }

  const handleBtnClick = useCallback(() => {
    console.log('handleBtnClick:', { btnStatus })

    if (btnStatus.code === '-1') {
      return
    }
    if (['1', '2'].includes(btnStatus.code)) {
      handleGetApproval()
    }
    if (btnStatus.code === '3') {
      handleSubmit()
    }
  }, [btnStatus.code, handleGetApproval, writeDeposit])

  return (
    <div className='pt-5'>
      <Title
        title='Deposit'
        subTitle='Deposit tokens to the pool to start earning trading fees.'
        rightIcon={
          <SettingsF
            className='cursor-pointer'
            onClick={() => setSettingPopup(true)}
          />
        }
      ></Title>
      <div className='flex mt-6'>
        <Text variant='h3'>Tokens to deposit</Text>
      </div>
      <TokenInput
        className='mt-6'
        inputClassName='py-4'
        value={valueA ? toFixedPurely(valueA, DISPLAY_DECIMAL) : ''}
        token={tokenA}
        tokenList={tokenList}
        onChange={handleValueAChange}
        onChangeToken={token => handleTokenChange('A', token)}
        tokenInside={false}
        // showTokenList={false}
        totalBalance={balanceA}
      />
      <TokenInput
        className='mt-6'
        inputClassName='py-4'
        value={valueB ? toFixedPurely(valueB, DISPLAY_DECIMAL) : ''}
        token={tokenB}
        tokenList={tokenList}
        onChange={handleValueBChange}
        onChangeToken={token => handleTokenChange('B', token)}
        tokenInside={false}
        totalBalance={balanceB}
      />
      {/* <div className='flex mt-6 space-x-2'>
        <Switch checked={true} onChange={addTokensInBalancedProportion} />
        <Text variant='normal' color='text-third'>
          Add tokens in balanced proportion
        </Text>
      </div> */}
      <Button
        // variant={BTN_VARIANT.disabled}
        variant={
          btnStatus.code === '-1' || isDepositBtnLoading
            ? BTN_VARIANT.disabled
            : BTN_VARIANT['outline-primary']
        }
        disabled={btnStatus.code === '-1' || isDepositBtnLoading}
        className='mt-6 w-full'
        onClick={btnStatus.code === '-1' ? EmptyFn : handleBtnClick}
      >
        {isDepositBtnLoading ? 'loading...' : btnStatus.btnMsg}
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
