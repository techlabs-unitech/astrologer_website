import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Use 'feature' for padded feature cards, 'bare' for custom-padded usage */
  variant?: 'feature' | 'bare'
  /** Adds a subtle gold top-border accent */
  accent?: boolean
}

export default function Card({
  variant = 'feature',
  accent = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const base = variant === 'feature' ? 'card-feature' : 'card-cosmic'
  const accentClass = accent
    ? 'before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:rounded-t-2xl before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent'
    : ''

  return (
    <div
      className={`${base} ${accentClass} relative overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
