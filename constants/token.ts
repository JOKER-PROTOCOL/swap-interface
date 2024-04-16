import { Address } from 'wagmi'
import { ChainId } from './chains'
import { Token } from 'sdk/tokens'

export const NATIVE_TOKEN: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    1,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'ETH',
    'Ethereum',
    true,
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    '0xE0c475b2b9DB03e97ffCFD0E0DC2FE72c4ade958',
    18,
    'ETH',
    'Ethereum',
    true,
  ),
  [ChainId.SCROLL_ALPHA_TESTNET]: new Token(
    ChainId.SCROLL_ALPHA_TESTNET,
    '0xA70E68d451fcC2F8f9e8D49540B9f83F391Aa825',
    18,
    'ETH',
    'Ethereum',
    true,
  ),
  [ChainId.LINEA_TESTNET]: new Token(
    ChainId.LINEA_TESTNET,
    '0x46816fc5903867CF5Fab11149F27639aD569C823',
    18,
    'ETH',
    'Ethereum',
    true,
  ),
  [ChainId.ZKSYNC_TESTNET]: new Token(
    ChainId.ZKSYNC_TESTNET,
    '0xDcFD668c3f1551A016fE30740f6832673a2D19ee',
    18,
    'ETH',
    'Ethereum',
    true,
    '',
    'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  ),
  [ChainId.MERLIN_TESTNET]: new Token(
    ChainId.MERLIN_TESTNET,
    '0xf911f8C42c3b1A0a0d76f62609460C35a2a6891b',
    18,
    'BTC',
    'Bitcoin',
    true,
    '',
    'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  ),
  [ChainId.ZKLINK_TESTNET]: new Token(
    ChainId.ZKLINK_TESTNET,
    '0x4E7689152401BF88cDD8f4DCa5a7df7d27a4bC42',
    18,
    'ETH',
    'Ethereum',
    true,
    '',
    'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  ),
  [ChainId.ZKLINK]: new Token(
    ChainId.ZKLINK,
    '0x961d50441D0AceC4C39c4589Ffe7513370b26a1a',
    18,
    'ETH',
    'Ethereum',
    true,
    '',
    'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  ),
  [ChainId.MERLIN]: new Token(
    ChainId.MERLIN,
    '0x3D8bafcAD95b93264D7fcfC6B351Dc547569F681',
    18,
    'BTC',
    'Bitcoin',
    true,
    '',
    'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  ),
}

export const WRAPPED_TOKEN_ADDRESS = {
  [ChainId.ZKLINK_TESTNET]: '0xCcf32Ff9319BF332e48F4b49957307b953A06da9', // weth
  [ChainId.MERLIN_TESTNET]: '0x319613a9b3839a47793990f86A39FdCeB6302d98', // wbtc
  [ChainId.ZKLINK]: '0x703d80Bb5C9C83186d8a5d7d81B21DEA8A5A1CdE', // weth
  [ChainId.MERLIN]: '0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA',
}

// 未连接钱包时的展示 list
export const DEFAULT_TOKEN_LIST = [
  {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    decimals: 18,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  },
  {
    name: 'WBTC',
    symbol: 'WBTC',
    decimals: 18,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png',
  },
]

export const NATIVE_LIQUIDITY_PAIRS: {
  [chainId in ChainId]: {
    [key: string]: Token[]
  }
} = {
  [ChainId.MAINNET]: {},
  [ChainId.SEPOLIA]: {
    '0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5;0xE0c475b2b9DB03e97ffCFD0E0DC2FE72c4ade958':
      [
        new Token(
          11155111,
          '0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5',
          18,
          'USDC',
          'USDC',
        ),
        new Token(
          11155111,
          '0xE0c475b2b9DB03e97ffCFD0E0DC2FE72c4ade958',
          18,
          'WETH',
          'Wrapped Ether',
        ),
      ],
  },
  [ChainId.SCROLL_ALPHA_TESTNET]: {},
  [ChainId.LINEA_TESTNET]: {},
  [ChainId.ZKSYNC_TESTNET]: {
    // Note: pair 根据 address 排序, 参考 subgraph
    // ZKT/ETH
    '0x0f9d21Da15e80909a724fec6F27a8d287Fdd22f6': [
      new Token(
        280,
        '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff',
        18,
        'ZKT',
        'ZKT',
      ),
      new Token(
        280,
        '0xDcFD668c3f1551A016fE30740f6832673a2D19ee',
        18,
        'ETH',
        'ETH',
      ),
    ],
    // DAI/ZKT
    '0x68273f39046ef5f20ebe55d3f9ea271f415fda19': [
      new Token(
        280,
        '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b',
        18,
        'DAI',
        'DAI',
      ),
      new Token(
        280,
        '0x62FC8cda6833E4d0D0632C3bC2F1C368e2cF65ff',
        18,
        'ZKT',
        'ZKT',
      ),
    ],
    // USDC/DAI
    '0x0cbf8ab2e118a140d74feb5e49f64f05af54be71': [
      new Token(
        280,
        '0x0faf6df7054946141266420b43783387a78d82a9',
        6,
        'USDC',
        'USDC',
      ),
      new Token(
        280,
        '0x3e7676937a7e96cfb7616f255b9ad9ff47363d4b',
        18,
        'DAI',
        'DAI',
      ),
    ],
  },
}
