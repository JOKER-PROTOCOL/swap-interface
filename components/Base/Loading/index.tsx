import { LoadingLogoF, LoadingCircleF } from 'icons'

interface LoadingProps {
  className?: string
  size?: number
}

export const Loading = ({ className, size }: LoadingProps) => (
  <div
    className={`relative w-[120px] h-[120px] flex items-center justify-center ${className}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
  >
    <LoadingLogoF size={size ? `${size / 3}px` : '48px'} />
    <LoadingCircleF
      size={`${size}px` || '120px'}
      className='async-loading-circle absolute top-0 left-0 right-0 bottom-0'
    />
  </div>
)
