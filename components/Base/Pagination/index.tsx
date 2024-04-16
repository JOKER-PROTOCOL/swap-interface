import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRightF, ArrowLeftF } from 'icons'

export interface PaginationProps {
  total: number
  currentPage: number
  pageSize?: number
  onMoveToPage: (page: number) => any
}

interface PageBtnProps {
  onClick: () => void
  disable: boolean
}

const DEFAULT_PAGESIZE = 5

const PrePage = ({ onClick, disable }: PageBtnProps) => {
  return (
    <div
      className={classNames(
        'mr-4',
        disable ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <ArrowLeftF size='20px' color='text-primary' />
    </div>
  )
}

const NextPage = ({ onClick, disable }: PageBtnProps) => {
  return (
    <div
      onClick={onClick}
      className={!disable ? 'cursor-pointer' : 'cursor-not-allowed'}
    >
      <ArrowRightF size='20px' color='text-primary' />
    </div>
  )
}

export const Pagination = ({
  total,
  currentPage,
  pageSize = DEFAULT_PAGESIZE,
  onMoveToPage,
}: PaginationProps) => {
  const [startNum, setStart] = useState(0)

  const endNumber = useMemo(
    () => (startNum + pageSize - 1 > total ? total : startNum + pageSize - 1),
    [startNum, pageSize],
  )
  const totalPage = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  )

  const isPreDisable = useMemo(() => currentPage === 1, [currentPage])
  const isNextDisable = useMemo(
    () => !total || !totalPage || currentPage === totalPage,
    [currentPage, total, totalPage],
  )

  useEffect(() => {
    total && setStart(pageSize * (currentPage - 1) + 1)
  }, [currentPage, total])

  // go to pre page
  const moveToPrePage = useCallback(() => {
    if (isPreDisable) return

    onMoveToPage(currentPage - 1)
  }, [currentPage, onMoveToPage])

  // go to next page
  const moveToNextPage = useCallback(() => {
    if (isNextDisable) return

    onMoveToPage(currentPage + 1)
  }, [currentPage, onMoveToPage])

  return (
    <div className='flex justify-between text-third'>
      {/* <div>{`${startNum} - ${endNumber} of ${total} Pools`}</div> */}
      <div></div>

      <div className='flex items-center'>
        <div className='flex items-center text-sm md:text-base'>
          Per page
          <div className='ml-1 mr-4 md:ml-3 md:mr-6 text-primary'>
            {pageSize}
          </div>
        </div>
        <PrePage onClick={moveToPrePage} disable={isPreDisable} />
        <NextPage onClick={moveToNextPage} disable={isNextDisable} />
      </div>
    </div>
  )
}
