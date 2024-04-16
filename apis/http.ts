import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { httpStatusErrorInterceptor, parseUrl } from '../utils/base'

// GET request function with request parameters and header options

const asyncApi = 'async.finance'

export async function getRequest(
  url: string,
  params?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<any> {
  try {
    const token = localStorage.getItem('access_token')
    const urlWithParams = new URL(parseUrl(url))
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlWithParams.searchParams.append(key, value)
      })
    }

    const response = await fetch(urlWithParams.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
        ...headers,
      },
    })
    const data = await response.json()

    httpStatusErrorInterceptor({ response, responseData: data })

    return data
  } catch (error) {
    console.error(`${url} error`, error)
    url?.includes(asyncApi) &&
      toast.error('Something went wrong, please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      })
  }
}

// POST request function with request body and header options
export async function postRequest(
  url: string,
  data?: any,
  headers?: Record<string, string>,
  options?: Record<string, any>,
): Promise<any> {
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(parseUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
        ...headers,
      },
      body: options?.rawData ? data : JSON.stringify(data),
    })

    const responseData = await response.json()

    httpStatusErrorInterceptor({ response, responseData })

    if (options?.withSuccessStatus) {
      const { status } = response
      return {
        isSuccess: status === 200,
        ...responseData,
      }
    }

    return responseData
  } catch (error) {
    console.error(error)
    url?.includes(asyncApi) &&
      toast.error('Something went wrong, please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      })
  }
}

// POST request function with request body and header options
export async function putRequest(
  url: string,
  data?: any,
  headers?: Record<string, string>,
  options?: Record<string, any>,
): Promise<any> {
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(parseUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
        ...headers,
      },
      body: options?.rawData ? data : JSON.stringify(data),
    })

    const responseData = await response.json()

    const { status } = response

    httpStatusErrorInterceptor({ response, responseData })

    return {
      isSuccess: status === 200,
      ...responseData,
    }
  } catch (error) {
    console.error(error)
  }
}
