import { Address, useContractRead } from 'wagmi'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import router02Abi from 'abis/v2/router02'
import { getDecimalAmount } from 'utils/formatBalance'

// export const useGetAmountOut = ({
//   liquidityAddress,
//   amountOutParams,
// }: {
//   liquidityAddress: Address
//   amountOutParams: {
//     valueIn: string
//     reserveIn: BigNumber
//     reserveOut: BigNumber
//     onSuccess?: (val: any) => void
//   }
// }) => {
//   const [amountOut, setAmountOut] = useState(new BigNumber(0))
//   const { valueIn, reserveIn, reserveOut, onSuccess } = amountOutParams || {}
//   const amountIn = getDecimalAmount(new BigNumber(valueIn))

//   // input_amount A / B = getAmountOut(input_amount B / A)
//   const { data, status } = useContractRead({
//     address: liquidityAddress,
//     abi: router02Abi,
//     functionName: 'getAmountOut',
//     args: [amountIn, reserveIn, reserveOut],
//     onSuccess(data) {
//       onSuccess?.(data)
//     },
//     onError(err) {
//       console.log('getAmountOut err', err)
//     },
//   })

//   useEffect(() => data && setAmountOut(new BigNumber(data)), [data])

//   return { amountOut, status }
// }

// amounts
export const useGetAmountsOut = ({
  liquidityAddress,
  amountOutParams,
}: {
  liquidityAddress: Address
  amountOutParams: {
    valueIn: string
    path: Array<Address>
    onSuccess?: (val: any) => void
    decimals: number
  }
}) => {
  const [amountOut, setAmountOut] = useState(new BigNumber(0))
  const { valueIn, path, onSuccess, decimals } = amountOutParams || {}
  const amountIn = getDecimalAmount(new BigNumber(valueIn), decimals)

  const { data, status, error } = useContractRead({
    address: liquidityAddress,
    abi: router02Abi,
    functionName: 'getAmountsOut',
    args: [amountIn, path],
    onSuccess(data) {
      console.log('getAmountsOut res', data)

      onSuccess?.(data)
    },
    onError(err) {
      console.log('getAmountsOut err', err)
    },
  })

  useEffect(() => data && setAmountOut(new BigNumber(data[1])), [data])

  return { amountOut, status, error }
}

// amount in
// export const useGetAmountIn = ({
//   liquidityAddress,
//   amountInParams,
// }: {
//   liquidityAddress: Address
//   amountInParams: {
//     valueOut: string
//     reserveIn: BigNumber
//     reserveOut: BigNumber
//     onSuccess?: (val: any) => void
//   }
// }) => {
//   const [amountIn, setAmountIn] = useState(new BigNumber(0))
//   const { valueOut, reserveIn, reserveOut, onSuccess } = amountInParams || {}
//   const amountOut = getDecimalAmount(new BigNumber(valueOut))

//   // input_amount A / B = getAmountOut(input_amount B / A)
//   const { data, status } = useContractRead({
//     address: liquidityAddress,
//     abi: router02Abi,
//     functionName: 'getAmountIn',
//     args: [amountOut, reserveIn, reserveOut],
//     onSuccess(data) {
//       onSuccess?.(data)
//     },
//     onError(err) {
//       console.log('getAmountIn error', err)
//     },
//   })

//   useEffect(() => setAmountIn(new BigNumber(data)), [data])

//   return { amountIn, status }
// }

// amounts in
export const useGetAmountsIn = ({
  liquidityAddress,
  amountInParams,
}: {
  liquidityAddress: Address
  amountInParams: {
    valueOut: string
    path: Array[Address]
    decimals: number
    onSuccess?: (val: any) => void
  }
}) => {
  const [amountIn, setAmountIn] = useState(new BigNumber(0))
  const { valueOut, path, onSuccess, decimals } = amountInParams || {}
  const amountOut = getDecimalAmount(new BigNumber(valueOut), decimals)

  // input_amount A / B = getAmountOut(input_amount B / A)
  const { data, status, error } = useContractRead({
    address: liquidityAddress,
    abi: router02Abi,
    functionName: 'getAmountsIn',
    args: [amountOut, path],
    onSuccess(data) {
      console.log()
      console.log('getAmountsIn res', data)

      onSuccess?.(data)
    },
    onError(err) {
      console.log('getAmountsIn error', err)
    },
  })

  useEffect(() => setAmountIn(new BigNumber(data)), [data])

  return { amountIn, status, error }
}
