import { CONTRACT_FACTORY } from 'constants/chains'

const getFactoryAddress = (chainId: number) => {
  return CONTRACT_FACTORY[chainId]
}

const getPair = async (tokenA: string, tokenB: string) => {}
