import classNames from 'classnames'
import { Text } from '../Text'

export interface ProgressProps extends React.ComponentPropsWithRef<'div'> {
  percentage?: number
}

export const Progress = ({
  percentage,
  className,
  ...otherProps
}: ProgressProps) => {
  const dynamicWidth: string = percentage ? `${percentage}%` : '0'

  return (
    <div className={classNames('flex items-center', className)} {...otherProps}>
      <div className='mr-4 w-[120px] h-[6px] overflow-hidden rounded-[3px] bg-lightGray-700'>
        <div style={{ width: dynamicWidth }} className='h-full bg-lightGreen' />
      </div>
      <Text variant='subTitle2' color='text-lightGreen'>
        {percentage}%
      </Text>
    </div>
  )
}
