import type { LucideIcon } from 'lucide-react'

interface FeatureGridProps {
  items: Array<{ icon: LucideIcon; title: string; description: string }>
  /** Number of columns from the md breakpoint up */
  columns?: 2 | 3 | 4
}

const COLS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }

/** Hairline grid of icon + title + text cells (the Panchanga "chart grid" look). */
export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`grid grid-cols-1 border-l border-t border-cosmic-border ${COLS[columns]}`}>
      {items.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex flex-col gap-4 border-b border-r border-cosmic-border bg-cosmic-card p-7 sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/70 text-gold">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="font-serif text-2xl font-bold text-cream">{title}</h3>
          <p className="text-[15px] leading-relaxed text-silver">{description}</p>
        </div>
      ))}
    </div>
  )
}
