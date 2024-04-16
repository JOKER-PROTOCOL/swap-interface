import { postRequest, getRequest } from './http'

export const verifyWalletLogin = ({
  message,
  signature,
}: {
  message: string
  signature: string
}) => {
  return postRequest(
    '/v1/users/wallet/login',
    { message, signature },
    {},
    { withSuccessStatus: true },
  )
}

export const bindGmail = async () => {
  return await getRequest(`/v1/auth/google/email/bind`)
}

export const bindAddress = async ({ message, signature }: any) => {
  return await postRequest(`/v1/users/address/bind`, { message, signature })
}

export const logout = async () => {
  return await postRequest(`/v1/users/logout`)
}
