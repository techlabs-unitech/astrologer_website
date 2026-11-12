import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'

interface PageHeroProps {
  label?: ReactNode
  title: ReactNode
  /** Part of the title set in the violet accent colour */
  highlight?: ReactNode
  description?: ReactNode
  /** Extra content under the description (buttons, chips, trust points) */
  children?: ReactNode
  /** Optional right-hand column (art, chart, card) on wide screens */
  aside?: ReactNode
  id?: string
}

/**
 * Panchanga page header: cream band (temple-night band in dark mode) with a
 * spaced-capitals label, a large serif title and an optional right column.
 * Top padding clears the fixed navbar.
 */
export default function PageHero({ label, title, highlight, description, children, aside, id = 'page-heading' }: PageHeroProps) {
  return (
    <section className="border-b border-cosmic-border bg-cosmic-deep pb-14 pt-32 sm:pb-16 sm:pt-36" aria-labelledby={id}>
      <Container size="wide">
        <div className={aside ? 'grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16' : ''}>
          <div className="flex max-w-3xl flex-col gap-5">
            {label && <span className="eyebrow">{label}</span>}
            <h1 id={id} className="heading-serif text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
              {title}
              {highlight && (
                <>
                  {' '}
                  <span className="text-violet">{highlight}</span>
                </>
              )}
            </h1>
            {description && <p className="text-base leading-relaxed text-silver sm:text-lg">{description}</p>}
            {children}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </Container>
    </section>
  )
}
