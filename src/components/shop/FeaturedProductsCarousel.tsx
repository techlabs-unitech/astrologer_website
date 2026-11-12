'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/database'
import LiveProductCard from './LiveProductCard'
import CardCarousel from '@/components/ui/CardCarousel'
import { useLanguage } from '@/components/LanguageProvider'
import { localizeProduct } from '@/lib/localize'

interface FeaturedProductsCarouselProps {
  products: Product[]
}

/** Featured products on the homepage: swipeable, four cards per row on desktop. */
export default function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const { t, language } = useLanguage()

  if (!products || products.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      <CardCarousel
        labels={{
          region: t.common.productCatalogue,
          previous: t.explore.previous,
          next: t.explore.next,
          goToSlide: t.explore.goToSlide,
        }}
        slideClassName="w-[82%] sm:w-[46%] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
        slides={products.map((product) => ({
          key: product.id,
          label: localizeProduct(product, language).name,
          content: <LiveProductCard product={product} />,
        }))}
      />

      <div className="flex justify-center">
        <Link href="/shop" className="btn-secondary px-7 text-[15px]">
          {t.common.exploreShop}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
