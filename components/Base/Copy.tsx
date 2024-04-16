import classNames from 'classnames'
import { CopyV2F } from 'icons'
import { copyText } from 'utils/tools'

export const Copy = ({
  text,
  className,
  size,
  ...props
}: {
  text: string
  className?: string
  size?: string
}) => {
  return (
    <CopyV2F
      size={size || '16px'}
      className={classNames(
        'cursor-pointer inline-block ml-2 text-secondary',
        className,
      )}
      onClick={() => copyText(text)}
      {...props}
    />
  )
}
