import { createWalletClient, custom, Address } from 'viem'
import { mainnet } from 'viem/chains'
import { CONNECT_WALLET_ONLY_CHAINS } from 'constants/chains'

type Props = {
  address: Address
  symbol: string
  decimals?: number
  image?: string
}

export const addTokenOkx = ({
  address,
  symbol,
  decimals = 18,
  image,
}: Props) => {
  okxwallet
    ?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    })
    .then(success => {
      if (success) {
        console.log(`${symbol} successfully added to wallet!`)
      } else {
        throw new Error('addTokenOkx failed.')
      }
    })
    .catch(console.error)
}

export const addTokenCommon = ({
  address,
  symbol,
  decimals = 18,
  image,
}: Props) => {
  const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window?.ethereum!),
  })

  walletClient
    .watchAsset({
      type: 'ERC20',
      options: {
        address,
        decimals,
        symbol,
        image,
      },
    })
    .then(success => {
      if (success) {
        console.log(`${symbol} successfully added to wallet!`)
      } else {
        throw new Error('addTokenCommon failed.')
      }
    })
    .catch(console.error)
}
