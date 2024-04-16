import classNames from 'classnames'

export enum BTN_VARIANT {
  primary,
  dark,
  secondary,
  'outline',
  'outline-primary',
  'outline-dark',
  'outline-darkGray',
  transparent,
  disabled,
  green,
  'outline-disabled',
  red,
}

const BTN_VARIANT_MAPPING = {
  [BTN_VARIANT.primary]: ['bg-primary', 'text-white'],
  [BTN_VARIANT.dark]: ['bg-neutral-900', 'text-white'],
  [BTN_VARIANT.secondary]: ['bg-white', 'text-primary'],
  [BTN_VARIANT.transparent]: ['transparent', 'text-black'],
  [BTN_VARIANT['outline-primary']]: [
    'transparent',
    'text-primary',
    'border-solid border md:border-2 border-primary',
  ],
  [BTN_VARIANT['outline']]: [
    'transparent',
    'text-white',
    'border-solid border border-line',
  ],
  [BTN_VARIANT['outline-darkGray']]: [
    'transparent',
    'text-white',
    'border-solid border border-darkGray',
  ],
  [BTN_VARIANT['outline-dark']]: [
    'transparent',
    'text-white',
    'border-solid border border-text',
  ],
  // the color is wrong in design
  [BTN_VARIANT.disabled]: ['bg-grayBlue', 'text-darkGrayBlue-300'],
  [BTN_VARIANT['outline-disabled']]: [
    'transparent',
    'text-black-700',
    'border-solid border md:border-2 border-line',
  ],
  [BTN_VARIANT.green]: ['bg-green-500', 'text-darkGreen'],
  [BTN_VARIANT.red]: ['bg-alert', 'text-white'],
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  bg?: string
  variant?: BTN_VARIANT
  space?: string
  roundCornerStyle?: string
}

const _roundCornerStyle = 'rounded-lg'

const getBtnColorStyle = ({
  variant,
  bg,
  color,
}: {
  variant?: BTN_VARIANT
  bg?: string
  color?: string
}) => {
  let colorStyle: string[] = []

  if (variant !== undefined) {
    colorStyle =
      BTN_VARIANT_MAPPING[variant] || BTN_VARIANT_MAPPING[BTN_VARIANT.primary]
  }
  if (bg) {
    colorStyle[0] = bg
  }

  if (color) {
    colorStyle[1] = color
  }

  return colorStyle.join(' ')
}

export const Button = ({
  children,
  variant,
  bg,
  color,
  space,
  className,
  disabled,
  roundCornerStyle,
  ...otherProps
}: ButtonProps) => {
  const btnColorStyle = getBtnColorStyle({ variant, bg, color })
  return (
    <button
      disabled={disabled}
      className={classNames(
        roundCornerStyle || _roundCornerStyle,
        space || 'py-2 px-4 sm:py-3 sm:px-6',
        btnColorStyle,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        'font-semibold',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}
