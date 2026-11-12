'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PageHero from '@/components/ui/PageHero'
import FeatureGrid from '@/components/ui/FeatureGrid'
import CtaBand from '@/components/ui/CtaBand'
import ServiceEmblem from '@/components/ui/ServiceEmblem'
import { Sparkles, ArrowRight, Shield, Compass } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { SERVICE_VISUALS } from '@/lib/services-meta'

export default function ServicesPage() {
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

  return (
    <>
      <PageHero
        label={t.home.ourAstrology}
        title={t.services.title}
        description={t.home.servicesSubtitle}
      >
        <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/appointment" className="btn-primary px-7 text-[15px]">
            {t.home.bookConsultation}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      {/* SERVICES */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="services-heading">
        <Container size="wide">
          <SectionHeading
            id="services-heading"
            label={t.home.whatWeOffer}
            title={`${t.home.ourAstrology} ${t.home.services}`}
            subtitle={t.services.subtitle}
            layout="split"
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="card-cosmic flex flex-col overflow-hidden sm:flex-row">
                <ServiceEmblem
                  icon={service.icon}
                  glyph={service.glyph}
                  className="h-40 sm:h-auto sm:w-48 sm:shrink-0"
                />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl font-bold text-cream">{service.title}</h2>
                    <span className="font-serif text-lg italic text-gold" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="mt-2 text-[15px] leading-relaxed text-silver">{service.description}</p>

                  <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-cosmic-border pt-5 sm:grid-cols-2" role="list">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-silver">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/appointment"
                    className="group mt-6 flex min-h-[48px] items-center justify-between border-t border-cosmic-border pt-4 text-[15px] font-semibold text-cream transition-colors hover:text-gold"
                  >
                    {t.home.bookConsultation}
                    <span className="sr-only">: {service.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="section-padding border-t border-cosmic-border bg-cosmic-deep" aria-labelledby="benefits-heading">
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
