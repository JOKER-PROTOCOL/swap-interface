import { ReactElement, useMemo } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { BTN_VARIANT } from 'components/Base/Button'
import { NotConnected, NotSupported } from './ErrorConnectButton'
import { ConnectedInfo } from './ConnectedSection'
import { ChainId } from 'constants/chains'
import { isDev } from 'constants/env'

interface IConnectButtonContentProps {
  account?: any
  chain?: any
  openAccountModal: () => void
  openChainModal: () => void
  openConnectModal: () => void
  authenticationStatus?: any
  mounted: boolean
  className?: string
  variant?: BTN_VARIANT
  disabled?: boolean
  ConnectedContent?: ReactElement
}

const SUPPORTED_CHAIN_ID_BY_EVENTS = {
  zklink: isDev
    ? [ChainId.ZKLINK, ChainId.MERLIN_TESTNET, ChainId.ZKLINK_TESTNET]
    : [ChainId.ZKLINK],
}

const ConnectButtonContent = ({
  account,
  chain,
  openAccountModal,
  openChainModal,
  openConnectModal,
  authenticationStatus,
  mounted,
  className,
  variant,
  disabled,
  ConnectedContent,
  ...props
}: IConnectButtonContentProps) => {
  const { pathname } = useRouter()
  const ready = mounted && authenticationStatus !== 'loading'
  const connected =
    ready &&
    account &&
    chain &&
    (!authenticationStatus || authenticationStatus === 'authenticated')

  const isUnsupported = useMemo(() => {
    const eventsName = pathname?.split('/')[2]
    return (
      chain?.unsupported ||
      (pathname?.includes('events') &&
        !SUPPORTED_CHAIN_ID_BY_EVENTS[eventsName].includes(chain?.id))
    )
  }, [chain, pathname])

  if (!connected) {
    return (
      <NotConnected
        openConnectModal={openConnectModal}
        className={className}
        variant={variant}
        disabled={disabled}
        {...props}
      />
    )
  }
  if (isUnsupported) {
    return <NotSupported openChainModal={openChainModal} />
  }
  return ConnectedContent ? (
    <ConnectedContent account={account} chain={chain} />
  ) : (
    <ConnectedInfo
      className={className}
      account={account}
      chain={chain}
      openAccountModal={openAccountModal}
      openChainModal={openChainModal}
    />
  )
}

export const ZKDConnectButton = ({
  className,
  variant,
  disabled,
  ConnectedContent,
}: {
  className?: string
  variant?: BTN_VARIANT
  disabled?: boolean
  ConnectedContent?: ReactElement
}) => {
  return (
    <ConnectButton.Custom>
      {props => (
        <ConnectButtonContent
          className={className}
          variant={variant}
          disabled={disabled}
          ConnectedContent={ConnectedContent}
          {...props}
        />
      )}
    </ConnectButton.Custom>
  )
}
