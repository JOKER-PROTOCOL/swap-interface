import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  Address,
  erc20ABI,
  useAccount,
  useNetwork,
  useContractRead,
  useContractReads,
  useBalance,
} from 'wagmi'
import { BIG_ZERO } from 'utils/bigNumber'
import { NATIVE_TOKEN } from 'constants/token'
import { Token } from 'sdk/tokens'
import { isNativeToken } from 'utils/token'

export const useTokenBalance = ({
  tokenAddress,
  watch = true,
}: {
  tokenAddress: Address
  watch?: boolean
}) => {
  const { address: account } = useAccount()
  const { chain } = useNetwork()

  // noinspection TypeScriptValidateTypes
  const { data, status,refetch, ...rest } = useContractRead({
    chainId: chain?.id,
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [account],
    enabled: !!account,
    watch,
  })

  return {
    ...rest,
    fetchStatus: status,
    refetch,
    balance: useMemo(
      () =>
        typeof data !== 'undefined' ? new BigNumber(data.toString()) : BIG_ZERO,
      [data],
    ),
  }
}

export const useTokensBalance = ({
  tokenAddressList,
}: {
  tokenAddressList: Address[]
}) => {
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const args =
    tokenAddressList?.map((addr: Address) => ({
      // chainId: chain?.id,
      abi: erc20ABI,
      address: addr,
      functionName: 'balanceOf',
      args: [account],
      enabled: !!account,
      watch: true,
    })) || []
  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: args,
  })

  return { data, isError, isLoading ,refetch}
}

export const useNativeCurrency = () => {
  const { address } = useAccount()

  const { data } = useBalance({
    address,
    watch: true,
  })

  return {
    data,
    balance:
      typeof data !== 'undefined'
        ? new BigNumber(data.value.toString())
        : BIG_ZERO,
  }
}

export const useTokenBalanceV2 = (token: Token | undefined) => {
  const isETH = isNativeToken(token)

  const balanceNative = useNativeCurrency()

  const balanceV1 = useTokenBalance({
    tokenAddress: !isETH && token?.address ? token.address : '',
    watch: true,
  })

 
  return useMemo(() => {
    if (!token) {
      return { balance: BIG_ZERO }
    }
    return isETH ? balanceNative : balanceV1
  }, [token, isETH, balanceNative, balanceV1])
}
