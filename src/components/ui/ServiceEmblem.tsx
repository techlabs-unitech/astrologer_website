import type { LucideIcon } from 'lucide-react'

interface ServiceEmblemProps {
  icon: LucideIcon
  /** Planetary glyph shown as a large watermark */
  glyph: string
  className?: string
}

/**
 * Night-panel thumbnail for a service: a saffron ringed icon over a faint
 * planetary glyph. Looks the same in both themes.
 */
export default function ServiceEmblem({ icon: Icon, glyph, className = '' }: ServiceEmblemProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden bg-night-panel ${className}`}
    >
      <span className="absolute -bottom-6 -right-2 select-none font-symbol text-[7rem] leading-none text-saffron/15">
        {glyph}
        {'︎'}
      </span>
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-saffron/70 text-saffron">
        <Icon className="h-7 w-7" />
      </span>
    </div>
  )
}
