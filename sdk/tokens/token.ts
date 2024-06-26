import invariant from 'tiny-invariant'
import { BaseCurrency } from './baseCurrency'
import { Currency } from './currency'

export interface SerializedToken {
  chainId: number
  address: `0x${string}`
  decimals: number
  symbol: string
  name?: string
  projectLink?: string
  logoURI?: string
}

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends BaseCurrency {
  public readonly isNative: boolean

  public readonly isToken: true = true as const

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: `0x${string}`

  public readonly projectLink?: string

  public readonly logoURI?: string

  public constructor(
    chainId: number,
    address: `0x${string}`,
    decimals: number,
    symbol: string,
    name?: string,
    isNative?: boolean,
    projectLink?: string,
    logoURI?: string,
  ) {
    super(chainId, decimals, symbol, name)
    this.address = address
    this.projectLink = projectLink
    this.logoURI = logoURI
    this.isNative = isNative || false
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address === other.address
    )
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    // invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    // invariant(this.address !== other.address, 'ADDRESSES')
    return this?.address?.toLowerCase() < other?.address?.toLowerCase()
  }

  // public sortsBeforeV2(tokenA: Token, tokenB:Token): boolean {
  //   // invariant(this.chainId === other.chainId, 'CHAIN_IDS')
  //   // invariant(this.address !== other.address, 'ADDRESSES')
  //   return tokenA?.address?.toLowerCase() < tokenB?.address?.toLowerCase()
  // }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }

  public get serialize(): SerializedToken {
    return {
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      projectLink: this.projectLink,
      logoURI: this.logoURI,
    }
  }
}
