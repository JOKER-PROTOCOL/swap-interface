import { ChainId } from '../chains'

export const PAGE_CONTENT_BY_NETWORK = {
  zkLink: {
    okx: {
      mainColor: 'zkLink',
      ctaTitle: `WELCOME TO <span class='text-zkLink'>CRYPTOPEDIA</span> EVENT!`,
      ctaDesc:
        'Mint Aurora now to enjoy endless waves of benefits including Genesis membership, token airdrops and many more!',
      detailTitle: 'ASYNC Network',
      detailSubTitle:
        'Web 3 Banking Simplified',
      detailDesc:
        'Unlock the power of your digital assets in the real world with ASYNC DeFi and ASYNC Visa Card',
    },
  },
}

export const CLAIM_CONTRACT = {
  [ChainId.MERLIN_TESTNET]: '0x27E435FF4871f3d69BC81aC2A7E38796bdA6e18A', // 
  [ChainId.ZKLINK_TESTNET]: '0x8B4e915d3967F71Fc4FD0f454dbb1f45C14066Ea',
  [ChainId.ZKLINK]: '0x36222703751732570D87C080506106272252D2Ac'
}

export const ASYNC_BOX_INFO = {
  [ChainId.ZKLINK_TESTNET]: {
    address: '0x178bE01d001C4aDd29C8c5Acd25CD336bdA6F1c5',
    decimals: 18,
    symbol: 'Aurora',
    image: 'https://raw.githubusercontent.com/Async-Finance/aurora/main/1.gif'
  },
  [ChainId.ZKLINK]: {
    address: '0xd4C8500Aeb4fb24f4aBEfED96AA92AbA5FFe4F3c',
    decimals: 18,
    symbol: 'Aurora',
    image: 'https://raw.githubusercontent.com/Async-Finance/aurora/main/1.gif'
  }
}