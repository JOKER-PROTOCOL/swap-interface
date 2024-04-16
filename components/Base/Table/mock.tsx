import React from 'react'
import { Table } from 'components/Base/Table'
import { Pagination } from 'components/Base/Pagination'

export const data = [
  {
    base: 'usdt 1',
    quote: 'eth',
    apr: '20%',
    liquidity: 1234,
  },
  {
    base: 'usdt 2',
    liquidity: 3648,
    quote: 'eth',
    apr: '20%',
  },
  {
    base: 'usdt 3',
    quote: 'eth',
    apr: '20%',
    liquidity: 123,
  },
]

const columns = [
  {
    title: '#',
    key: 'rank',
    dataIndex: 'rank',
    width: '100px',
    render: (val, record, index) => <div> {index + 1}</div>,
  },
  {
    title: 'pool',
    key: 'pool',
    dataIndex: 'pool',
    render: (val, record) => <div> {`${record?.base} / ${record?.quote}`}</div>,
  },
  {
    title: 'liquidity',
    key: 'liquidity',
    dataIndex: 'liquidity',
    sortable: true,
  },
  {
    title: 'APR',
    key: 'apr',
    dataIndex: 'apr',
    render: val => <div>{val}</div>,
  },
]
export default function Test() {
  const [currentPage, setCurrPage] = React.useState(1)

  return (
    <div>
      <Table data={data} columns={columns} />
      <Pagination
        total={51}
        currentPage={currentPage}
        onMoveToPage={page => setCurrPage(page)}
      />
    </div>
  )
}
