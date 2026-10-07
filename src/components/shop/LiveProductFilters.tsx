'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import LiveProductCard from './LiveProductCard'
import type { Product, ProductCategory } from '@/types/database'
import type { ShopCategory } from '@/lib/shop-data'
import { useLanguage } from '@/components/LanguageProvider'

interface LiveProductFiltersProps {
  products: Product[]
  categories: ShopCategory[]
}

export default function LiveProductFilters({ products, categories }: LiveProductFiltersProps) {
  const [active, setActive] = useState<ProductCategory | 'all'>('all')
  const { t } = useLanguage()

  const filtered =
    active === 'all'
      ? products
      : products.filter((p) => p.category === active)

  const categoryLabels: Record<string, string> = {
    all: t.common.all,
    consultation: t.common.consultations,
    report: t.common.reports,
    relationship: t.common.relationships,
    career: t.common.career,
    gemstone: t.common.gemstones,
    yantra: t.common.yantras,
    rudraksha: t.common.rudraksha,
    vastu: t.common.vastu,
    other: t.common.other,
  }

  return (
    <div className="flex flex-col gap-10">
      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-4"
        role="group"
        aria-label={t.common.filter}
      >
        <span className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-widest shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          {t.common.filter}
        </span>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = active === cat.value
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActive(cat.value)}
                aria-pressed={isActive}
                className={`
                  inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium
                  border transition-all duration-200
                  focus-visible:outline-2 focus-visible:outline-gold-bright focus-visible:outline-offset-2
                  ${isActive
                    ? 'bg-gold text-cosmic-black border-gold shadow-glow-gold'
                    : 'bg-transparent text-silver border-cosmic-border hover:border-violet/50 hover:text-cream hover:bg-violet/10'
                  }
                `}
              >
                {categoryLabels[cat.value] ?? cat.label}
                {isActive && (
                  <span className="ml-2 text-[10px] font-bold tabular-nums">
                    {filtered.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <span className="text-xs text-muted sm:ml-auto shrink-0">
          {filtered.length} {t.common.productsCount}
        </span>
      </div>

      {/* ── Product grid ────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={t.common.productsCount}
          aria-live="polite"
          aria-atomic="false"
        >
          {filtered.map((product) => (
            <div key={product.id} role="listitem">
              <LiveProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <span className="text-4xl" aria-hidden="true">✦</span>
          <p className="text-silver font-medium">{t.common.noServices}</p>
          <button
            type="button"
            onClick={() => setActive('all')}
            className="btn-ghost text-sm"
          >
            {t.common.viewAllServices}
          </button>
        </div>
      )}
    </div>
  )
}
