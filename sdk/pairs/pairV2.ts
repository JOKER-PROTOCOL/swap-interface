import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
// import // BigintIsh,
// CurrencyAmount,
// Price,
// sqrt,
// Token,
// '@uniswap/sdk-core'
import { Token } from '../tokens'
import { CurrencyAmount } from './CurrencyAmount'
import { Price } from './price'
import { sqrt } from './sqrt'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import {
  V2_FACTORY_ADDRESSES as FACTORY_ADDRESS,
  INIT_CODE_HASH,
} from 'constants/chains'


export declare type BigintIsh = JSBI | string | number

import { _997, _1000, FIVE, MINIMUM_LIQUIDITY, ONE, ZERO } from './constants'
import {
  InsufficientInputAmountError,
  InsufficientReservesError,
} from './errors'
import { Address } from 'wagmi'
import BigNumber from 'bignumber.js'
import { BIG_ZERO, BIG_FIVE } from 'utils/bigNumber'

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}): string => {
  const [token0, token1] = tokenA?.sortsBefore?.(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(
      ['bytes'],
      [pack(['address', 'address'], [token0.address, token1.address])],
    ),
    // @ts-ignore
    INIT_CODE_HASH[token0.chainId],
  )
}
export class PairV2 {
  public readonly liquidityToken: Token
  private readonly tokens: [Token, Token]
  public readonly totalSupply: BigNumber
  public readonly reserve0: BigNumber
  public readonly reserve1: BigNumber

  public static getAddress(tokenA: Token, tokenB: Token): string {
    // @ts-ignore
    return computePairAddress({
      factoryAddress: FACTORY_ADDRESS[tokenA.chainId],
      tokenA,
      tokenB,
    })
  }

  public constructor(
    pairAddress: Address,
    tokenList: [Token, Token],
    totalSupply?: BigNumber,
    reserves?: [BigNumber, BigNumber],
    // currencyAmountA: CurrencyAmount<Token>,
    // tokenAmountB: CurrencyAmount<Token>,
  ) {
    this.tokens = tokenList
    this.totalSupply = totalSupply || BIG_ZERO
    this.reserve0 = reserves ? reserves[0] : BIG_ZERO
    this.reserve1 = reserves ? reserves[1] : BIG_ZERO
    const [tokenA, tokenB] = tokenList
    this.liquidityToken = new Token(
      tokenA.chainId,
      pairAddress,
      tokenA.decimals,
      [tokenA.symbol, tokenB.symbol].join('/'),
    )
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  // public get token0Price(): Price<Token, Token> {
  //   const result = this.tokens[1].divide(this.tokens[0])
  //   return new Price(
  //     this.token0,
  //     this.token1,
  //     result.denominator,
  //     result.numerator,
  //   )
  // }

  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  // public get token1Price(): Price<Token, Token> {
  //   const result = this.tokenAmounts[0].divide(this.tokenAmounts[1])
  //   return new Price(
  //     this.token1,
  //     this.token0,
  //     result.denominator,
  //     result.numerator,
  //   )
  // }

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  // public priceOf(token: Token): Price<Token, Token> {
  //   invariant(this.involvesToken(token), 'TOKEN')
  //   return token.equals(this.token0) ? this.token0Price : this.token1Price
  // }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): number {
    return this.token0.chainId
  }

  public get token0(): Token {
    return this.tokens[0]
  }

  public get token1(): Token {
    return this.tokens[1]
  }

  // public get reserve0(): BigNumber {
  //   return this.reserve0
  // }

  // public get reserve1(): BigNumber {
  //   return this.reserve1
  // }

  public reserveOf(token: Token): BigNumber {
    invariant(this.involvesToken(token), 'TOKEN')
    const { symbol } = token
  
    return symbol === this.token0.symbol ? this.reserve0 : this.reserve1
  }

  // public getOutputAmount(
  //   inputAmount: CurrencyAmount<Token>,
  // ): [CurrencyAmount<Token>, Pair] {
  //   invariant(this.involvesToken(inputAmount.currency), 'TOKEN')
  //   if (
  //     JSBI.equal(this.reserve0.quotient, ZERO) ||
  //     JSBI.equal(this.reserve1.quotient, ZERO)
  //   ) {
  //     throw new InsufficientReservesError()
  //   }
  //   const inputReserve = this.reserveOf(inputAmount.currency)
  //   const outputReserve = this.reserveOf(
  //     inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
  //   )
  //   const inputAmountWithFee = JSBI.multiply(inputAmount.quotient, _997)
  //   const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient)
  //   const denominator = JSBI.add(
  //     JSBI.multiply(inputReserve.quotient, _1000),
  //     inputAmountWithFee,
  //   )
  //   const outputAmount = CurrencyAmount.fromRawAmount(
  //     inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
  //     JSBI.divide(numerator, denominator),
  //   )
  //   if (JSBI.equal(outputAmount.quotient, ZERO)) {
  //     throw new InsufficientInputAmountError()
  //   }
  //   return [
  //     outputAmount,
  //     new Pair(
  //       inputReserve.add(inputAmount),
  //       outputReserve.subtract(outputAmount),
  //     ),
  //   ]
  // }

