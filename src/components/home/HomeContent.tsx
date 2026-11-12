'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import FeaturedProductsCarousel from '@/components/shop/FeaturedProductsCarousel'
import RasiChart from '@/components/astrology/RasiChart'
import ExploreAstrologySection from '@/components/home/ExploreAstrologySection'
import FeatureGrid from '@/components/ui/FeatureGrid'
import CtaBand from '@/components/ui/CtaBand'
import FounderPortrait from '@/components/ui/FounderPortrait'
import { ArrowRight, Shield, Compass, Sparkles } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { translations } from '@/translations/translations'
import type { Product } from '@/types/database'

interface HomeContentProps {
  featuredProducts: Product[]
}

const SERVICE_GIFS: string[] = [
  '/images/b-c-a.gif', // Birth Chart Analysis
  '/images/love-relationship.gif', // Love & Relationship
  '/images/career-finance.gif', // Career & Finance
  '/images/life-guidance.gif', // Life Guidance
  '/images/numerology-reading.gif', // Numerology Reading
  '/images/vastu-shastra.gif', // Vastu Shastra Consultation
]

const ASTROLOGERS = [
  {
    image: '/images/founders/founder-1.webp',
    alt: 'Portrait of the astrologer',
    titleKey: 'astrologerTitle1' as const,
    name: 'ಡಾ|| ಶ್ರೀಸಾಯಿ ಸ್ವಾಮಿ ಮಲ್ಲುರಾಜ ಎನ್‌.ಆ‌ರ್',
    signs: ['♈', '♌', '♎', '♓'] as [string, string, string, string],
  },
  {
    image: '/images/founders/founder-2.webp',
    alt: 'Portrait of the second astrologer',
    titleKey: 'astrologerTitle2' as const,
    name: 'ಡಾ|| ಶ್ರೀಮತಿ ಸುಜಾತ ಮಲ್ಲುರಾಜ ಎನ್‌.ಆ‌ರ್.',
    signs: ['♉', '♍', '♏', '♒'] as [string, string, string, string],
  },
]

export default function HomeContent({ featuredProducts }: HomeContentProps) {
  const { t, language } = useLanguage()

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
    t.home.understandStrengths,
    t.home.majorDecisions,
    t.home.relationshipPatterns,
    t.home.personalisedRemedies,
  ]

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="bg-cosmic-deep pb-20 pt-32 sm:pt-36 lg:pb-24" aria-labelledby="hero-heading">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-6">
              <p className="text-sm font-semibold text-gold">{t.home.eyebrow}</p>

              <h1
                id="hero-heading"
                className="heading-serif text-balance text-[2.5rem] font-bold leading-[1.12] sm:text-5xl lg:text-6xl"
              >
                {t.home.title}
              </h1>

              {language !== 'en' && (
                <p lang="en" className="font-serif text-2xl italic text-violet sm:text-[28px]">
                  {translations.en.home.title}
                </p>
              )}

              <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">{t.home.description}</p>

              <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/appointment" className="btn-primary px-7 text-[15px]">
                  {t.home.bookConsultation}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/shop" className="btn-ghost px-0 text-[15px]">
                  {t.home.viewShop}
                </Link>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cosmic-border pt-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-1 border-l border-cosmic-border pl-4 sm:pl-5">
                    <dt className="text-sm text-muted">{stat.label}</dt>
                    <dd className="font-serif text-[2.25rem] font-semibold leading-none text-cream">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <RasiChart className="mx-auto w-full max-w-[540px]" />
          </div>
        </Container>
      </section>

      {/* ══ EXPLORE ASTROLOGY ══════════════════════════════════════════ */}
      <ExploreAstrologySection />

      {/* ══ MEET THE ASTROLOGERS ═══════════════════════════════════════ */}
      <section className="section-padding border-y border-cosmic-border bg-cosmic-deep" aria-labelledby="home-about-heading">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:order-1">
              {ASTROLOGERS.map((person, index) => (
                <figure key={person.image} className="m-0 flex flex-col items-center gap-4 text-center">
                  <FounderPortrait
                    src={person.image}
                    alt={person.alt}
                    signs={person.signs}
                    reverse={index === 1}
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 230px"
                  />
                  <figcaption className="flex flex-col gap-1">
                    <span className="eyebrow">{t.home[person.titleKey]}</span>
                    <span lang="kn" className="text-[15px] font-medium text-cream">
                      {person.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="order-1 flex flex-col gap-5 lg:order-2">
              <span className="eyebrow">{t.home.meetAstrologer}</span>
              <h2 id="home-about-heading" className="heading-serif text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
                {t.home.ancientWisdom}
              </h2>
              <p className="text-base leading-relaxed text-silver sm:text-lg">{t.home.astrologyDescription}</p>

              <ul className="mt-2 grid grid-cols-1 border-t border-cosmic-border sm:grid-cols-2" role="list">
                {keyFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 border-b border-cosmic-border py-4 text-[15px] text-silver sm:pr-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-secondary mt-3 w-fit">
                {t.nav.about}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ SERVICES ═══════════════════════════════════════════════════ */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="services-heading">
        <Container size="wide">
          <SectionHeading
            id="services-heading"
            label={t.home.whatWeOffer}
            title={`${t.home.ourAstrology} ${t.home.services}`}
            subtitle={t.home.servicesSubtitle}
            layout="split"
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.servicesList.map((service, index) => (
              <article key={service.title} className="card-cosmic flex flex-col overflow-hidden">
                <div className="relative aspect-[2/1] w-full overflow-hidden bg-night" aria-hidden="true">
                  <Image
                    src={SERVICE_GIFS[index] ?? SERVICE_GIFS[0]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-bold text-cream">{service.title}</h3>
                    <span className="font-serif text-lg italic text-gold" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="flex-1 text-[15px] leading-relaxed text-silver">{service.description}</p>
                  <Link
                    href="/appointment"
                    className="group mt-2 flex min-h-[48px] items-center justify-between border-t border-cosmic-border pt-4 text-[15px] font-semibold text-cream transition-colors hover:text-gold"
                  >
                    {t.home.bookConsultation}
                    <span className="sr-only">: {service.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/services" className="btn-ghost">
              {t.home.viewAllServices}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══ FEATURED PRODUCTS ══════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="section-padding border-y border-cosmic-border bg-cosmic-deep" aria-labelledby="featured-heading">
          <Container size="wide">
            <SectionHeading
              id="featured-heading"
              label={t.home.featuredLabel}
              title={`${t.home.featuredTitle} ${t.home.featuredHighlight}`}
              subtitle={t.home.featuredSubtitle}
              layout="split"
              className="mb-12"
            />
            <FeaturedProductsCarousel products={featuredProducts} />
          </Container>
        </section>
      )}

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════════ */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="benefits-heading">
        <Container size="wide">
          <SectionHeading
            id="benefits-heading"
            label={t.home.whyChooseUs}
            title={`${t.home.guidanceYouCan} ${t.home.trust}`}
            subtitle={t.home.whyChooseSubtitle}
            layout="split"
            className="mb-12"
          />

          <FeatureGrid items={benefits} />
        </Container>
      </section>

      <CtaBand
        title={`${t.home.readyToFind} ${t.home.cosmicDirection}`}
        description={t.home.finalDescription}
        primary={{ href: '/appointment', label: t.home.bookConsultation }}
        secondary={{ href: '/shop', label: t.common.exploreShop }}
      />
    </>
  )
}
