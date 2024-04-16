import { Button, BTN_VARIANT } from 'components/Base/Button'
import { WALLET_CONNECT_TRIGGER_BY } from 'constants/auth'

export const NotConnected = ({
  openConnectModal,
  className,
  variant,
  disabled = false,
  ...props
}: {
  openConnectModal: () => void
  className?: string
  variant?: BTN_VARIANT
  disabled?: boolean
}) => {
  const onClick = () => {
    if (!disabled) {
      localStorage.setItem(
        'walletConnectTriggerBy',
        WALLET_CONNECT_TRIGGER_BY.WALLET_LOGIN,
      )
      openConnectModal()
    }
  }

  return (
    <Button
      variant={variant || BTN_VARIANT.primary}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      Connect Wallet
    </Button>
  )
}

export const NotSupported = ({
  openChainModal,
}: {
  openChainModal: () => void
}) => {
  return (
    <Button variant={BTN_VARIANT.primary} onClick={openChainModal}>
      Wrong network
    </Button>
  )
}
