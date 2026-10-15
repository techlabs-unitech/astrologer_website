'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import type { Product } from '@/types/database'
import LiveProductCard from './LiveProductCard'
import { useLanguage } from '@/components/LanguageProvider'

interface FeaturedProductsCarouselProps {
  products: Product[]
}

export default function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLDivElement>(null)

  if (!products || products.length === 0) return null

  function scrollBy(direction: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.9, 640)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Scroll controls */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy('left')}
          aria-label="Scroll featured products left"
          className="w-9 h-9 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-gold/40 flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy('right')}
          aria-label="Scroll featured products right"
          className="w-9 h-9 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-gold/40 flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]"
        role="list"
        aria-label={t.common.productCatalogue}
      >
        {products.map((product) => (
          <div
            key={product.id}
            role="listitem"
            className="snap-start shrink-0 w-[78vw] sm:w-80"
          >
            <LiveProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/shop" className="btn-primary text-sm px-8 py-3.5">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          {t.common.exploreShop}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
