'use client'

import { forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
}

interface ButtonAsButton extends BaseProps {
  as?: 'button'
  href?: never
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface ButtonAsLink extends BaseProps {
  as: 'link'
  href: string
  type?: never
  onClick?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-xs',
  md: '',          // default sizing is in btn-* classes
  lg: 'px-9 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      className = '',
      children,
      loading = false,
      disabled = false,
    } = props

    const classes = [
      variantClasses[variant],
      size !== 'md' ? sizeClasses[size] : '',
      loading || disabled ? 'opacity-60 cursor-not-allowed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (props.as === 'link') {
      return (
        <Link
          href={props.href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type ?? 'button'}
        className={classes}
        disabled={disabled || loading}
        onClick={props.onClick}
      >
        {loading && (
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
