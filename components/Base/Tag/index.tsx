import classNames from 'classnames'

export enum TAG_VARIANT {
  primary,
  'outline-primary',
  secondary,
  highlight,
}

const TAG_VARIANT_MAPPING = {
  [TAG_VARIANT.primary]: 'bg-white text-primary py-1.5 text-base leading-5',
  [TAG_VARIANT.secondary]: 'bg-darkGrayBlue-700 py-1 text-xs font-medium',
  [TAG_VARIANT['outline-primary']]:
    'bg-blackBlue text-paleOrange py-1.5 text-base leading-5 font-bold border-solid border border-paleOrange',
  [TAG_VARIANT.highlight]: 'bg-primary text-white py-1.5 text-base leading-5',
}

const noon = () => {}

export const Tag = ({
  text,
  variant,
  className,
  onClick,
}: {
  text: string
  variant: TAG_VARIANT
  className?: string
  onClick?: () => void
}) => {
  return (
    <div
      onClick={onClick || noon}
      className={classNames(
        'rounded-lg px-3',
        TAG_VARIANT_MAPPING[variant] || '',
        className,
      )}
    >
      {text}
    </div>
  )
}
