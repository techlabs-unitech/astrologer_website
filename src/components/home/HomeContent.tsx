'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import FeaturedProductsCarousel from '@/components/shop/FeaturedProductsCarousel'
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Shield,
  Compass,
  Star,
  CheckCircle,
  Calendar,
} from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { SERVICE_VISUALS } from '@/lib/services-meta'
import type { Product } from '@/types/database'

interface HomeContentProps {
  featuredProducts: Product[]
}

export default function HomeContent({ featuredProducts }: HomeContentProps) {
  const { t } = useLanguage()

  const services = t.services.servicesList.map((service, index) => ({
    ...service,
    ...SERVICE_VISUALS[index],
  }))

  const benefits = [
    { icon: Sparkles, title: t.home.personalisedInsights, description: t.home.personalisedDescription },
    { icon: Shield, title: t.home.confidentialConsultations, description: t.home.confidentialDescription },
    { icon: Compass, title: t.home.practicalAdvice, description: t.home.practicalDescription },
  ]

  const stats = [
    { value: '10+', label: t.home.yearsExperience },
    { value: '1,000+', label: t.home.consultations },
    { value: '98%', label: t.home.clientSatisfaction },
    { value: '20+', label: t.home.countriesServed },
  ]

  const keyFacts = [
    t.home.experiencedGuidance,
    t.home.yearsOfExperience,
    t.home.ancientWisdom,
    t.home.confidentialConsultations,
  ]

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 bg-violet/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/6 blur-[90px]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t.home.eyebrow}
            </div>

            <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
              {t.home.title}
            </h1>

            <p className="text-silver text-lg leading-relaxed max-w-2xl mx-auto mb-9">
              {t.home.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/appointment" className="btn-primary text-sm px-8 py-3.5 w-full sm:w-auto">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {t.home.bookConsultation}
              </Link>
              <Link href="/services" className="btn-secondary text-sm px-8 py-3.5 w-full sm:w-auto">
                {t.home.exploreServices}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-3 py-5 text-center flex flex-col gap-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {stat.value}
                </span>
                <span className="text-muted text-[11px] sm:text-xs uppercase tracking-wide leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-40" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT / MEET THE ASTROLOGER
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-section-dark relative" aria-labelledby="home-about-heading">
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="relative flex items-center justify-center min-h-[300px] order-2 md:order-1" aria-hidden="true">
              {[280, 220, 160].map((size, i) => (
                <div
                  key={size}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    border: `1px solid ${i === 1 ? 'rgba(217,119,6,0.18)' : 'rgba(107,70,193,0.2)'}`,
                    animation: `rotate-slow ${22 + i * 7}s linear infinite ${i % 2 ? 'reverse' : ''}`,
                  }}
                />
              ))}

              <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-violet/40 shadow-glow-violet">
                <Image
                  src="/images/astrologer-portrait.png"
                  alt="Portrait of the astrologer"
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover"
                />
              </div>

              {[
                { sym: '♈', cls: 'top-2 left-2' },
                { sym: '♌', cls: 'top-2 right-2' },
                { sym: '♎', cls: 'bottom-2 left-2' },
                { sym: '♓', cls: 'bottom-2 right-2' },
              ].map(({ sym, cls }) => (
                <span key={sym} className={`absolute ${cls} text-xl text-violet-light/30 font-serif animate-twinkle-slow`}>
                  {sym}
                </span>
              ))}
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5 order-1 md:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-bright">
                <span className="glow-dot" aria-hidden="true" />
                {t.home.meetAstrologer}
              </span>

              <h2 id="home-about-heading" className="heading-serif text-3xl sm:text-4xl font-bold text-balance">
                {t.home.ancientWisdom},{' '}
                <span className="text-gradient-gold">{t.home.personalisedInsights}</span>
              </h2>

              <p className="text-silver leading-relaxed">{t.home.astrologyDescription}</p>

              <ul className="grid grid-cols-2 gap-3 mt-1" role="list">
                {keyFacts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2 text-sm text-silver">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-bright shrink-0" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-secondary w-fit text-sm mt-2">
                {t.nav.about}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-30" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding relative" aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            id="services-heading"
            label={t.home.whatWeOffer}
            title={t.home.ourAstrology}
            highlight={t.home.services}
            subtitle={t.home.servicesSubtitle}
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} variant="bare" accent className="flex flex-col">
                  <div
                    className={`relative h-28 w-full overflow-hidden bg-gradient-to-br ${service.thumbClass}`}
                    aria-hidden="true"
                  >
                    <span className="absolute -right-2 -bottom-4 text-6xl leading-none font-serif text-white/15 select-none">
                      {service.glyph}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-xl bg-black/20 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <h3 className="font-serif text-cream font-semibold text-lg">{service.title}</h3>
                    <p className="text-muted text-sm leading-relaxed flex-1">{service.description}</p>
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-bright hover:text-gold transition-colors mt-1"
                    >
                      {t.home.bookConsultation}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/services" className="btn-ghost text-sm">
              {t.home.viewAllServices}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS CAROUSEL
      ══════════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-section-dark relative" aria-labelledby="featured-heading">
          <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

          <Container>
            <SectionHeading
              id="featured-heading"
              label={t.home.featuredLabel}
              title={t.home.featuredTitle}
              highlight={t.home.featuredHighlight}
              subtitle={t.home.featuredSubtitle}
              className="mb-12"
            />

            <FeaturedProductsCarousel products={featuredProducts} />
          </Container>

          <span className="divider-gold absolute bottom-0 inset-x-0 opacity-30" aria-hidden="true" />
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding" aria-labelledby="benefits-heading">
        <Container>
          <SectionHeading
            id="benefits-heading"
            label={t.home.whyChooseUs}
            title={t.home.guidanceYouCan}
            highlight={t.home.trust}
            subtitle={t.home.whyChooseSubtitle}
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} accent className="p-7 text-center flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-bright" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-cream font-semibold text-lg">{benefit.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SHOP + APPOINTMENT CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-section-dark relative" aria-labelledby="cta-heading">
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container size="sm">
          <div className="glass rounded-3xl border border-violet/30 px-6 sm:px-12 py-14 text-center flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-violet">
              <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>

            <h2 id="cta-heading" className="heading-serif text-2xl sm:text-3xl font-bold text-balance">
              {t.home.readyToFind}{' '}
              <span className="text-gradient-gold">{t.home.cosmicDirection}</span>
            </h2>

            <p className="text-silver text-base max-w-md leading-relaxed">{t.home.finalDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/appointment" className="btn-primary text-sm px-8 py-3.5">
                {t.home.bookConsultation}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link href="/shop" className="btn-secondary text-sm px-8 py-3.5">
                {t.common.exploreShop}
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-muted text-xs flex items-center gap-2 mt-1">
              <Shield className="w-3.5 h-3.5 text-gold/60" aria-hidden="true" />
              {t.home.confidential} &bull; {t.home.personalised} &bull; {t.home.practical}
              <Star className="w-3 h-3 text-gold-bright fill-current" aria-hidden="true" />
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
