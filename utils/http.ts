import { getRequest, postRequest } from '../apis/http';

const buildQuery = (queryObj) => {
  return Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join('&')
}

export const get = async (url: string, body?: any, options?: any) => {
  const { headers, ...others } = options || {}
  url = body ? [url, buildQuery(body)].join('?') : url
  try {
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers,
      ...others,
    })

    const jsonData = await resp.json()
    return jsonData
  } catch (e) {
    console.log('fetch err:', url, e)
  }
}

export const post = async (url: string, body?: any, options?: any) => {
  const { headers, ...others } = options || {}
  try {
    const jsonData = await postRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...others,
      body,
    })
    return jsonData
  } catch (e) {
    console.log('fetch err:', url, e)
  }
}
