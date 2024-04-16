import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import web3 from 'web3'

import { Box, BORDER_RADIUS } from 'components/Base/Box'
import { BTN_VARIANT, Button } from 'components/Base/Button'
import { Input } from 'components/Base/Input'
import { Table } from 'components/Base/Table'
import { Text } from 'components/Base/Text'
import { Pagination } from 'components/Base/Pagination'
import { useLiquidityList, useLiquidityTotalList } from 'hooks/useLiquidity'
import { AddF, ArrowRightF, SearchF } from 'icons'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

const columns = [
  {
    title: '#',
    key: 'id',
    dataIndex: 'id',
    width: '100px',
    render: (val, record, index) => <div> {index + 1}</div>,
  },
  {
    title: 'pool',
    key: 'pool',
    dataIndex: '',
    width: '30%',
    render: (val, record) => (
      <div> {`${record?.tokenA?.symbol} / ${record?.tokenB?.symbol}`}</div>
    ),
  },
  {
    title: 'liquidity', // liquidity
    key: 'totalSupply',
    dataIndex: 'liquidityAmount',
    sortable: true,
    width: '40%',
    render: (totalSupply: string, record) => (
      <div className='w-[110px]'>
        ${record.liquidity.toFixed(8)}
        {/* ${Number(+record?.totalSupply || 0).toFixed(8)} */}
        {/* ${getFullDisplayBalance(totalSupply, record?.tokenA?.decimals || 18, 4)} */}
      </div>
    ),
  },
  {
    title: 'APY',
    key: 'apy',
    dataIndex: 'apy',
    render: (totalSupply: string, record) => (
      <div className='w-[110px]'>
        {record.apy.multipliedBy(100).toFixed(2)}%
        {/* ${Number(+record?.totalSupply || 0).toFixed(8)} */}
        {/* ${getFullDisplayBalance(totalSupply, record?.tokenA?.decimals || 18, 4)} */}
      </div>
    ),
  },
  {
    title: '',
    render: () => <ArrowRightF size='20px' className='cursor-pointer' />,
  },
]

export const LiquidityTable = ({ pairsInfo }) => {
  const router = useRouter()
  // const liquidityList = pairsInfo
  const liquidityList = useLiquidityTotalList()
  // console.log(
  //   'liquidityList',
  //   liquidityList,
  //   getFullDisplayBalance(
  //     liquidityList[0]?.totalSupply,
  //     liquidityList[0]?.tokenA?.decimals || 18,
  //     4,
  //   ),
  // )
  const [page, setPage] = useState(1)

  const handleClick = data => {
    console.log('handleClick', data)
    const { token0, token1 } = data || {}
    router.push(
      `/liquidity/deposit?token0=${web3?.utils?.toChecksumAddress(
        token0?.id,
      )}&token1=${web3?.utils?.toChecksumAddress(token1?.id)}`,
    )
  }

  return (
    <div className=''>
      <div className='flex space-x-6 mt-6'>
        <Link href='/liquidity/deposit'>
          <Button variant={BTN_VARIANT.dark} className='flex items-center'>
            <AddF className='mr-3' size='24px' />
            Add Liquidity
          </Button>
        </Link>
        <Input
          // bg='bg-strongRed'
          className='flex-1'
          placeholder='ETH, USDT, 0x…'
          prefix={<SearchF size='24px' color='text-primary' />}
        ></Input>
      </div>
      <Box borderRadius={BORDER_RADIUS['3xl']} className='mt-6' padding='p-6'>
        <div className='flex justify-between mb-2 font-semibold'>
          <Text variant='h3'>All Pools</Text>
          {/* <Text variant='subTitle1' color='text-primary'>
            TVL $62,042,663.1
          </Text> */}
        </div>
        <Table
          data={liquidityList}
          columns={columns}
          onRowClick={handleClick}
        />
      </Box>
      <div className='mt-3 mx-[44px]'>
        <Pagination
          total={liquidityList.length}
          currentPage={page}
          onMoveToPage={setPage}
        />
      </div>
    </div>
  )
}
