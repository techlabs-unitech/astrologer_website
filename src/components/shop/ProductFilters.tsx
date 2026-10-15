'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard from './ProductCard'
import type { StaticProduct, ShopCategory } from '@/lib/shop-data'
import type { ProductCategory } from '@/types/database'
import { useLanguage } from '@/components/LanguageProvider'

interface ProductFiltersProps {
  products: StaticProduct[]
  categories: ShopCategory[]
}

export default function ProductFilters({ products, categories }: ProductFiltersProps) {
  const [active, setActive] = useState<ProductCategory | 'all'>('all')
  const { t } = useLanguage()

  const filtered =
    active === 'all'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <div className="flex flex-col gap-10">
      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-4"
        role="group"
        aria-label={t.common.filter}
      >
        {/* Label */}
        <span className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-widest shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          {t.common.filter}
        </span>

        {/* Pills */}
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
                {cat.label}
                {isActive && (
                  <span className="ml-2 text-[10px] font-bold tabular-nums">
                    {filtered.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Result count */}
        <span className="text-xs text-muted sm:ml-auto shrink-0">
          {filtered.length} {t.common.servicesCount}
        </span>
      </div>

      {/* ── Product grid ────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={t.common.servicesCount}
          aria-live="polite"
          aria-atomic="false"
        >
          {filtered.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
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
