import { useEffect, useMemo, useState } from 'react'
import { Address, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { BigNumber } from 'bignumber.js'
import {
  Box,
  Text,
  TabList,
  Tab,
  Input,
  Button,
  BTN_VARIANT,
  BORDER_RADIUS,
} from 'components/Base'
import { ZKDConnectButton } from 'components/ConnectButton'
import { Assets, Statistics, StakingBanner } from './index'
import {
  useTokenBalance,
  useAllowance,
  useStakingButton,
  useStakeTotalAmount,
  useRewardTokenInfo,
} from 'hooks/index'
import {
  getFullDisplayBalance,
  getBalanceAmount,
  getDecimalAmount,
} from 'utils/formatBalance'
import { useRouter } from 'next/router'
import { STAKING_NETWORK_MAP } from '../../constants/staking'
import stakingAbi from '../../abis/staking'

const STAKE_TABS = [
  {
    id: 'stake',
    title: 'Stake',
  },
  {
    id: 'unstake',
    title: 'Unstake',
  },
]

export function DetailContent() {
  const router = useRouter()
  const { token: stakingName } = router.query
  const [currTab, setCurrTab] = useState(STAKE_TABS[0].id)
  const [value, setValue] = useState('')
  const [stakedAmount, setStakedAmount] = useState<any>(0)
  const [lastRewards, setLastRewards] = useState<any>(0)
  const [lastStakeTime, setLastStakeTime] = useState<any>(0)
  const { chain } = useNetwork()

  const currentValue = useMemo(
    () => (value ? new BigNumber(value) : undefined),
    [value],
  )

  const { address, isConnected } = useAccount()

  const isStake = useMemo(() => currTab === 'stake', [currTab])

  const stakingItem = useMemo(() => {
    return (
      chain &&
      STAKING_NETWORK_MAP[chain.id]?.find(item => item.name === stakingName)
    )
  }, [stakingName, chain])

  const stakingChain = useMemo(() => stakingItem?.chain, [stakingItem?.chain])

  const publicClient = usePublicClient({
    chainId: stakingChain,
  })

  const stakingAddress = useMemo(() => {
    return stakingItem?.address || ''
  }, [stakingItem?.address])

  const tokenAddress = useMemo(
    () => stakingItem?.token || undefined,
    [stakingItem?.token],
  )

  const decimals = useMemo(
    () => stakingItem?.decimals || 18,
    [stakingItem?.decimals],
  )
  const { rewardSymbol } = useRewardTokenInfo({
    stakingAddress: stakingAddress as Address,
    stakingAbi,
  })

  const convertedValueWithDecimal = currentValue
    ? getDecimalAmount(currentValue, decimals)
    : undefined
  // console.log('convertedValueWithDecimal', convertedValueWithDecimal)

  const { balance: tokenBalance } = useTokenBalance({
    tokenAddress: tokenAddress as Address,
    watch: true,
  })

  const loadStakingAmount = async () => {
    if (!address) return

    const [amount, lastRewards, lastStakeTime] =
      await publicClient.readContract({
        address: stakingAddress as Address,
        abi: stakingAbi,
        functionName: 'userinfo',
        args: [address] as [Address],
      })
    console.log('userInfo', {
      amount,
      lastRewards,
      lastStakeTime,
      val: BigNumber(amount).valueOf(),
    })

    setStakedAmount(getBalanceAmount(amount, decimals))
    setLastRewards(getBalanceAmount(lastRewards, decimals))
    setLastStakeTime(lastStakeTime)
  }

  // load staking amount
  useEffect(() => {
    if (!stakingChain) return

    loadStakingAmount()
  }, [decimals, publicClient, stakingAddress, stakingChain, tokenBalance])

  const { data: allowance, isApproved } = useAllowance(
    false,
    tokenAddress,
    address,
    stakingAddress,
  )

  const isApprovedEnough = useMemo(
    () =>
      isApproved &&
      allowance?.isGreaterThanOrEqualTo(convertedValueWithDecimal as BigNumber),
    [isApproved, allowance, convertedValueWithDecimal],
  )

  // console.log('allowance:', {
  //   test: allowance?.valueOf(),
  //   allowance,
  //   isApproved,
  //   isApprovedEnough,
  // })

  const unstakeInsufficient = useMemo(
    () => !isStake && currentValue?.isGreaterThan(stakedAmount),
    [currentValue, isStake, stakedAmount],
  )

  const stakeInsufficient = useMemo(
    () =>
      isStake &&
      currentValue?.isGreaterThan(getBalanceAmount(tokenBalance, decimals)),
    [currentValue, isStake, tokenBalance],
  )

  const isDisable = useMemo(
    () => !value || +value <= 0 || unstakeInsufficient,
    [value, unstakeInsufficient],
  )

  // get button info
  const {
    leftButtonText,
    isLeftButtonDisabled,
    onLeftButtonClick,
    rightButtonText,
    isRightButtonDisable,
    onRightButtonClick,
  } = useStakingButton({
    tokenAddress: tokenAddress as Address,
    stakingAddress,
    convertedValueWithDecimal,
    stakingAbi,
    isStake,
    stakeInsufficient,
    isApprovedEnough,
  })

  const onValChange = (value: string) => {
    const val = value?.replace(/[^0-9,.]/, '')
    setValue(val)
  }

  const { totalAmount, isTotalStakeSuccess } = useStakeTotalAmount({
    stakingAddress: stakingAddress as Address,
    stakingAbi,
  })

  if (!stakingItem) {
    return <div>Incorrect staking token</div>
  }

  return (
    <>
      <StakingBanner
        isDetailPage={true}
        apr={stakingItem.defaultApr}
        totalAmount={
          isTotalStakeSuccess
            ? getFullDisplayBalance(totalAmount, decimals, 8)
            : '--'
        }
      />

      <div className='flex mt-8'>
        {/* stake & unstake */}
        <Box
          bg='bg-blackBlue'
          className='w-[656px] h-fit'
          padding='px-5 py-5'
          borderRadius={BORDER_RADIUS['3xl']}
        >
          {/* tabs */}
          <TabList className='pt-0'>
            {STAKE_TABS.map(tab => (
              <Tab
                key={tab.id}
                active={currTab === tab.id}
                onClick={() => setCurrTab(tab.id)}
                className='w-1/2 py-[10px] leading-5 font-bold'
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>

          {/* form */}
          <div className='flex justify-end mt-4 mb-3'>
            <Text variant='subTitle2' color='text-lightRed'>
              Available:
            </Text>
            <Text variant='subTitle2' className='ml-1'>
              {`${
                isStake
                  ? getFullDisplayBalance(tokenBalance, decimals, 8)
                  : getFullDisplayBalance(stakedAmount as BigNumber, 0, 8)
              } `}
              {stakingItem?.symbol}
            </Text>
          </div>

          <Input
            value={value}
            onChange={val => onValChange(val)}
            bg='bg-[rgba(255,255,255,0.1)]'
            textAlign='right'
            className='py-4 px-4'
            // @ts-ignore
            prefix={
              <div className='flex align-center'>
                <img
                  src={stakingItem?.iconUrl}
                  className='w-8 h-8 rounded-full'
                />
                <Text variant='h3' className='ml-2 leading-8'>
                  {stakingItem?.symbol}
                </Text>
              </div>
            }
          />

          <div className='flex justify-between mt-4 mb-6'>
            {/* currently not support */}
            {/* <Text variant='normal' color='text-lightGray'> */}
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {/* You'll Receive */}
            {/* </Text> */}
            {/* <Text variant='normal'> */}
            {/* -- {`${isStake ? 'st' : ''}${stakingItem?.symbol}`} */}
            {/* </Text> */}
          </div>
          {!isConnected && <ZKDConnectButton className='w-full' />}

          {isConnected && isDisable && (
            <Button
              disabled
              variant={BTN_VARIANT.disabled}
              className='w-full text-lightGray font-bold'
            >
              {unstakeInsufficient ? 'Insufficient Balance' : 'Enter Amount'}
            </Button>
          )}
          {isConnected && !isDisable && (
            <div className='flex'>
              {/* left button */}
              {leftButtonText && (
                <Button
                  disabled={isLeftButtonDisabled}
                  variant={
                    !isLeftButtonDisabled
                      ? BTN_VARIANT.primary
                      : BTN_VARIANT.disabled
                  }
                  className={`flex-1 w-[240px] mr-4 font-bold ${
                    isLeftButtonDisabled ? 'text-lightGray' : ''
                  }`}
                  onClick={onLeftButtonClick}
                >
                  {leftButtonText}
                </Button>
              )}
              {/* right button */}
              {rightButtonText && (
                <Button
                  disabled={isRightButtonDisable}
                  variant={
                    isRightButtonDisable
                      ? BTN_VARIANT.disabled
                      : BTN_VARIANT.primary
                  }
                  className={`flex-1 ${
                    isRightButtonDisable ? 'text-lightGray' : ''
                  } font-bold`}
                  onClick={onRightButtonClick}
                >
                  {rightButtonText}
                </Button>
              )}
            </div>
          )}
        </Box>

        <div className='flex-1 ml-6'>
          <Assets
            publicClient={publicClient}
            stakedAmount={stakedAmount}
            lastRewards={lastRewards}
            lastStakeTime={lastStakeTime}
            iconUrl={stakingItem.iconUrl}
            symbol={stakingItem.symbol}
            rewardSymbol={rewardSymbol}
            apr={stakingItem.defaultApr}
          />
          <Statistics
            apr={stakingItem.defaultApr}
            totalAmount={getFullDisplayBalance(totalAmount, decimals, 8)}
          />
        </div>
      </div>
    </>
  )
}
