import classNames from 'classnames'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { ArrowDownF, ArrowTopF } from 'icons'

import { data as mockData } from './mock'
enum SORT_TYPE {
  increase = 'increase',
  decrease = 'decrease',
}

interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  width?: number | string
  sortable?: boolean
  render?: (val: any, record?: RowProps, index?: number) => ReactNode
}

interface RowProps {
  [key: string]: any
}

interface TableCellProps {
  columns: ColumnProps[]
  colIndex: number
  rowData: RowProps
  rowIndex: string | number
}

interface TableHeadProps {
  columns: ColumnProps[]
  sortType?: SORT_TYPE
  toggleSortType?: () => void
  data?: RowProps[]
}

interface TableHeadCellProps {
  columnItem: ColumnProps
  sortType?: SORT_TYPE
  toggleSortType?: () => void
  setSortedData?: (data: RowProps[]) => void
  data?: RowProps[]
}

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  columns: ColumnProps[]
  data: RowProps[]
  rowKey?: string | number
  rowClassName?: string
  emptyText?: string | ReactNode | (() => React.ReactNode)
  onRowClick?: (data?: RowProps, index?: string | number) => void
}

const renderCell = (
  val: any,
  record: RowProps,
  index: string | number,
  render?: (val: any, record?: RowProps, index?: string | number) => ReactNode,
) => (render ? <div>{render(val, record, index)}</div> : val)

const getColProps = (col: ColumnProps[], index: number, key: string) =>
  col?.[index]?.[key]

const TableHeadCell = ({
  data,
  columnItem,
  sortType,
  toggleSortType,
}: TableHeadCellProps) => {
  const { width, title, key, sortable } = columnItem
  const customerWidth = width ? `w-[${width}]` : ''

  const sortNode = {
    [SORT_TYPE.increase]: <ArrowDownF size='12px' color='text-primary' />,
    [SORT_TYPE.decrease]: <ArrowTopF size='12px' color='text-primary' />,
  }

  // sort
  const handleSortCol = () => {
    if (!sortable) return
    toggleSortType?.()

    data?.sort((a: RowProps, b: RowProps) => {
      if (typeof a?.[key] === 'string' && typeof b?.[key] === 'string') {
        if (a?.[key].toLowerCase() > b?.[key].toLowerCase()) return 1
        if (a?.[key].toLowerCase() < b?.[key].toLowerCase()) return -1
        return 0
      }

      if (a?.[key] > b?.[key]) return 1
      if (a?.[key] < b?.[key]) return -1
      return 0
    })

    if (sortType === SORT_TYPE.increase) data?.reverse()
  }

  return (
    <th
      className={classNames(
        'text-left pt-3 pb-1 first:pl-2.5 last:pr-2.5 first:md:pl-6 last:md:pr-6 last:th-content:text-right',
        customerWidth,
      )}
      key={key}
    >
      <div
        className={classNames(
          'th-content flex items-center text-xs font-normal md:text-base',
          sortable ? 'cursor-pointer' : '',
        )}
        onClick={handleSortCol}
      >
        {title}
        {sortable && sortType && (
          <div className='ml-2.5'>{sortNode[sortType]}</div>
        )}
      </div>
    </th>
  )
}

const TableHead = ({
  data,
  columns,
  sortType,
  toggleSortType,
}: TableHeadProps) => (
  <thead className='text-third'>
    <tr className='px-2.5 md:px-6'>
      {columns.map((item: ColumnProps, index) => (
        <TableHeadCell
          data={data}
          key={index}
          columnItem={item}
          sortType={sortType}
          toggleSortType={toggleSortType}
        />
      ))}
    </tr>
  </thead>
)

const TableBodyCell = ({
  columns,
  colIndex,
  rowData,
  rowIndex,
}: TableCellProps) => {
  const widthProp = getColProps(columns, colIndex, 'width')
  const renderProp = getColProps(columns, colIndex, 'render')
  const dataIndexProp = getColProps(columns, colIndex, 'dataIndex')

  const customerWidth = widthProp ? `w-[${widthProp}]` : ''

  return (
    <td
      className={classNames(
        'py-4',
        'text-xs md:text-base',
        customerWidth,
        'bg-bg3 font-semibold first:rounded-l-lg last:rounded-r-lg first:pl-4 md:first:pl-6 last:pr-4 md:last:pr-6 last:text-right',
      )}
      key={`col-${colIndex}`}
    >
      {renderCell(rowData[dataIndexProp], rowData, rowIndex, renderProp)}
    </td>
  )
}

const TableRows = ({
  rowData,
  rowClassName,
  rowKey,
  rowIndex,
  columns,
  onRowClick,
}: {
  rowData: RowProps
  rowClassName?: string
  rowKey?: string | number
  rowIndex: string | number
  columns: ColumnProps[]
  onRowClick: (data?: RowProps, index?: string | number) => void
}) => {
  return (
    <tr
      className={classNames(rowClassName)}
      key={rowKey || rowIndex}
      onClick={() => onRowClick(rowData, rowIndex)}
    >
      {Object.keys(columns).map((_, colIndex) => (
        <TableBodyCell
          key={colIndex}
          columns={columns}
          colIndex={colIndex}
          rowData={rowData}
          rowIndex={rowIndex}
        />
      ))}
    </tr>
  )
}

export const Table = ({
  columns,
  data,
  rowKey,
  emptyText,
  rowClassName,
  onRowClick,
  ...otherProps
}: TableProps) => {
  const [sortType, setSortType] = useState(SORT_TYPE.increase)

  const toggleSortType = useCallback(
    () =>
      sortType === SORT_TYPE.increase
        ? setSortType(SORT_TYPE.decrease)
        : setSortType(SORT_TYPE.increase),
    [sortType],
  )

  const isTableEmpty = useMemo(() => data && data?.length === 0, [data])

  const emptyNode: React.ReactNode = useMemo(() => {
    if (!emptyText) return 'No data'
    if (typeof emptyText === 'function') {
      return emptyText()
    }
    return emptyText
  }, [emptyText])

  const handleRowClick = (data: RowProps, index: string | number) => {
    onRowClick && onRowClick(data, index)
  }

  return (
    <table
      className='w-full border-separate border-spacing-y-2'
      {...otherProps}
    >
      <TableHead
        data={data}
        columns={columns}
        sortType={sortType}
        toggleSortType={toggleSortType}
      />

      <tbody className='text-primary'>
        {!isTableEmpty ? (
          data?.map((row, index) => (
            <TableRows
              key={index}
              columns={columns}
              rowData={row}
              rowIndex={index}
              rowClassName={rowClassName}
              rowKey={rowKey}
              onRowClick={handleRowClick}
            />
          ))
        ) : (
          <tr>
            <td colSpan={columns?.length} className='text-center py-5'>
              {emptyNode}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
