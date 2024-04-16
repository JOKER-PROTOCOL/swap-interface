import gql from 'graphql-tag'

export const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

export const ALL_PAIRS = gql`
  query pairs($skip: Int!) {
    pairs(
      first: 500
      skip: $skip
      orderBy: trackedReserveETH
      orderDirection: desc
    ) {
      id
      token0 {
        id
        symbol
        name
        decimals
        __typename
      }
      token1 {
        id
        symbol
        name
        decimals
        __typename
      }
      __typename
    }
  }
`

export const PAIRS_INFO = gql`
  fragment PairFields on Pair {
    id
    txCount
    token0 {
      id
      symbol
      name
      decimals
      totalLiquidity
      derivedETH
      __typename
    }
    token1 {
      id
      symbol
      name
      decimals
      totalLiquidity
      derivedETH
      __typename
    }
    reserve0
    reserve1
    reserveUSD
    totalSupply
    trackedReserveETH
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    token0Price
    token1Price
    createdAtTimestamp
    __typename
  }
  query pairs($allPairs: [Bytes]!) {
    pairs(
      first: 500
      where: { id_in: $allPairs }
      orderBy: trackedReserveETH
      orderDirection: desc
    ) {
      ...PairFields
      __typename
    }
  }
`

export const PAIRS_DAILY_INFO = gql`
  query PairsDailyInfo {
    pairDayDatas {
      dailyVolumeUSD
      id
      dailyVolumeToken1
      dailyVolumeToken0
      pairAddress
      date
      reserveUSD
    }
  }
`

export const TOKENS_100 = gql`
  query tokens {
    uniswapFactories(first: 100) {
      id
      pairCount
      totalVolumeUSD
      totalVolumeETH
    }
    tokens(first: 100) {
      id
      symbol
      name
      decimals
    }
  }
`

export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundles {
      ethPrice
    }
  }
`

export const MY_POSITION = gql`
  query myPosition($id: Bytes!) {
    users(where: { id: $id }) {
      liquidityPositions {
        id
        liquidityTokenBalance
        pair {
          token1 {
            id
            name
            symbol
            decimals
            totalLiquidity
            totalSupply
            tradeVolume
            tradeVolumeUSD
          }
          token0 {
            id
            name
            symbol
            decimals
            totalLiquidity
            totalSupply
            tradeVolume
            tradeVolumeUSD
          }
          reserve0
          reserve1
          reserveETH
          reserveUSD
          totalSupply
        }
      }
    }
  }
`
