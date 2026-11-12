import type { ReactNode } from 'react'

interface SectionHeadingProps {
  /** Small spaced-capitals label shown above the title */
  label?: ReactNode
  title: ReactNode
  /** Part of the title to set in the violet accent colour */
  highlight?: ReactNode
  subtitle?: ReactNode
  /** Alignment. Defaults to 'center' */
  align?: 'left' | 'center'
  /**
   * 'split' puts the subtitle to the right of the title on wide screens
   * (the Panchanga section header). Defaults to 'stacked'.
   */
  layout?: 'stacked' | 'split'
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
  layout = 'stacked',
  className = '',
  id,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlight) return title
    if (typeof title !== 'string' || typeof highlight !== 'string') {
      return (
        <>
          {title} <span className="text-violet">{highlight}</span>
        </>
      )
    }
    const index = title.indexOf(highlight)
    if (index === -1) {
      return (
        <>
          {title} <span className="text-violet">{highlight}</span>
        </>
      )
    }
    return (
      <>
        {title.slice(0, index)}
        <span className="text-violet">{highlight}</span>
        {title.slice(index + highlight.length)}
      </>
    )
  }

  const heading = (
    <div className="flex flex-col gap-3">
      {label && <span className="eyebrow">{label}</span>}
      <h2 id={id} className="heading-serif text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
        {renderTitle()}
      </h2>
    </div>
  )

  if (layout === 'split') {
    return (
      <div className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16 ${className}`}>
        {heading}
        {subtitle && (
          <p className="max-w-xl text-base leading-relaxed text-silver lg:text-right">{subtitle}</p>
        )}
      </div>
    )
  }

  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {heading}
      {subtitle && <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">{subtitle}</p>}
    </div>
  )
}
