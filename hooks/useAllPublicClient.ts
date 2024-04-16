import { usePublicClient } from 'wagmi';
import { goerli, sepolia, zkSync, zkSyncTestnet } from 'wagmi/chains';
import { PublicClient } from '@wagmi/core';

export function useAllPublicClient(): { [key: string]: PublicClient } {
  const zksyncClient = usePublicClient({
    chainId: zkSync.id
  });
  const zkSyncTestnetClient = usePublicClient({
    chainId: zkSyncTestnet.id,
  });
  const sepoliaClient = usePublicClient({
    chainId: sepolia.id,
  });
  const goerliClient = usePublicClient({
    chainId: goerli.id,
  });
  return {
    zksyncClient,
    zkSyncTestnetClient,
    sepoliaClient,
    goerliClient,
  }
}