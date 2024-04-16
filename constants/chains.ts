import {
  goerli,
  sepolia,
  zkSync,
  zkSyncTestnet,
  mainnet,
  arbitrum,
  bsc,
  polygon,
  optimism,
  okc,
} from 'wagmi/chains'
type AddressMap = { [chainId: number]: string }
import { defineChain } from 'viem'
import { isDev } from './env'

export enum ChainId {
  MAINNET = 1,
  ZKSYNC_TESTNET = 280,
  // ZK_ERA = 324,
  LINEA_TESTNET = 59140,
  SCROLL_ALPHA_TESTNET = 534353,
  SEPOLIA = 11155111,
  MERLIN = 4200,
  MERLIN_TESTNET = 686868,
  ZKLINK_TESTNET = 810182,
  ZKLINK = 810180,
}

export const merlin = defineChain({
  id: ChainId.MERLIN,
  iconUrl:
    'https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/chains/merlin.png',
  name: 'Merlin',
  network: 'merlin',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: { http: ['https://rpc.merlinchain.io'] },
    public: { http: ['https://rpc.merlinchain.io'] },
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://scan.merlinchain.io',
      apiUrl: 'https://scan.merlinchain.io/api',
    },
    etherscan: {
      name: 'blockscout',
      url: 'https://scan.merlinchain.io',
      apiUrl: 'https://scan.merlinchain.io/api',
    },
  },
})

export const merlinTestnet = defineChain({
  id: ChainId.MERLIN_TESTNET,
  name: 'MerlinTestnet',
  network: 'merlinTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.merlinchain.io'] },
    public: { http: ['https://testnet-rpc.merlinchain.io'] },
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://testnet-scan.merlinchain.io',
      apiUrl: 'https://testnet-scan.merlinchain.io//api',
    },
    etherscan: {
      name: 'blockscout',
      url: 'https://testnet-scan.merlinchain.io',
      apiUrl: 'https://testnet-scan.merlinchain.io//api',
    },
  },
})

export const zkLinkTestnet = defineChain({
  id: ChainId.ZKLINK_TESTNET,
  name: 'zkLink Nova Testnet',
  network: 'zkLink',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://goerli.rpc.zklink.io'] },
    public: { http: ['https://goerli.rpc.zklink.io'] },
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://goerli.explorer.zklink.io/',
    },
    etherscan: {
      name: 'blockscout',
      url: 'https://goerli.explorer.zklink.io/',
    },
  },
})

export const zkLink = defineChain({
  iconUrl:
    'https://docs.zklink.io/~gitbook/image?url=https:%2F%2F4205178306-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FFlYByKE7IRS1A10tIyDS%252Ficon%252FcKyCSSra0vrSWsp9Kuuf%252FGroup%25201410076638%2520%283%29.png%3Falt=media%26token=afc1b723-eda0-4838-be28-2bf676b24041&width=32&dpr=2&quality=100&sign=79806281d2847f6265f6dab0e6c47901de14aa8aa5a95ca4a631d047c1fb641a',
  id: ChainId.ZKLINK,
  name: 'zkLink Nova',
  network: 'zkLink',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.zklink.io'] },
    public: { http: ['https://rpc.zklink.io'] },
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://explorer.zklink.io',
    },
    etherscan: {
      name: 'blockscout',
      url: 'https://explorer.zklink.io',
    },
  },
})

console.log('isDev', isDev)

export const CONNECT_WALLET_ONLY_CHAINS = isDev
  ? [
      zkLink,
      merlin,
      merlinTestnet,
      zkLinkTestnet,
      {
        ...zkSync,
        iconUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
      },
    ]
  : [zkLink, merlin]

const CHAINS = [
  {
    ...mainnet,
    iconUrl: '',
  },
  {
    ...zkSync,
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
  },
  // {
  //   ...zkSyncTestnet,
  //   iconUrl:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
  // },
  {
    ...sepolia,
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
  },
  {
    ...goerli,
    iconUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliywvVrr2koSgQn-blD156cb_AYYzdH79jK-4PQtkKQ&s',
  },
  {
    ...arbitrum,
    iconUrl: '',
  },
  {
    ...bsc,
    iconUrl: '',
  },
  {
    ...polygon,
    iconUrl: '',
  },
  {
    ...optimism,
    iconUrl: '',
  },
  {
    ...okc,
    iconUrl: '',
  },
]

// export const SEPOLIA_LIST =
//   'https://raw.githubusercontent.com/JOKER-PROTOCOL/tokens/main/sepolia.tokenlist.json'
// export const SCROLL_ALPHA_LIST =
//   'https://raw.githubusercontent.com/JOKER-PROTOCOL/tokens/main/scroll.testnet.tokenlist.json'
// export const LINEA_ALPHA_LIST =
//   'https://raw.githubusercontent.com/JOKER-PROTOCOL/tokens/main/linea.testnet.tokenlist.json'
// export const ZKSYNC_TESTNET_LIST =
//   'https://raw.githubusercontent.com/JOKER-PROTOCOL/tokens/main/zksync.testnet.tokenlist.json'

export const MERLIN_TESTNET =
  'https://raw.githubusercontent.com/Async-Finance/tokens/main/merlin.testnet.tokenlist.json'

export const MERLIN =
  'https://raw.githubusercontent.com/Async-Finance/tokens/main/merlin.tokenlist.json'

