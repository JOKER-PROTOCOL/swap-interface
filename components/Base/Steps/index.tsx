import React, { FC, ComponentElement, ReactElement, ReactNode } from 'react'
import classNames from 'classnames'
import { CircledCheckMarkF, CheckedF } from 'icons'
import { Text } from '../Text'

type status = 'wait' | 'finish' | 'inProcess'

interface StepsProps extends React.ComponentPropsWithoutRef<'div'> {
  current: number
  // @ts-ignore
  children: Array<ComponentElement<FC<StepProps>>>
  serialType?: string
}

interface StepProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string
  status?: status
  number?: number
  desc?: string | ReactNode
  titleClassName?: string
  descClassName?: string
  isLast?: boolean
  name?: string
  serialType?: string
  serialNumber?: number
  finishColor?: string
}

const getIsWait = (status?: string) => status === 'wait'
const getIsActive = (status?: string) => status === 'inProcess'
const getIsFinish = (status?: string) => status === 'finish'

const SerialNumberStyle =
  'flex shrink-0 items-center justify-center text-sm w-[20px] h-[20px] rounded-full'
const SerialNumber = ({
  status,
  serialNumber,
  finishColor,
}: {
  status?: string
  serialNumber?: number
  finishColor?: string
}) => {
  if (getIsFinish(status)) {
    return <CheckedF size='20px' color={finishColor} className='shrink-0' />
  }

  if (getIsActive(status)) {
    return (
      <div className={classNames(SerialNumberStyle, 'bg-black-800 text-white')}>
        {serialNumber}
      </div>
    )
  }

  return (
    <div
      className={classNames(
        SerialNumberStyle,
        'border border-third text-third ',
      )}
    >
      {serialNumber}
    </div>
  )
}

// step
export const Step = ({
  title,
  name,
  desc,
  titleClassName,
  descClassName,
  status,
  isLast,
  serialType,
  serialNumber,
  finishColor,
  ...otherProps
}: StepProps) => {
  const isWait = getIsWait(status)
  const isActive = getIsActive(status)
  const isFinish = getIsFinish(status)
  const lineBg = isFinish ? 'bg-primary' : ' bg-lineGray'

  return (
    <div name={name} className={name} {...otherProps}>
      <div className='flex items-center'>
        {serialType === 'number' ? (
          <SerialNumber
            status={status}
            serialNumber={serialNumber}
            finishColor={finishColor}
          />
        ) : !isWait ? (
          <CheckedF size='24px' />
        ) : (
          <CircledCheckMarkF size='20px' />
        )}

        {!isLast && (
          <div className={classNames('ml-3 h-[1px] w-full', lineBg)} />
        )}
      </div>
      <Text
        className='mt-2 mb-1 font-medium'
        variant='normal'
        color={
          isFinish && finishColor
            ? finishColor
            : isActive || isFinish
            ? 'text-primary'
            : 'text-third'
        }
      >
        {title}
      </Text>
      <Text variant='subTitle3'>{desc}</Text>
    </div>
  )
}

// steps list
export const Steps = ({
  children,
  current,
  className,
  serialType,
  ...otherProps
}: StepsProps) => {
  const stepList: ReactElement[] = []
  React.Children.forEach(children, (child, index) => {
    const key = child.key != null ? child.key : index
    const isLast = index + 1 === children.length
    const isInProcess = index === current
    const status = isInProcess
      ? 'inProcess'
      : index > current
      ? 'wait'
      : 'finish'

    stepList.push(
      React.cloneElement(child, {
        status,
        key: `step-${key}`,
        name: `step-${key}`,
        isLast,
        serialType,
        serialNumber: index + 1,
        ...child.props,
      }),
    )
  })
  return (
    <div
      className={classNames('grid grid-cols-4 gap-x-3', className)}
      {...otherProps}
    >
      {stepList}
    </div>
  )
}
