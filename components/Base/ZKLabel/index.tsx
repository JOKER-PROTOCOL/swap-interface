import classNames from 'classnames'
import { Text } from 'components/Base/Text'

export const ZKLabel = ({
  label,
  value,
  className,
}: {
  label: string
  value?: string | number | undefined | null | boolean
  className?: string
}) => {
  return (
    <div className={classNames('flex', className)}>
      <Text variant='subTitle1' color='text-third'>
        {label}
      </Text>
      <Text
        variant='subTitle1'
        color='text-primary'
        className='ml-2 font-semibold'
      >
        {value}
      </Text>
    </div>
  )
}
