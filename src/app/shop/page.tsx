import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import LiveProductFilters from '@/components/shop/LiveProductFilters'
import { getActiveProducts } from '@/app/shop/actions'
import { SHOP_CATEGORIES } from '@/lib/shop-data'
import {
  Sparkles,
  Eye,
  Shield,
  Zap,
  Award,
  ArrowRight,
  MessageCircle,
  AlertCircle,
} from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Astrology Shop',
  description:
    'Browse astrology products, reports, spiritual tools, and consultations from SaiBabaAstro.',
}
export const revalidate = 60

// ─── Static data ──────────────────────────────────────────────────────────────

const BENEFITS = [Eye, Zap, Shield, Award]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ShopPage() {
  // Attempt to load live products from Supabase
  const result = await getActiveProducts()

  const dbError = !result.success
  const liveProducts = result.success ? result.data : []

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-label="Shop"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 bg-violet/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/6 blur-[90px]" />
        </div>

        {/* Decorative rings — desktop only */}
        <div
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          {[200, 150, 100].map((size, i) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/15"
              style={{
                width: size,
                height: size,
                animation: `rotate-slow ${18 + i * 8}s linear infinite ${i % 2 ? 'reverse' : ''}`,
              }}
            />
          ))}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-violet/30 to-gold/20 border border-violet/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-gold-bright" aria-hidden="true" />
          </div>
          {['♈', '♎', '♊', '♐'].map((sym, i) => {
            const angles = [0, 90, 180, 270]
            const r   = 100
            const rad = (angles[i] * Math.PI) / 180
            const x   = 40 + r * Math.cos(rad - Math.PI / 2)
            const y   = 40 + r * Math.sin(rad - Math.PI / 2)
            return (
              <span
                key={sym}
                className="absolute text-lg text-violet-light/30 font-serif"
                style={{ left: x, top: y, transform: 'translate(-50%,-50%)' }}
                aria-hidden="true"
              >
                {sym}
              </span>
            )
          })}
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <LocalizedCopy id="shopBadge" />
            </div>

            <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <LocalizedCopy id="shopTitle" />
            </h1>

            <p className="text-silver text-lg leading-relaxed max-w-xl">
              <LocalizedCopy id="shopDescription" />
            </p>
          </div>
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-40" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="products-grid-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container>
          <div className="mb-10">
            <h2
              id="products-grid-heading"
              className="heading-serif text-2xl sm:text-3xl font-bold mb-2"
            >
              <LocalizedCopy id="shopProducts" />
            </h2>
            <p className="text-muted text-sm">
              <LocalizedCopy id="shopFilterDescription" />
            </p>
          </div>

          {/* Soft error note — product data remains Supabase-driven. */}
          {dbError && (
            <div className="flex items-center gap-2 mb-8 rounded-xl border border-amber-800/40 bg-amber-900/20 px-4 py-3 text-sm text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <LocalizedCopy id="shopDbError" />
            </div>
          )}

          <LiveProductFilters
            products={liveProducts}
            categories={SHOP_CATEGORIES}
          />
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-30" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY CHOOSE A PERSONALISED READING
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding" aria-labelledby="benefits-heading">
        <Container>
          <SectionHeading
            id="benefits-heading"
            label={<LocalizedCopy id="shopBenefitsLabel" />}
            title={<LocalizedCopy id="shopBenefitsTitle" />}
            highlight={<LocalizedCopy id="shopBenefitsHighlight" />}
            subtitle={<LocalizedCopy id="shopBenefitsSubtitle" />}
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((Icon) => {
              return (
                <Card key={Icon.displayName ?? Icon.name} accent className="p-6 flex flex-col gap-4 text-center items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-bright" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-cream font-semibold"><LocalizedCopy id="shopBenefitsTitle" /></h3>
                  <p className="text-muted text-sm leading-relaxed"><LocalizedCopy id="shopBenefitsSubtitle" /></p>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="shop-cta-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-violet/10 blur-[80px]" />
        </div>

        <Container size="sm" className="relative z-10">
          <div className="glass rounded-3xl border border-violet/30 px-6 sm:px-12 py-14 text-center flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-violet">
              <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>

            <h2
              id="shop-cta-heading"
              className="heading-serif text-2xl sm:text-3xl font-bold text-balance"
            >
              <LocalizedCopy id="shopCtaTitle" />{' '}
              <span className="text-gradient-gold"><LocalizedCopy id="shopCtaHighlight" /></span>
            </h2>

            <p className="text-silver text-base max-w-md leading-relaxed">
              <LocalizedCopy id="shopCtaDescription" />
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-sm px-8 py-3.5">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <LocalizedCopy id="contactUs" />
              </Link>
              <Link href="/about" className="btn-secondary text-sm px-8 py-3.5">
                <LocalizedCopy id="aboutApproach" />
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-muted text-xs flex items-center gap-2 mt-1">
              <Shield className="w-3.5 h-3.5 text-gold/60" aria-hidden="true" />
              <LocalizedCopy id="shopBenefitsSubtitle" />
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
