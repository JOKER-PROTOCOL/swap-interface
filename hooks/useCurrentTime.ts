import { useEffect, useState } from 'react'
import { useChainId, usePublicClient } from 'wagmi'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'

export const useCurrentTime = (chainId?: number) => {
  const _chainId = useChainId?.()

  const publicClient = usePublicClient({
    chainId: _chainId,
  })

  const [currTimestamp, setTime] = useState<BigNumber>(BIG_ZERO)

  useEffect(() => {
    publicClient
      .getBlock()
      .then(res => {
        setTime(new BigNumber(res?.timestamp))
      })
      .catch(e => console.log('useCurrentTime error:', e))
  }, [chainId])

  return currTimestamp
}
