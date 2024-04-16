import { Address } from 'wagmi'
import {
  goerli,
  scrollTestnet,
  sepolia,
  zkSync,
  zkSyncTestnet,
} from 'wagmi/chains'
import BigNumber from 'bignumber.js'
import { ChainId } from '../chains'

interface ListItem {
  networkName: string
  name: string
  description?: string
  productId: string
  address: Address | string
  token: Address | string
  decimal: number
  chain: number
  network: string
  iconUrl: string
  totalTokensSold?: BigNumber
  softCap?: BigNumber
  hardCap?: BigNumber
  startTime?: BigNumber
  purchaseStartTime?: BigNumber
  purchaseEndTime?: BigNumber
  claimStartTime?: BigNumber
  baseToken?: string
}

interface LaunchpadNetworkMapProps {
  [chainId: number]: ListItem[]
}

export const LAUNCHPAD_NETWORK_MAP: LaunchpadNetworkMapProps = {
  [ChainId.ZKSYNC_TESTNET]: [
    {
      networkName: zkSyncTestnet.network,
      name: 'ZKT latest', // need to be unique
      description: 'test desc',
      productId: 'ZKT',
      address: '0x3e667F7BD804F841E1dDeAc994fb1fB633207CfA', // zkt launchpad contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // zkt
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      //
      totalTokensSold: new BigNumber('10000000000000000000000000'),
      softCap: new BigNumber('1000000000000000000'),
      hardCap: new BigNumber('3000000000000000000'),
      startTime: new BigNumber(1693053831),
      purchaseStartTime: new BigNumber(1693053831),
      purchaseEndTime: new BigNumber(1693140231),
      claimStartTime: new BigNumber(1693140231), //
      claimEndTime: null,
      baseToken: 'ETH',
      //
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
    {
      networkName: zkSyncTestnet.network,
      name: 'Launchpad ZKT', // need to be unique
      productId: 'ZKT',
      address: '0xB321A76a7329bC6127E585F602fCb12C88861d64', // zkt launchpad contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // zkt
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      //
      totalTokensSold: new BigNumber('10000000000000000000000000'),
      softCap: new BigNumber('10000000000000000000'),
      hardCap: new BigNumber('30000000000000000000'),
      startTime: new BigNumber(1691403047),
      purchaseStartTime: new BigNumber(1691403047),
      purchaseEndTime: new BigNumber(1691424647),
      claimStartTime: new BigNumber(1691424647), //
      claimEndTime: new BigNumber(1693526400),
      baseToken: 'ETH',
      //
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
    {
      networkName: zkSyncTestnet.network,
      name: 'Launchpad ZKT 2', // need to be unique
      productId: 'ZKT2',
      address: '0xB321A76a7329bC6127E585F602fCb12C88861d64', // zkt launchpad contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // zkt
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      totalTokensSold: new BigNumber('10000000000000000000000000'),
      softCap: new BigNumber('10000000000000000000'),
      hardCap: new BigNumber('30000000000000000000'),
      startTime: new BigNumber(1691403047),
      purchaseStartTime: new BigNumber(1691403047),
      purchaseEndTime: new BigNumber(1691424647),
      claimStartTime: new BigNumber(1691424647), //
      claimEndTime: new BigNumber(1693526400),
      baseToken: 'ETH',
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
  ],
}
