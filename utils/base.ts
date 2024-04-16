import { toast } from 'react-toastify'
import { Token } from 'sdk/tokens'
import { Address } from 'wagmi'

export const EmptyFn = () => {}

const dev = process.env.NODE_ENV !== 'production'

export const baseUrl = dev
  ? 'https://api-dev.async.finance'
  : 'https://api.async.finance'

export const parseUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) {
    return `${baseUrl}${path}`
  }
  return `${baseUrl}/${path}`
}

export const httpStatusErrorInterceptor = ({ response, responseData }: any) => {
  const { status, url } = response
  const { detail } = responseData
  const isAsyncApi = url?.includes('async.finance')

  if (isAsyncApi && status !== 200 && status !== 204 && status !== 401) {
    let errorMessage = 'Something went wrong, please try again later.'

    if (detail && typeof detail === 'string') errorMessage = detail
    else if (Array.isArray(detail) && detail[0]?.msg)
      errorMessage = detail[0]?.msg

    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }
}

export const convertToToken = ({
  chainId,
  address,
  decimals = 18,
  symbol,
}: {
  chainId: number
  address: Address
  decimals: number
  symbol: string
}) => {
  if (!chainId || !address || !symbol) {
    return
  }
  return new Token(chainId, address, +decimals, symbol, symbol)
}

export const getMyPositionStorageKey = (chainId: string | number) =>
  `_my_position_${chainId}`

export const updateLocalStorage = (key: string, val: any) => {
  if (key) {
    const oldVal = localStorage.getItem(key)
    const _oldVal = oldVal ? JSON.parse(oldVal) : oldVal
    if (
      typeof val === 'object' &&
      typeof _oldVal === 'object' &&
      _oldVal !== null &&
      val !== null
    ) {
      localStorage.setItem(
        key,
        JSON.stringify({
          ..._oldVal,
          ...val,
        }),
      )
    } else {
      localStorage.setItem(key, JSON.stringify(val))
    }
  }
}
