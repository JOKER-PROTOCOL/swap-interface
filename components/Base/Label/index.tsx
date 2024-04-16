import classNames from 'classnames'
import { Text } from 'components/Base'

interface LabelProps {
  isRequired?: boolean
  label?: string
  text?: string
  className?: string
}

export const Label = ({
  isRequired = false,
  text = '',
  className,
}: LabelProps) => {
  return text ? (
    <Text className={classNames('flex mb-2 text-primary', className)}>
      {text}
      {isRequired ? <div className='ml-1 text-alert'>*</div> : null}
    </Text>
  ) : null
}

export const ErrorMsg = ({ msg }: { msg: string }) => (
  <div className='text-alert'>{msg}</div>
)