export const ZKLINK_TESTNET_LIST =
  'https://raw.githubusercontent.com/Async-Finance/tokens/main/zklink.testnet.tokenlist.json'

export const ZKLINK_LIST =
  'https://raw.githubusercontent.com/Async-Finance/tokens/main/zklink.tokenlist.json'

export const DEFAULT_TOKEN_URL_LIST = [
  // SEPOLIA_LIST,
  // SCROLL_ALPHA_LIST,
  // LINEA_ALPHA_LIST,
  // ZKSYNC_TESTNET_LIST,
  MERLIN_TESTNET,
  ZKLINK_TESTNET_LIST,
  ZKLINK_LIST,
  MERLIN,
]

export const V2_FACTORY_ADDRESSES: AddressMap = {
  // ...constructSameAddressMap(V2_FACTORY_ADDRESS[1111555111]),
  [ChainId.SEPOLIA]: '0x0C5E5EA9d4772c6f30f5b846b671C3b5Ea29e3dE',
  [ChainId.SCROLL_ALPHA_TESTNET]: '0x7C4feAc45a8ff72233096F3b04fe5D4bdA234baA',
  [ChainId.ZKSYNC_TESTNET]: '0xEAcc0f6D5850074B9F239FD1989641574dc06a02',
  [ChainId.MERLIN_TESTNET]: '0x7B836444fcd7D1cB1a1e97c49729Df6243Be7656',
  [ChainId.ZKLINK_TESTNET]: '0x3fEddB753e5c8201c5D674E1AE419A8F9B6909A4',
  [ChainId.ZKLINK]: '0xE82a58d593e608275c659BAe51B4D20b85FE3F10',
  [ChainId.MERLIN]: '0xEa51E2E458aE7Cb921d47fC463Ac4fED7ae65a41',
}

export const INIT_CODE_HASH = {
  // [ChainId.ZK_ERA]: '', // fixme
  [ChainId.ZKSYNC_TESTNET]:
    '0x5b0ed96409002bd842fb407bd3ee8872d40b0487dcf858c51f564f6f92203a46',
  [ChainId.LINEA_TESTNET]:
    '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.SCROLL_ALPHA_TESTNET]:
    '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  [ChainId.SEPOLIA]:
    '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
}

const CONTRACT_ROUTER02: { [key: number]: string } = {
  [zkSync.id]: '',
  [zkSyncTestnet.id]: '0xDcFD668c3f1551A016fE30740f6832673a2D19ee', // old: 0xDA4E938eFc78b98D0D7F007F545B960aB4691469
  [sepolia.id]: '',
  [goerli.id]: '',
  [ChainId.MERLIN_TESTNET]: '0xf911f8C42c3b1A0a0d76f62609460C35a2a6891b',
  [ChainId.ZKLINK_TESTNET]: '0x4E7689152401BF88cDD8f4DCa5a7df7d27a4bC42',
  [ChainId.ZKLINK]: '0x961d50441D0AceC4C39c4589Ffe7513370b26a1a',
  [ChainId.MERLIN]: '0x3D8bafcAD95b93264D7fcfC6B351Dc547569F681',
}

const CONTRACT_FACTORY: { [key: number]: string } = {
  [zkSync.id]: '',
  [zkSyncTestnet.id]: '0xEAcc0f6D5850074B9F239FD1989641574dc06a02', // old: '0xc457be4CB96Fa4Ed612DA41fb9F4f86B3606911f',
  [sepolia.id]: '',
  [goerli.id]: '',
  [ChainId.MERLIN_TESTNET]: '0x7B836444fcd7D1cB1a1e97c49729Df6243Be7656',
  [ChainId.ZKLINK_TESTNET]: '0x3fEddB753e5c8201c5D674E1AE419A8F9B6909A4',
  [ChainId.ZKLINK]: '0xE82a58d593e608275c659BAe51B4D20b85FE3F10',
  [ChainId.MERLIN]: '0xEa51E2E458aE7Cb921d47fC463Ac4fED7ae65a41',
}

const CONTRACT_MULTICALL: { [key: number]: string } = {
  [zkSync.id]: '',
  // [zkSyncTestnet.id]: '0x88495e37572D0bE88E36669C2d0Ba38C3fA06E7A',
  [sepolia.id]: '',
  [goerli.id]: '',
}

const BASE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const SUBGRAPH_URI_MAP = {
  [ChainId.MERLIN_TESTNET]:
    'https://dev-merlin-testnet.graph.async.finance/subgraphs/name/samuel/v2-test-merlin',
  [ChainId.ZKSYNC_TESTNET]:
    'https://api.thegraph.com/subgraphs/name/lbhsot/v2-zk-test',
  [ChainId.ZKLINK]:
    'https://zklink.graph.async.finance/subgraphs/name/async/swap',
  [ChainId.ZKLINK_TESTNET]:
    'https://dev-zklink-testnet.graph.async.finance/subgraphs/name/samuel/zklink-testnet-v2',
  [ChainId.MERLIN]:
    'https://merlin.graph.async.finance/subgraphs/name/async/swap',
}

export {
  CHAINS,
  CONTRACT_ROUTER02,
  CONTRACT_FACTORY,
  CONTRACT_MULTICALL,
  BASE_TOKEN_ADDRESS,
  SUBGRAPH_URI_MAP,
}
