import { ChainId } from './chains'
// import { zkSyncTestnet } from 'wagmi/chains'

export const SWAP_NETWORK_MAP = {
  [ChainId.ZKSYNC_TESTNET]: {
    contractAddress: '0xDcFD668c3f1551A016fE30740f6832673a2D19ee',
  },
  [ChainId.MERLIN_TESTNET]: {
    contractAddress: '0xf911f8C42c3b1A0a0d76f62609460C35a2a6891b',
  },
  [ChainId.MERLIN]: {
    contractAddress: '0x3D8bafcAD95b93264D7fcfC6B351Dc547569F681',
  },
  [ChainId.ZKLINK_TESTNET]: {
    contractAddress: '0x4E7689152401BF88cDD8f4DCa5a7df7d27a4bC42',
  },
  [ChainId.ZKLINK]: {
    contractAddress: '0x961d50441D0AceC4C39c4589Ffe7513370b26a1a',
  },
}

