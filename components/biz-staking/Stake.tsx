import { useState } from 'react'
import { Box, Text, TabList, Tab, BORDER_RADIUS } from 'components/Base'

const STAKE_TABS = [
  {
    id: 'stake',
    title: 'Stake',
  },
  {
    id: 'unstake',
    title: 'Unstake',
  },
]

export function Stake() {
  return (
    <div className="flex">
      <Box
        bg="bg-blackBlue"
        className="flex justify-between w-[656px]"
        borderRadius={BORDER_RADIUS['3xl']}
        padding="px-5 py-5"
      >
        <TabList className="pt-0">
          {STAKE_TABS.map((tab) => (
            <Tab
              key={tab?.id}
              active={currTab === tab?.id}
              onClick={() => handleTabClick(tab?.id)}
              className="w-1/2 py-[10px] leading-5"
            >
              {tab?.title}
            </Tab>
          ))}
        </TabList>

        <Stake />
      </Box>
    </div>
  )
}
