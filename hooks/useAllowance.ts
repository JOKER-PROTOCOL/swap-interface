import { Address, erc20ABI, useContractRead } from 'wagmi'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useToken } from './useToken'

export function useAllowance(
  watch: boolean,
  address?: string,
  owner?: string,
  spender?: string
) {
  const token = useToken(address);
  const args = useMemo(() => [owner, spender] as [Address, Address], [owner, spender])
  // noinspection TypeScriptValidateTypes
  const data = useContractRead({
    address: token ? (token.address as Address) : undefined,
    abi: erc20ABI,
    functionName: 'allowance',
    args,
    watch: true,
    enabled: !!token,
  })

  const amount = data?.data !== undefined && token ? new BigNumber(data?.data.toString()) : undefined

  return useMemo(
    () => ({
      ...data,
      data: amount,
      isApproved: data?.data ? data.data > 0 : false,
    }),
    [amount, data]
  )
}
