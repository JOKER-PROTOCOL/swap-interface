import { useEffect, useState, useMemo } from 'react'
import { useNetwork } from 'wagmi'

import { DEFAULT_TOKEN_URL_LIST } from 'constants/chains'

import { get } from 'utils/http'
import { isAddress } from 'utils/address'
import { NATIVE_TOKEN, DEFAULT_TOKEN_LIST } from 'constants/token'

import { IToken } from 'types/token'
import { Token } from 'sdk/tokens'
import { useNetworkListStore } from 'dataStore/network'

export const useTokensByNetwork = () => {
  const { networkList: list } = useNetworkListStore()
  const { chain } = useNetwork()

  const nativeToken: Token | null = chain?.id
    ? NATIVE_TOKEN[chain.id as keyof typeof NATIVE_TOKEN]
    : null

  const tokens = useMemo(() => {
    const matchedNetwork = list?.find(item => item?.chainId === chain?.id)
    return chain?.id
      ? [nativeToken].concat(matchedNetwork?.tokens || [])
      : DEFAULT_TOKEN_LIST
  }, [chain?.id, list, nativeToken])

  return tokens
}

const getTokenFilter = (query: string) => {
  const searchingAddress = isAddress(query)

  if (searchingAddress) {
    const address = searchingAddress.toLowerCase()
    return t => 'address' in t && address === t.address.toLowerCase()
  }

  const queryParts = query
    .toLowerCase()
    .split(/\s+/)
    .filter(s => s.length > 0)

  if (queryParts.length === 0) return () => true

  const match = (s: string): boolean => {
    const parts = s
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0)

    return queryParts.every(
      p =>
        p.length === 0 || parts.some(sp => sp.startsWith(p) || sp.endsWith(p)),
    )
  }
  return ({ name, symbol }): boolean =>
    Boolean((symbol && match(symbol)) || (name && match(name)))
}

export const useTokensByQuery = (
  query: string,
  tokenList: Array<IToken>,
): Array<IToken> => {
  //   const tokenList = useTokensByNetwork()
  //   console.log('11111', tokenList.filter(getTokenFilter(query)))
  return useMemo(() => {
    return tokenList.filter(getTokenFilter(query))
  }, [tokenList, query])
}
