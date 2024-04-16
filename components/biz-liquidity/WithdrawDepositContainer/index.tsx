import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'components/Base/Box'
import { DarkLink } from 'components/Base/Link'
import { TabList, Tab } from 'components/Base/Tab'
import { Deposit } from '../Deposit'
import { Withdraw } from '../Withdraw'
import router from 'next/router'
import { ArrowLeft2F } from 'icons'
import { Address } from 'wagmi'

export const ADD_LIQUIDITY_MENU = [
  {
    id: 'deposit',
    title: 'Deposit',
  },
  {
    id: 'withdraw',
    title: 'Withdraw',
  },
]

export const WithdrawDepositContainer = ({
  tabId,
  pairAddress,
}: {
  tabId: string
  pairAddress?: Address
}) => {
  const router = useRouter()
  const { token0, token1 } = router?.query || {}

  const handleTabClick = (id: string) => {
    if (id === ADD_LIQUIDITY_MENU[1].id) {
      return router.push('/liquidity/position')
    }
    router.push(`/liquidity/${id}`)
  }

  return (
    <div>
      <DarkLink href='/liquidity'>
        <div className='flex items-center'>
          <ArrowLeft2F className='mr-3' />
          Back
        </div>
      </DarkLink>
      <div className='flex justify-center mt-4'>
        <Box className='w-[496px]' padding='px-6 py-6'>
          <TabList>
            {ADD_LIQUIDITY_MENU.map(({ id, title }) => (
              <Tab
                key={id}
                active={tabId === id}
                onClick={() => handleTabClick(id)}
                className='w-1/2'
              >
                {title}
              </Tab>
            ))}
          </TabList>
          {tabId === ADD_LIQUIDITY_MENU[0].id && (
            <Deposit
              pairAddress={pairAddress}
              token0={token0 as Address}
              token1={token1 as Address}
            />
          )}
          {tabId === ADD_LIQUIDITY_MENU[1].id && pairAddress && (
            <Withdraw pairAddress={pairAddress} />
          )}
        </Box>
      </div>
    </div>
  )
}
