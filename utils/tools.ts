import copy from 'copy-to-clipboard'
import { toast, Slide } from 'react-toastify'

export const dynamicImport = ({
  path,
  onSuccess,
  onError,
}: {
  path: string
  onSuccess?: (data: any) => void
  onError?: (err: any) => void
}) => {
  import(path)
    .then(data => onSuccess?.(data))
    .catch(err => {
      onError?.(err)
      console.log('dynamicImport error:', err)
    })
}

export const getParamFromUrl = ({
  url,
  key,
  isDecode,
}: {
  url: string
  key: string
  isDecode?: boolean
}) => {
  if (!url || !key || url?.split('?')?.length < 2) return ''

  const query = url.split('?')[1]
  const res: any = {}

  query.split('&').forEach(item => {
    const [key, val] = item.split('=')
    res[key] = isDecode ? decodeURIComponent(val) : val
  })

  return res[key] || ''
}

export const copyText = (text: string) => {
  text && copy(text)
  toast.success('Copy successfully! ', {
    position: 'top-center',
    autoClose: 1000,
    closeOnClick: true,
    hideProgressBar: true,
    transition: Slide,
  })
}
