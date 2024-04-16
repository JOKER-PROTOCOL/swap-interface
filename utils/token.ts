import { Address, useContractRead } from 'wagmi'
import { Token } from 'sdk/tokens'
import { utils } from 'web3'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'

import { V2_FACTORY_ADDRESSES, INIT_CODE_HASH } from 'constants/chains'
import { NATIVE_TOKEN, WRAPPED_TOKEN_ADDRESS } from 'constants/token'

export const toV2LiquidityToken = ([tokenA, tokenB]: [Token, Token]): Token => {
  return new Token(
    tokenA.chainId,
    getCreate2Address(
      V2_FACTORY_ADDRESSES[tokenA.chainId],
      keccak256(
        ['bytes'],
        [pack(['address', 'address'], [tokenA.address, tokenB.address])],
      ),
      // @ts-ignore
      INIT_CODE_HASH[token0.chainId],
    ),
    18,
    'ZKSync-V2',
  )
}

export const getSortedTokenPair = ({
  token1,
  token2,
}: {
  token1: Token
  token2: Token
}): { addr?: string; tokens?: Token[] } => {
  const { address: tokenAddr1 } = token1 || {}
  const { address: tokenAddr2 } = token2 || {}
  const sorted = token1?.sortsBefore?.(token2)

  if (tokenAddr1 === tokenAddr2) {
    return {}
  }

  let _addr = sorted
    ? `${tokenAddr1}:${tokenAddr2}`
    : `${tokenAddr2}:${tokenAddr1}`
  let _tokens: [Token, Token] = sorted ? [token1, token2] : [token2, token1]

  return {
    addr: _addr,
    tokens: _tokens,
  }
}

export const getSortedTokenPairV2 = ({
  token1,
  token2,
}: {
  token1: Token
  token2: Token
}): { addr?: string; tokens?: Token[]; sorted: boolean } => {
  const { address: tokenAddr1 } = token1 || {}
  const { address: tokenAddr2 } = token2 || {}
  const sorted = token1?.address?.toLowerCase() < token2?.address?.toLowerCase()

  if (tokenAddr1 === tokenAddr2) {
    return {}
  }

  let _addr = sorted
    ? `${tokenAddr1}:${tokenAddr2}`
    : `${tokenAddr2}:${tokenAddr1}`
  let _tokens: [Token, Token] = sorted ? [token1, token2] : [token2, token1]

  return {
    addr: _addr,
    tokens: _tokens,
    sorted,
  }
}

export const isNativeToken = (token: Token) => {
  const { chainId, address } = token || {}
  return address === NATIVE_TOKEN[chainId]?.address
}

export const isWrappedToken = (token: Token) => {
  const { chainId, address } = token || {}
  const currChainWrappedAddr = WRAPPED_TOKEN_ADDRESS[chainId]

  return (
    currChainWrappedAddr &&
    utils?.toChecksumAddress(address) ===
      utils?.toChecksumAddress(currChainWrappedAddr)
  )
}
