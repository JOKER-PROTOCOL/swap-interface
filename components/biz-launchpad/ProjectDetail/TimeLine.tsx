import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Address, useAccount } from 'wagmi'
import BigNumber from 'bignumber.js'
import {
  Box,
  Text,
  Steps,
  Step,
  BORDER_RADIUS,
  Button,
  Modal,
  Input,
  BTN_VARIANT,
} from 'components/Base'
import { useCountdown, useDonate, useClaim } from 'hooks'
import {
  PROJECT_STATUS,
  getProjectThemeByStatus,
} from 'hooks/launchpad/useLaunchpad'
import { ZKDConnectButton as ConnectButton } from 'components/ConnectButton'
import { DetailInfoProps } from './index'
import { getFullDisplayBalance } from 'utils/formatBalance'

const STEPS = [
  { title: 'Preparation', field: 'startTime' },
  { title: 'Purchase Start', field: 'purchaseStartTime' },
  { title: 'Purchase End', field: 'purchaseEndTime' },
  { title: 'Claim Start', field: 'claimStartTime' },
]

const OperationButton = ({
  lpdAddress,
  detailBtnTxt,
  detailBtnVariant,
  detailBtnDisabled,
  detailInfo,
  status,
}: {
  lpdAddress: Address
  detailBtnTxt: string
  detailBtnVariant: BTN_VARIANT
  detailBtnDisabled: boolean
  detailInfo: DetailInfoProps
  status: PROJECT_STATUS
}) => {
  const { chainId, baseToken } = detailInfo
  const { countDownField } = getProjectThemeByStatus(status)
  const { D, H, M } = useCountdown(detailInfo[countDownField], chainId)
  const [showModal, setShow] = useState(false)
  const [donateVal, setVal] = useState('0')

  const { isLoading: isDonateLoading, write: donate } = useDonate({
    lpdAddress,
    payableAmount: donateVal,
  })

  const {
    isLoading: isClaimLoading,
    write: claim,
    isError,
    data,
  } = useClaim({
    lpdAddress,
  })

  const renderText = (text: string) =>
    text?.replace('{{d}}', D).replace('{{h}}', H)?.replace('{{m}}', M)

  const [text, variant, disabled, onClick] = useMemo(() => {
    let btnText = detailBtnTxt
    let variant = detailBtnVariant
    let onClick = () => console.log('do nothing, or project status not match')

    if (status === PROJECT_STATUS.PURCHASING) {
      variant = isDonateLoading ? BTN_VARIANT.disabled : detailBtnVariant
      btnText = isDonateLoading ? 'Purchasing...' : detailBtnTxt

      onClick = () => {
        setShow(true)
        // console.log('purchasing', isDonateLoading, donate)
      }
    }

    if (status === PROJECT_STATUS.CLAIMING)
      onClick = () => {
        claim?.()
        variant = isClaimLoading ? BTN_VARIANT.disabled : detailBtnVariant
        btnText = isClaimLoading ? 'Claiming...' : detailBtnTxt
        // console.log('CLAIMING', { isError, data })
      }

    return [
      renderText(btnText),
      variant,
      detailBtnDisabled || isDonateLoading,
      onClick,
    ]
  }, [status, D, H, M, isDonateLoading, donate])

  const handleConfirmDonate = () => {
    donate?.()
    setShow(false)
  }

  return (
    <>
      <Button
        variant={variant}
        disabled={disabled}
        space='px-6 py-4'
        className='min-w-[324px] font-bold text-xl leading-8'
        onClick={onClick}
      >
        {text}
      </Button>
      <Modal show={showModal} title='Purchase' onClose={() => setShow(false)}>
        <Input
          type='number'
          className='text-white'
          width={'w-full'}
          onChange={val => setVal(val)}
          suffix={baseToken}
          value={donateVal}
        />
        <Button
          className='w-full mt-5 font-bold'
          variant={BTN_VARIANT.primary}
          onClick={handleConfirmDonate}
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}

const formatBlockTime = (timeStamp: BigNumber) => {
  const timeStr = timeStamp?.multipliedBy(1000)?.valueOf()
  return dayjs(+timeStr).format('YYYY-MM-DD')
}

export const TimeLine = ({
  detailInfo,
  status,
  donations,
  calculateTokensClaimable,
}: {
  detailInfo: DetailInfoProps
  status: PROJECT_STATUS
  donations: BigNumber
  calculateTokensClaimable: BigNumber
}) => {
  const { isConnected } = useAccount()
  const [current, setCurrent] = useState(0)
  const { decimal, productId, baseToken, address: lpdAddress } = detailInfo

  const { detailBtnTxt, detailBtnVariant, detailBtnDisabled, timeline } =
    getProjectThemeByStatus(status)

  useEffect(() => {
    setCurrent(timeline)
  }, [timeline])

  if (!detailInfo) return null

  return (
    <div className='mt-8'>
      <Text variant='h2' className='mb-8 font-black'>
        Subscription Timeline
      </Text>
      <Steps current={current}>
        {STEPS.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            desc={`${formatBlockTime(detailInfo[step?.field])} (UTC+0)`}
          />
        ))}
      </Steps>

      <div className='flex justify-between items-center mt-8'>
        <Box
          className='flex rounded-[24px] border-0'
          padding='px-8 py-6'
          bg='bg-lightBlue'
          borderRadius={BORDER_RADIUS['3xl']}
        >
          <div className='mr-8 w-[232px]'>
            <Text variant='subTitle2' className='mb-2' color='text-third'>
              My Purchase Amount
            </Text>
            <Text variant='h2' className='font-semibold'>
              {getFullDisplayBalance(donations, decimal, 4)}
              {baseToken}
            </Text>
          </div>
          <div className='w-[232px]'>
            <Text variant='subTitle2' className='mb-2' color='text-third'>
              My Estimated Allocations
            </Text>
            <Text variant='h2' className='font-semibold'>
              {getFullDisplayBalance(calculateTokensClaimable, decimal, 4)}{' '}
              {productId}
            </Text>
          </div>
        </Box>

        {isConnected ? (
          <OperationButton
            detailBtnTxt={detailBtnTxt}
            detailBtnVariant={detailBtnVariant}
            detailBtnDisabled={detailBtnDisabled}
            detailInfo={detailInfo}
            status={status}
            lpdAddress={lpdAddress}
          />
        ) : (
          <ConnectButton className='w-[324px] font-bold text-xl leading-8' />
        )}
      </div>
    </div>
  )
}
