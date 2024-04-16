// noinspection TypeScriptValidateTypes
import { useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'
import '@rainbow-me/rainbowkit/styles.css'
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  okxWallet,
  coinbaseWallet,
  injectedWallet,
  walletConnectWallet,
  phantomWallet,
  bitgetWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, useChainId, WagmiConfig } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

import {
  CONNECT_WALLET_ONLY_CHAINS,
  ChainId,
  SUBGRAPH_URI_MAP,
} from 'constants/chains'
import { INFURA_API_KEY, PROJECT_ID } from 'constants/apiKey'
import Layout from './Layout'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

export const client1 = new ApolloClient({
  uri: SUBGRAPH_URI_MAP[ChainId.ZKSYNC_TESTNET],
  cache: new InMemoryCache(),
  ssrMode: true,
})

const clientMapping = Object.keys(SUBGRAPH_URI_MAP).reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: new ApolloClient({
      uri: SUBGRAPH_URI_MAP[cur as unknown as keyof typeof SUBGRAPH_URI_MAP],
      cache: new InMemoryCache(),
      ssrMode: true,
    }),
  }
}, {})

// {
//   [ChainId.MERLIN_TESTNET]: client2,
//   [ChainId.ZKSYNC_TESTNET]: client1,
// }

import 'react-toastify/dist/ReactToastify.css'

type AuthenticationStatus = 'loading' | 'authenticated' | 'unauthenticated'

const swrConfig = {
  revalidateOnFocus: false,
  dedupingInterval: 800, // 2s
  shouldRetryOnError: false,
  errorRetryCount: 0,
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...CONNECT_WALLET_ONLY_CHAINS],
  [publicProvider(), infuraProvider({ apiKey: INFURA_API_KEY })],
)

// we need a proper projectId here to avoid error https://github.com/rainbow-me/rainbowkit/discussions/1471
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      okxWallet({ chains, projectId: PROJECT_ID }),
      metaMaskWallet({
        chains,
        projectId: PROJECT_ID,
      }),
      trustWallet({ chains, projectId: PROJECT_ID }),
      coinbaseWallet({ chains, appName: PROJECT_ID }),
      phantomWallet({ chains }),
      bitgetWallet({ projectId: PROJECT_ID, chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ projectId: PROJECT_ID, chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const MyApp = ({ children, ...props }: any) => {
  const chainId = useChainId()

  const baseLayout = useMemo(
    () => (
      <RainbowKitProvider
        appInfo={{
          appName: 'Async',
        }}
        chains={chains}
      >
        <SWRConfig value={swrConfig}>
          <Layout {...props}>
            <>
              <ToastContainer />
              {children}
            </>
          </Layout>
        </SWRConfig>
      </RainbowKitProvider>
    ),
    [chains, children],
  )
  useEffect(() => {
    console.log('111 in AppLayout')
  }, [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <ApolloProvider client={clientMapping[chainId] || client1}>
        {baseLayout}
      </ApolloProvider>
    </WagmiConfig>
  )
}

export default MyApp
