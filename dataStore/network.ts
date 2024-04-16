import { DEFAULT_TOKEN_URL_LIST } from 'constants/chains'
import { create } from 'zustand'
import { Token } from 'sdk/tokens'
import { get } from 'utils/http'

type INetwork = {
  name: string
  logoUrI: string
  tokens: Token[]
  timestamp: string
  chainId: number | string
  network: string
}
type ITokenList = {
  networkList: INetwork[]
  ethPrice: string
  nativeTokenMapping: any
  // getTokenList: () => Token[]
  updateNetworkList: () => void
}

export const useNetworkListStore = create<ITokenList>()(set => ({
  networkList: [],
  ethPrice: '0',
  // getTokenList: () => {
  //     return ''
  // },
  nativeTokenMapping: {},
  updateNetworkList: async () => {
    const networkInfoList = await Promise.all(DEFAULT_TOKEN_URL_LIST.map(get))
    const _nativeTokenMapping = {}

    const list = networkInfoList
      .map((it, idx) => {
        const network = DEFAULT_TOKEN_URL_LIST[idx]
        const { tokens = [] } = it || {}
        const { chainId } = tokens[0] || {}
        //   console.log(network, chainId, tokens)
        const _tokenMapping = { wrap: null }
        tokens.forEach(token => {
          if (token.isWrapToken) {
            _tokenMapping.wrap = token
          }
        })
        _nativeTokenMapping[chainId] = _tokenMapping
        return { ...it, network, chainId }
      })
      .filter(info => !!info.tokens)
    console.log('222 _nativeTokenMapping', _nativeTokenMapping)
    set(() => ({
      networkList: list,
      nativeTokenMapping: _nativeTokenMapping,
    }))
  },
  updateEthPrice: async () => {},
}))
