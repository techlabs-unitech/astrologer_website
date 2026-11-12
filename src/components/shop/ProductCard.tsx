import Link from 'next/link'
import {
  BookOpen,
  Heart,
  Briefcase,
  Users,
  Calendar,
  Star,
  FileText,
  Gem,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import type { StaticProduct } from '@/lib/shop-data'
import { useLanguage } from '@/components/LanguageProvider'

// ─── Icon resolver ────────────────────────────────────────────────────────────
// Maps the string icon name stored in static data to a real Lucide component.
// Keeps shop-data.ts free of React imports (plain TS module).

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Heart,
  Briefcase,
  Users,
  Calendar,
  Star,
  FileText,
  Gem,
  Sparkles,
}

const FALLBACK_ICON = Star

// ─── Category label map ───────────────────────────────────────────────────────

// ─── Badge colour map (full static classes — Tailwind won't purge dynamics) ──

const CATEGORY_BADGE: Record<string, string> = {
  consultation: 'bg-violet/20 text-violet-glow border-violet/30',
  report:       'bg-gold/15 text-gold-bright border-gold/30',
  relationship: 'bg-gold/10 text-gold border-gold/30',
  career:       'bg-gold/10 text-gold border-gold/30',
  gemstone:     'bg-gold/10 text-gold border-gold/30',
  yantra:       'bg-violet/20 text-violet-glow border-violet/30',
  rudraksha:    'bg-gold/10 text-gold border-gold/30',
  other:        'bg-cosmic-border/30 text-muted border-cosmic-border/50',
}

// ─── Icon background gradient map ────────────────────────────────────────────


// ─── Component ────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: StaticProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const Icon = ICON_MAP[product.icon] ?? FALLBACK_ICON
  const badgeClass = CATEGORY_BADGE[product.category] ?? CATEGORY_BADGE.other
  const categoryLabel = ({
    consultation: t.common.consultations,
    report: t.common.reports,
    relationship: t.common.relationships,
    career: t.common.career,
  } as Record<string, string>)[product.category] ?? product.category
  const bookingHref = `/shop/booking?product=${encodeURIComponent(product.id)}`

  return (
    <article
      className="relative card-cosmic flex flex-col gap-0 overflow-hidden group"
      aria-label={product.name}
    >
      {/* Featured badges */}
      {product.featured && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
          <span className="badge-gold text-[10px] px-2.5 py-1 whitespace-nowrap">
            {t.common.mostPopular}
          </span>
        </div>
      )}

      {/* Gold top-accent line on featured */}
      {product.featured && (
        <span
          className="absolute inset-x-0 top-0 h-[2px] bg-gold-light/60"
          aria-hidden="true"
        />
      )}

      {/* Card body */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Icon + category row */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-xl border border-gold-light/70 text-gold flex items-center justify-center shadow-glow-sm shrink-0 transition-transform duration-300 group-hover:scale-110`}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" />
          </div>

          <span
            className={`badge border text-[10px] px-2 py-0.5 whitespace-nowrap ${badgeClass}`}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-cream font-semibold text-lg leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed flex-1">
          {product.description}
        </p>
      </div>

      {/* Card footer — price + CTA */}
      <div className="px-6 pb-6 pt-4 border-t border-cosmic-border flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted text-[10px] uppercase tracking-widest">
            {t.common.startingFrom}
          </span>
          <span className="font-serif text-2xl font-bold text-gradient-gold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <Link
          href={bookingHref}
          className="btn-primary text-xs px-5 py-2.5 shrink-0"
          aria-label={`Book ${product.name}`}
        >
          {t.common.bookNow}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
