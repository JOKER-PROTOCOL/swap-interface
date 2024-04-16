import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import { MaxUint256 } from 'utils/bigNumber'

export const useApproveToken = (
  tokenAddress,
  depositoryAddress,
  amount = MaxUint256,
) => {
  // noinspection TypeScriptValidateTypes
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [depositoryAddress, amount],
    onSuccess(data) {
      console.log('useApproveToken success', data)
    },
    onError(error) {
      console.log('useApproveToken error', error)
    },
  })

  return useContractWrite(config)
}
