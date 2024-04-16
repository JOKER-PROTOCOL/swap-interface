import { memo } from 'react'
import { Text } from 'components/Base/Text'

const Title = ({
  title,
  subTitle,
  rightIcon,
}: {
  title: string
  subTitle?: string
  rightIcon?: any
}) => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <Text variant='h1'>{title}</Text>
        {rightIcon}
      </div>
      {subTitle && <Text variant='subTitle1'>{subTitle}</Text>}
    </div>
  )
}

export default memo(Title)
