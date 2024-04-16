import React from 'react'
import {
  LaunchpadF,
  SwapF,
  LiquidityF,
  StakingF,
  PortfolioF,
  DocsF,
  CardF,
  MerchantsF,
  ReferralF,
} from 'icons'

const SIZE = '20px'

export const DEFAULT_DISPLAY_DECIMAL = 8

export const SIDEBAR_MENU = [
  {
    getIcon: (active: boolean) => (
      <SwapF
        size={SIZE}
        className='mr-4'
        color={active ? 'text-white' : 'text-disabled'}
      />
    ),
    key: 'Swap',
    url: '/swap',
  },
  {
    getIcon: (active: boolean) => (
      <LiquidityF
        size={SIZE}
        className='mr-4'
        color={active ? 'text-white' : 'text-disabled'}
      />
    ),
    key: 'Liquidity Pool',
    url: '/liquidity',
  },
]

export const PROJECT_NAME = 'ASYNC'

// 0.5%
export const AUTO_SLIPPAGE = '0.5'

export const SOCIAL_LINK = {
  TWITTER: 'https://twitter.com/AsyncFinance',
  TG_CHANNEL: 'https://t.me/+oHKP3LlFAzI1ZmI1',
  TG_GROUP: 'https://t.me/+oHKP3LlFAzI1ZmI1',
  MEDIUM: 'https://medium.com/@AsyncFinance',
  // 'https://medium.com/@dc_68757/async-finance-web-3-banking-simplified-5784c2798765',
  DISCORD: 'https://discord.gg/BQ2Wqmpqds',
}
