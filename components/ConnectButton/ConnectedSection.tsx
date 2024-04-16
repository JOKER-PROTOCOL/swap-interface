import { Button, BTN_VARIANT } from 'components/Base/Button'
import { DropDownF } from 'icons'

export const ConnectedInfo = ({
  className,
  account,
  chain,
  openChainModal,
  openAccountModal,
}: {
  className?: string
  account: any
  chain: any
  openChainModal: () => void
  openAccountModal: () => void
}) => {
  return (
    <div className={`space-x-6 ${className}`}>
      <Button variant={BTN_VARIANT.transparent} onClick={openChainModal}>
        <div className='flex justify-center items-center'>
          {chain.name}
          <DropDownF className='ml-3' size='12px' />
        </div>
      </Button>
      <Button
        variant={BTN_VARIANT.primary}
        className='py-0 !ml-2'
        onClick={openAccountModal}
      >
        {account.displayName}
        {account.displayBalance ? ` (${account.displayBalance})` : ''}
      </Button>
    </div>
  )
}
