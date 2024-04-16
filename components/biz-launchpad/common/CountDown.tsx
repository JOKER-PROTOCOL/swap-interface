import dayjs from 'dayjs'
import { Box, Text } from 'components/Base'
import { useCountdown } from 'hooks'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

const countdownLabels = ['D', 'H', 'M', 'S']

export const Countdown = ({
  timeStamp,
  chainId,
  isEnd,
  isDetailPage = false,
}: {
  timeStamp: BigNumber
  chainId: number
  isEnd: boolean
  isDetailPage?: boolean
}) => {
  const time = useCountdown(timeStamp)

  return !isEnd ? (
    <div
      className={classNames(
        'grid grid-cols-4',
        isDetailPage ? 'gap-x-2' : 'gap-x-3',
      )}
    >
      {countdownLabels?.map((label, index) => (
        <div
          key={index}
          className={classNames(isDetailPage ? 'flex items-baseline' : '')}
        >
          <Box
            bg='bg-icon'
            className={classNames(
              'leading-5 text-center text-white font-bold rounded-[8px]',
              isDetailPage
                ? 'pl-[6px] pr-[6px] py-[6px]'
                : 'mb-1 px-[4px] py-[10px] w-10 h-10 ',
            )}
          >
            {time[label]}
          </Box>
          <Text
            className='text-center'
            color='text-lightGray-500'
            variant='subTitle2'
          >
            {label}
          </Text>
        </div>
      ))}
    </div>
  ) : (
    <Box
      // bg='bg-blackBlue'
      padding='px-3 py-[10px]'
      className='leading-5 text-center'
    >
      {dayjs(timestamp)?.format('YYYY-MM-DD HH:mm:ss')}
    </Box>
  )
}
