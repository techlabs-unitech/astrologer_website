import type { ReactNode } from 'react'

interface SectionHeadingProps {
  /** Small label shown above the main title */
  label?: ReactNode
  title: ReactNode
  /** Part of the title to highlight in gold gradient */
  highlight?: ReactNode
  subtitle?: ReactNode
  /** Alignment. Defaults to 'center' */
  align?: 'left' | 'center'
  className?: string
  /** Optional id for the h2 — use with aria-labelledby on the section */
  id?: string
}

export default function SectionHeading({
  label,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  // If a highlight word/phrase is provided, split the title around it
  const renderTitle = () => {
    if (!highlight) return <span>{title}</span>
    if (typeof title !== 'string' || typeof highlight !== 'string') {
      return <><span>{title}</span> <span className="text-gradient-gold">{highlight}</span></>
    }
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-gradient-gold">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-bright">
          <span className="glow-dot" aria-hidden="true" />
          {label}
          <span className="glow-dot" aria-hidden="true" />
        </span>
      )}

      <h2 id={id} className="heading-serif text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-silver text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative divider */}
      <div className={`flex items-center gap-3 mt-1 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold opacity-70" />
        <span className="text-gold text-lg" aria-hidden="true">✦</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold opacity-70" />
      </div>
    </div>
  )
}