  // public getInputAmount(
  //   outputAmount: CurrencyAmount<Token>,
  // ): [CurrencyAmount<Token>, Pair] {
  //   invariant(this.involvesToken(outputAmount.currency), 'TOKEN')
  //   if (
  //     JSBI.equal(this.reserve0.quotient, ZERO) ||
  //     JSBI.equal(this.reserve1.quotient, ZERO) ||
  //     JSBI.greaterThanOrEqual(
  //       outputAmount.quotient,
  //       this.reserveOf(outputAmount.currency).quotient,
  //     )
  //   ) {
  //     throw new InsufficientReservesError()
  //   }

  //   const outputReserve = this.reserveOf(outputAmount.currency)
  //   const inputReserve = this.reserveOf(
  //     outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
  //   )
  //   const numerator = JSBI.multiply(
  //     JSBI.multiply(inputReserve.quotient, outputAmount.quotient),
  //     _1000,
  //   )
  //   const denominator = JSBI.multiply(
  //     JSBI.subtract(outputReserve.quotient, outputAmount.quotient),
  //     _997,
  //   )
  //   const inputAmount = CurrencyAmount.fromRawAmount(
  //     outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
  //     JSBI.add(JSBI.divide(numerator, denominator), ONE),
  //   )
  //   return [
  //     inputAmount,
  //     new Pair(
  //       inputReserve.add(inputAmount),
  //       outputReserve.subtract(outputAmount),
  //     ),
  //   ]
  // }

  // public getLiquidityMinted(
  //   totalSupply: CurrencyAmount<Token>,
  //   tokenAmountA: CurrencyAmount<Token>,
  //   tokenAmountB: CurrencyAmount<Token>,
  // ): CurrencyAmount<Token> {
  //   invariant(totalSupply.currency.equals(this.liquidityToken), 'LIQUIDITY')
  //   const tokenAmounts = tokenAmountA.currency.sortsBefore(
  //     tokenAmountB.currency,
  //   ) // does safety checks
  //     ? [tokenAmountA, tokenAmountB]
  //     : [tokenAmountB, tokenAmountA]
  //   invariant(
  //     tokenAmounts[0].currency.equals(this.token0) &&
  //       tokenAmounts[1].currency.equals(this.token1),
  //     'TOKEN',
  //   )

  //   let liquidity: JSBI
  //   if (JSBI.equal(totalSupply.quotient, ZERO)) {
  //     liquidity = JSBI.subtract(
  //       sqrt(JSBI.multiply(tokenAmounts[0].quotient, tokenAmounts[1].quotient)),
  //       MINIMUM_LIQUIDITY,
  //     )
  //   } else {
  //     const amount0 = JSBI.divide(
  //       JSBI.multiply(tokenAmounts[0].quotient, totalSupply.quotient),
  //       this.reserve0.quotient,
  //     )
  //     const amount1 = JSBI.divide(
  //       JSBI.multiply(tokenAmounts[1].quotient, totalSupply.quotient),
  //       this.reserve1.quotient,
  //     )
  //     liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
  //   }
  //   if (!JSBI.greaterThan(liquidity, ZERO)) {
  //     throw new InsufficientInputAmountError()
  //   }
  //   return CurrencyAmount.fromRawAmount(this.liquidityToken, liquidity)
  // }

  public getLiquidityValue(
    token: Token,
    // totalSupply: CurrencyAmount<Token>,
    liquidity: BigNumber,
    feeOn = false,
    kLast?: BigNumber,
  ): BigNumber {
    // invariant(this.involvesToken(token), 'TOKEN')
    // invariant(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    // invariant(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY')
    // invariant(
    //   JSBI.lessThanOrEqual(liquidity.quotient, totalSupply.quotient),
    //   'LIQUIDITY',
    // )

    if (!liquidity || liquidity.isEqualTo(BIG_ZERO)) {
      return BIG_ZERO
    }

    let totalSupplyAdjusted: BigNumber
    if (!feeOn) {
      totalSupplyAdjusted = this.totalSupply
    } else {
      // invariant(!!kLast, 'K_LAST')
      // const kLastParsed = JSBI.BigInt(kLast)
      const kLastParsed = kLast ? new BigNumber(kLast) : BIG_ZERO
      if (!kLast?.isEqualTo(BIG_ZERO)) {
        const rootK = this.reserve0.multipliedBy(this.reserve1).squareRoot()
        // JSBI.multiply(this.reserve0.quotient, this.reserve1.quotient),

        const rootKLast = kLastParsed.squareRoot()
        if (rootK.isGreaterThan(rootKLast)) {
          const numerator = this.totalSupply.multipliedBy(
            rootK.minus(rootKLast),
          )
          const denominator = rootK.multipliedBy(BIG_FIVE).plus(rootKLast)
          const feeLiquidity = numerator.dividedBy(denominator)
          totalSupplyAdjusted = this.totalSupply.plus(feeLiquidity)
        } else {
          totalSupplyAdjusted = this.totalSupply
        }
      } else {
        totalSupplyAdjusted = this.totalSupply
      }
    }

    return liquidity.times(this.reserveOf(token)).dividedBy(totalSupplyAdjusted)
  }
}
