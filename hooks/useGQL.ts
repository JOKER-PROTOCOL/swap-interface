import { useQuery } from '@apollo/client'
import BigNumber from 'bignumber.js'
import { useNetworkListStore } from 'dataStore/network'
import {
  ALL_PAIRS,
  DAI_QUERY,
  ETH_PRICE_QUERY,
  PAIRS_DAILY_INFO,
  PAIRS_INFO,
  MY_POSITION,
} from 'gql/dai'
import { useChainId } from 'wagmi'
import { utils } from 'web3'

export const useEthPriceQuery = () => {
  console.log('111 useEthPrice')
  const { loading, error, data } = useQuery(ETH_PRICE_QUERY)
  return { loading, error, data }
}

export const useMyPosition = id => {
  const { loading, error, data } = useQuery(MY_POSITION, {
    variables: {
      id,
    },
  })

  return { loading, error, data }
}

export const useAllPairs = () => {
  const { loading, error, data } = useQuery(ALL_PAIRS, {
    variables: {
      skip: 0,
    },
  })

  return { loading, error, data }
}

export const useAllPairsDailyInfo = () => {
  const { loading, error, data } = useQuery(PAIRS_DAILY_INFO)

  return { loading, error, data }
}

const getTVL = pairInfo => {
  const { reserve0, reserve1, token0Price, token1Price } = pairInfo || {}
  return +reserve0 * +token0Price + +reserve1 * +token1Price
}

const getLiquidity = pairInfo => {
  const { reserve0, reserve1, reserveUSD } = pairInfo || {}
  return new BigNumber(reserveUSD)
}

const getApy = pairDailyInfo => {
  const { dailyVolumeUSD, reserveUSD } = pairDailyInfo || {}
  const dailyVolumeUSDN = new BigNumber(dailyVolumeUSD)
  const reserveUSDN = new BigNumber(reserveUSD)

  if (reserveUSDN.isZero()) {
    return new BigNumber(0)
  }

  return dailyVolumeUSDN.multipliedBy(0.003 * 365 * 100).dividedBy(reserveUSDN)
}

export const usePairsInfoByIds = () => {
  const { data: { pairs = [] } = {} } = useAllPairs()
  const { data: { pairDayDatas = [] } = {} } = useAllPairsDailyInfo()

  const idList = pairs?.map(it => it.id) || []

  const {
    loading,
    error,
    data: { pairs: pairInfos = [] } = {},
  } = useQuery(PAIRS_INFO, {
    variables: {
      allPairs: idList,
    },
  })

  const pairsDailyInfoMapping = pairDayDatas.reduce((acc, obj) => {
    acc[obj.pairAddress] = obj
    return acc
  }, {})
  const pairInfoMapping = pairInfos.reduce((acc, obj) => {
    acc[obj.id] = {
      ...obj,
      tokenA: obj.token0,
      tokenB: obj.token1,
    }
    return acc
  }, {})

  const pairsInfo = pairs?.map(it => {
    const pairInfo = pairInfoMapping[it.id]
    const pairDailyInfo = pairsDailyInfoMapping[it.id]
    return {
      ...it,
      ...pairInfoMapping[it.id],
      tvl: getTVL(pairInfo),
      liquidity: getLiquidity(pairInfo),
      apy: getApy(pairDailyInfo),
    }
  })

  console.log(
    '111 id list1',
    pairsInfo,
    pairs,
    pairInfos,
    pairDayDatas,
    pairsDailyInfoMapping,
  )

  return { loading, error, data: pairsInfo }
}

const getTokenAddr = (token, nativeTokenMapping) => {
  if (token.isNative && nativeTokenMapping.wrap) {
    return nativeTokenMapping.wrap.address
  }
  return token.address
}

export const useGetPairContractAddressFromSubgraph = ({ tokenA, tokenB }) => {
  const { data: { pairs = [] } = {} } = useAllPairs()
  const { nativeTokenMapping } = useNetworkListStore()
  const chainId = useChainId()

  if (!tokenA || !tokenB || !pairs || !pairs.length) {
    return { pairContract: '' }
  }

  const addrTokenA = getTokenAddr(tokenA, nativeTokenMapping[chainId])
  const addrTokenB = getTokenAddr(tokenB, nativeTokenMapping[chainId])
  // const { address: addrTokenA } = tokenA || {}
  // const { address: addrTokenB } = tokenB || {}
  console.log('111 native mapping', nativeTokenMapping[chainId])

  const _pair = pairs.find(pair => {
    const { token0, token1 } = pair
    const { id: addrToken0 } = token0
    const { id: addrToken1 } = token1

    const sortedAddresses = [
      utils.toChecksumAddress(addrToken0),
      utils.toChecksumAddress(addrToken1),
    ].sort()
    const sortedTokens = [addrTokenA, addrTokenB].sort()

    if (
      sortedAddresses[0] === sortedTokens[0] &&
      sortedAddresses[1] === sortedTokens[1]
    ) {
      return true
    }
  })

  console.log('1111 useGetPairContractAddressFromSubgraph', _pair)
  // const pairContract = _pair ? utils.toChecksumAddress(_pair.id) : ''

  return _pair
}
