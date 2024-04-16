import { useAccount, useNetwork, useToken as useToken_ } from 'wagmi'
import { Address, isAddress } from 'viem'
import { useMemo } from 'react'
import { ERC20Token } from '../sdk/tokens/ERC20Token'
import { useAllowance } from './useAllowance'
import BigNumber from 'bignumber.js'
import { getDecimalAmount } from 'utils/formatBalance'

export function useToken(tokenAddress?: string): ERC20Token | undefined | null {
  const { chain } = useNetwork()
  const _isAddress = useMemo(
    () => isAddress(tokenAddress || ''),
    [tokenAddress],
  )

  // noinspection TypeScriptValidateTypes
  const { data, isLoading } = useToken_({
    address: _isAddress ? tokenAddress : undefined,
    chainId: chain?.id,
    enabled: _isAddress,
  })

  return useMemo(() => {
    if (!_isAddress) return undefined
    if (isLoading) return null
    if (data && chain) {
      return new ERC20Token(
        chain.id,
        data.address,
        data.decimals,
        data.symbol ?? 'UNKNOWN',
        data.name ?? 'Unknown Token',
      )
    }
    return undefined
  }, [_isAddress, chain, data, isLoading])
}

export const useIsApprovedEnough = (
  tokenAddress: Address,
  value: BigNumber,
  spender: Address,
  decimal = 18,
  
) => {
  const { address } = useAccount()
  const { data: allowance, isApproved } = useAllowance(
    true,
    tokenAddress,
    address,
    spender,
  )
  
  const convertedDecimalAmount = value
    ? getDecimalAmount(value, decimal)
    : undefined

  const isApprovedEnough =
    isApproved && allowance?.isGreaterThanOrEqualTo(convertedDecimalAmount)

  return { isApprovedEnough,allowance,isApproved }
}
