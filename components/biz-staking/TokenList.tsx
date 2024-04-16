import { Box, Text, Button, BTN_VARIANT, BORDER_RADIUS } from 'components/Base'
import { useRouter } from 'next/router'
import { PublicClient, useConnect, useNetwork } from 'wagmi'
import BigNumber from 'bignumber.js'

import { STAKING_NETWORK_MAP } from '../../constants/staking'
import { useState } from 'react'
import { useAllPublicClient } from '../../hooks/useAllPublicClient'
import stakingAbi from '../../abis/staking'
import { useInterval } from 'ahooks'
import { getFullDisplayBalance } from '../../utils/formatBalance'
import { NoToken } from './NoToken'

export function TokenList() {
  const { chain } = useNetwork()
  const STAKING_LIST = STAKING_NETWORK_MAP[chain?.id] || []

  const router = useRouter()
  const stakingList = Array.from(STAKING_LIST)
  const [stakeAmountMap, setStakeAmountMap] = useState<{ [key: string]: any }>(
    {},
  )
  const { zksyncClient, zkSyncTestnetClient, sepoliaClient, goerliClient } =
    useAllPublicClient()
  console.log('stakingList', stakingList)

  const fetchStakeAmount = async (client: PublicClient) => {
    const chainId = await client.getChainId()
    const _stakingList = stakingList.filter(item => item.chain === chainId)

    if (_stakingList.length === 0) return

    const contracts: {
      address: string
      abi: any
      functionName: string
      args?: any
    }[] = []

    for (const item of _stakingList) {
      contracts.push({
        address: item.address,
        abi: stakingAbi,
        functionName: 'stakeTotalAmount',
      })
    }

    try {
      // noinspection TypeScriptValidateTypes
      const results = await client.multicall({ contracts })
      const _stakeAmountMap: { [key: string]: bigint } = {}
      _stakingList.forEach((item, index) => {
        const result = results[index]
        let amount = 0
        if (result.status === 'success') {
          amount = result.result
        }
        _stakeAmountMap[`${item.chain}-${item.address}`] = BigInt(amount || 0)
      })
      setStakeAmountMap(Object.assign({}, stakeAmountMap, _stakeAmountMap))
    } catch (e) {
      console.error(e)
    }
  }
  useInterval(
    async () => {
      if (
        stakingList.filter(item => item.chain === zksyncClient.chain.id)
          .length > 0
      )
        await fetchStakeAmount(zksyncClient)

      if (
        stakingList.filter(item => item.chain === zkSyncTestnetClient.chain.id)
          .length > 0
      )
        await fetchStakeAmount(zkSyncTestnetClient)

      if (
        stakingList.filter(item => item.chain === sepoliaClient.chain.id)
          .length > 0
      )
        await fetchStakeAmount(sepoliaClient)

      if (
        stakingList.filter(item => item.chain === goerliClient.chain.id)
          .length > 0
      )
        await fetchStakeAmount(goerliClient)
    },
    12000,
    {
      immediate: true,
    },
  )

  return (
    <div>
      <Text variant='h1' className='mt-10 mb-3'>
        Supported tokens
      </Text>
      <Text className='mb-6'>
        We lets you stake tokens from many networks. Choose a network below to
        get started.
      </Text>

      {stakingList?.length > 0 ? (
        <div className='grid grid-cols-3 gap-6'>
          {stakingList?.map(item => (
            <Box
              key={item.network}
              bg='bg-blackBlue'
              padding='px-5 pb-6 pt-4'
              borderRadius={BORDER_RADIUS['3xl']}
            >
              <img
                src={item.iconUrl}
                alt={item.address}
                className='mb-3 w-10 h-10 rounded-full'
              />

              <Text variant='h3' className='mb-1'>
                {item.name}
              </Text>
              <Text color='text-lightGray' className='mb-4'>
                Stake any amount of ZKT, get daily staking rewards and use your
                ZKT across the DeFi ecosystem and L2.
              </Text>

              <div className='flex justify-between'>
                <div>
                  <Text variant='h3' color='text-lightGreen' className='mg-1'>
                    {item.defaultApr}%
                  </Text>
                  <Text color='text-lightGray' className='subTitle2'>
                    APR
                  </Text>
                </div>
                <div>
                  <Text variant='h3' className='mg-1'>
                    $
                    {getFullDisplayBalance(
                      new BigNumber(
                        stakeAmountMap[`${item.chain}-${item.address}`] || 0,
                      ),
                      item.decimals,
                      4,
                    )}
                  </Text>
                  <Text color='text-lightGray' className='subTitle2'>
                    Staked
                  </Text>
                </div>
              </div>

              {/* button */}
              <div className='flex justify-between mt-6'>
                <Button
                  variant={BTN_VARIANT['outline-darkGray']}
                  className='mr-4 flex-1 border-2'
                >
                  Learn more
                </Button>
                <Button
                  variant={BTN_VARIANT.primary}
                  className='px-5 flex-1'
                  onClick={() => router.push(`/staking/${item?.name}`)}
                >
                  Stake now
                </Button>
              </div>
            </Box>
          ))}
        </div>
      ) : (
        <NoToken />
      )}
    </div>
  )
}
