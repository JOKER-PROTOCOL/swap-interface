import { Address } from 'wagmi'
import { zkSyncTestnet } from 'wagmi/chains'
import { ChainId } from './chains'

interface ListItem {
  name: string
  symbol: string
  address: Address | string
  token: Address | string
  decimal: number
  chain: number
  network: string
  defaultApr: number
  iconUrl: string
}

interface StakingNetworkMapProps {
  [chainId: number]: ListItem[]
}

export const STAKING_NETWORK_MAP: StakingNetworkMapProps = {
  [ChainId.ZKSYNC_TESTNET]: [
    {
      name: 'ZKSyncTestnet-ZKD', // need to be unique
      symbol: 'ZKT',
      address: '0x5594C98D9b6071cd67dd0594ab2584e008F3E20B', // staking ZKT
      // TODO: get rewardToken from contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // ZKT
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      defaultApr: 3,
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
    {
      name: 'ZKSyncTestnet-ZKD2', // need to be unique
      symbol: 'ZKT',
      address: '0x5594C98D9b6071cd67dd0594ab2584e008F3E20B', // staking ZKT
      // TODO: get rewardToken from contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // ZKT
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      defaultApr: 3,
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
    {
      name: 'ZKSyncTestnet-ZKD3', // need to be unique
      symbol: 'ZKT',
      address: '0x5594C98D9b6071cd67dd0594ab2584e008F3E20B', // staking ZKT
      // TODO: get rewardToken from contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // ZKT
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      defaultApr: 3,
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
    {
      name: 'ZKSyncTestnet-ZKD4', // need to be unique
      symbol: 'ZKT',
      address: '0x5594C98D9b6071cd67dd0594ab2584e008F3E20B', // staking ZKT
      // TODO: get rewardToken from contract
      token: '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff', // ZKT
      decimal: 18,
      chain: zkSyncTestnet.id,
      network: zkSyncTestnet.name,
      defaultApr: 3,
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
    },
  ],
}
