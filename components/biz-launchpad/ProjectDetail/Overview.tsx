import classNames from 'classnames'
import { Text } from 'components/Base'
import * as overviewInfo from 'constants/launchpad/projectOverview/index'

type OverViewProps = {
  [key: string]: string
}

const OverviewItem = ({
  label,
  value,
  index,
}: {
  label: string
  value: string
  index: number
}) => {
  const bg = index % 2 === 0 ? 'bg-bg3' : ''
  const commonClass = 'px-4 py-3 min-h-12 text-base'

  return (
    <div className='grid grid-cols-2 gap-x-2'>
      <div className={classNames('text-right text-third', commonClass, bg)}>
        {label}
      </div>
      <div className={classNames('text-left font-semibold', commonClass, bg)}>
        {value}
      </div>
    </div>
  )
}

export const Overview = ({ productId }: { productId: string }) => {
  const info: OverViewProps = productId && overviewInfo[productId]

  if (!info) return null

  return (
    <div>
      <Text variant='h2' className='mt-14 mb-8 font-black'>
        Tokenomics Overview
      </Text>
      {overviewInfo &&
        Object?.keys(info).map((label, index) => (
          <OverviewItem
            key={index}
            label={label}
            value={info[label]}
            index={index}
          />
        ))}
    </div>
  )
}
