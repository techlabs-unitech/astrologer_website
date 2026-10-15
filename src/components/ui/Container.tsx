import { type HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** max-width preset. Defaults to 'default' (max-w-7xl) */
  size?: 'sm' | 'default' | 'wide' | 'full'
}

const maxWidths: Record<NonNullable<ContainerProps['size']>, string> = {
  sm:      'max-w-3xl',
  default: 'max-w-7xl',
  wide:    'max-w-8xl',
  full:    'max-w-full',
}

export default function Container({
  size = 'default',
  className = '',
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidths[size]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
