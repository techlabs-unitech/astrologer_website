import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PageHero from '@/components/ui/PageHero'
import CtaBand from '@/components/ui/CtaBand'
import ShopBenefits from '@/components/shop/ShopBenefits'
import LiveProductFilters from '@/components/shop/LiveProductFilters'
import { getActiveProducts } from '@/app/shop/actions'
import { SHOP_CATEGORIES } from '@/lib/shop-data'
import { AlertCircle } from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

export const metadata: Metadata = {
  title: 'Astrology Shop',
  description:
    'Browse astrology products, reports, spiritual tools, and consultations from Sai Baba Astrology.',
}
export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const result = await getActiveProducts()
  const dbError = !result.success
  const liveProducts = result.success ? result.data : []

  return (
    <>
      <PageHero
        id="shop-heading"
        label={<LocalizedCopy id="shopBadgeText" />}
        title={<LocalizedCopy id="shopTitle" />}
        description={<LocalizedCopy id="shopDescription" />}
      />

      {/* PRODUCT GRID */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="products-grid-heading">
        <Container size="wide">
          <div className="mb-10 flex flex-col gap-2">
            <h2 id="products-grid-heading" className="heading-serif text-3xl font-bold sm:text-4xl">
              <LocalizedCopy id="shopProducts" />
            </h2>
            <p className="text-[15px] text-silver">
              <LocalizedCopy id="shopFilterDescription" />
            </p>
          </div>

          {dbError && (
            <div
              role="status"
              className="mb-8 flex items-center gap-2 rounded-lg border border-gold-light/50 bg-gold-pale px-4 py-3 text-sm text-cream"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <LocalizedCopy id="shopDbError" />
            </div>
          )}

          <LiveProductFilters products={liveProducts} categories={SHOP_CATEGORIES} />
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="section-padding border-t border-cosmic-border bg-cosmic-deep" aria-labelledby="benefits-heading">
        <Container size="wide">
          <SectionHeading
            id="benefits-heading"
            label={<LocalizedCopy id="shopBenefitsLabel" />}
            title={<LocalizedCopy id="shopBenefitsTitle" />}
            highlight={<LocalizedCopy id="shopBenefitsHighlight" />}
            subtitle={<LocalizedCopy id="shopBenefitsSubtitle" />}
            layout="split"
            className="mb-12"
          />
          <ShopBenefits />
        </Container>
      </section>

      <CtaBand
        id="shop-cta-heading"
        title={
          <>
            <LocalizedCopy id="shopCtaTitle" /> <LocalizedCopy id="shopCtaHighlight" />
          </>
        }
        description={<LocalizedCopy id="shopCtaDescription" />}
        primary={{ href: '/contact', label: <LocalizedCopy id="contactUs" /> }}
        secondary={{ href: '/about', label: <LocalizedCopy id="aboutApproach" /> }}
      />
    </>
  )
}
