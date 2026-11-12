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
import { localizeProduct } from '@/lib/localize'

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

// ─── Component ────────────────────────────────────────────────────────────────

interface LiveProductCardProps {
  product: Product
}

export default function LiveProductCard({ product }: LiveProductCardProps) {
  const { t, language } = useLanguage()
  const { name, description } = localizeProduct(product, language)
  const Icon         = CATEGORY_ICON[product.category] ?? Star
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
    <article className="card-cosmic group flex h-full flex-col overflow-hidden" aria-label={name}>
      {/* Image, or a night-panel emblem when the product has none */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-night-panel">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-saffron/70 text-saffron">
              <Icon className="h-7 w-7" />
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="eyebrow flex items-center gap-2 text-muted">
          <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          {categoryLabel}
        </span>
        <h3 className="font-serif text-2xl font-bold leading-snug text-cream">{name}</h3>
        <p className="line-clamp-3 flex-1 text-[15px] leading-relaxed text-silver">{description}</p>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-cosmic-border px-6 pb-6 pt-4">
        <div className="flex flex-col gap-1">
          <span className="eyebrow text-[10px] text-muted">{t.common.startingFrom}</span>
          <span className="font-serif text-3xl font-semibold leading-none text-cream">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <Link
          href={bookingHref}
          className="btn-primary min-h-[44px] shrink-0 px-4 text-sm"
          aria-label={`${t.common.bookNow}: ${name}`}
        >
          {t.common.bookNow}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
