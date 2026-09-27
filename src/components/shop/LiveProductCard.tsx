import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  Heart,
  Briefcase,
  Calendar,
  Star,
  Gem,
  Compass,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import type { Product } from '@/types/database'
import { useLanguage } from '@/components/LanguageProvider'

// ─── Category → icon ─────────────────────────────────────────────────────────

const CATEGORY_ICON: Record<string, LucideIcon> = {
  consultation:  Calendar,
  report:        BookOpen,
  relationship:  Heart,
  career:        Briefcase,
  gemstone:      Gem,
  yantra:        Star,
  rudraksha:     Star,
  vastu:         Compass,
  other:         Star,
}

// ─── Category label / badge / gradient (all full static strings) ──────────────

const CATEGORY_BADGE: Record<string, string> = {
  consultation: 'bg-violet/20 text-violet-glow border-violet/30',
  report:       'bg-gold/15 text-gold-bright border-gold/30',
  relationship: 'bg-pink-900/30 text-pink-300 border-pink-800/40',
  career:       'bg-blue-900/30 text-blue-300 border-blue-800/40',
  gemstone:     'bg-emerald-900/30 text-emerald-300 border-emerald-800/40',
  yantra:       'bg-violet/20 text-violet-glow border-violet/30',
  rudraksha:    'bg-orange-900/30 text-orange-300 border-orange-800/40',
  vastu:        'bg-teal-900/30 text-teal-300 border-teal-800/40',
  other:        'bg-cosmic-border/30 text-muted border-cosmic-border/50',
}

const ICON_GRADIENT: Record<string, string> = {
  consultation: 'from-violet to-violet-bright',
  report:       'from-gold-dim to-gold',
  relationship: 'from-pink-700 to-pink-500',
  career:       'from-blue-700 to-blue-500',
  gemstone:     'from-emerald-700 to-emerald-500',
  yantra:       'from-violet-bright to-violet-glow',
  rudraksha:    'from-orange-700 to-orange-500',
  vastu:        'from-teal-700 to-teal-500',
  other:        'from-violet/60 to-gold/40',
}

// ─── Component ────────────────────────────────────────────────────────────────

interface LiveProductCardProps {
  product: Product
}

export default function LiveProductCard({ product }: LiveProductCardProps) {
  const { t } = useLanguage()
  const Icon         = CATEGORY_ICON[product.category] ?? Star
  const badgeClass   = CATEGORY_BADGE[product.category] ?? CATEGORY_BADGE.other
  const gradientClass= ICON_GRADIENT[product.category]  ?? 'from-violet to-gold'
  const categoryLabel = ({
    consultation: t.common.consultations,
    report: t.common.reports,
    relationship: t.common.relationships,
    career: t.common.career,
    gemstone: t.common.gemstones,
    yantra: t.common.yantras,
    rudraksha: t.common.rudraksha,
    vastu: t.common.vastu,
    other: t.common.other,
  } as Record<string, string>)[product.category] ?? product.category
  const bookingHref  = `/shop/booking?product=${encodeURIComponent(product.id)}`

  return (
    <article
      className="relative card-cosmic flex flex-col gap-0 overflow-hidden group"
      aria-label={product.name}
    >
      {/* Product image (only when image_url is set) */}
      {product.image_url && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmic-card/80" />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Icon + category row */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-glow-sm shrink-0 transition-transform duration-300 group-hover:scale-110`}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <span className={`badge border text-[10px] px-2 py-0.5 whitespace-nowrap ${badgeClass}`}>
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
