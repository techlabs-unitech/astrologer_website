'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Shield,
  Compass,
} from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { SERVICE_VISUALS } from '@/lib/services-meta'

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Personalised Insights',
    description:
      'Every consultation is based on your individual birth chart and personal questions.',
  },
  {
    icon: Shield,
    title: 'Confidential',
    description:
      'Your personal information and consultation details are treated with complete privacy.',
  },
  {
    icon: Compass,
    title: 'Practical Guidance',
    description:
      'Receive clear insights that can help you make thoughtful decisions in everyday life.',
  },
]

export default function ServicesPage() {
  const { t } = useLanguage()
  void BENEFITS
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
      {/* HERO */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-label="Astrology services"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 bg-violet/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/6 blur-[90px]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t.home.ourAstrology}
            </div>

            <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.home.guidanceYouCan}{' '}
              <span className="text-gradient-gold">{t.home.trust}</span>
            </h1>

            <p className="text-silver text-lg leading-relaxed max-w-2xl mx-auto">
              {t.home.servicesSubtitle}
            </p>
          </div>
        </Container>

        <span
          className="divider-gold absolute bottom-0 inset-x-0 opacity-40"
          aria-hidden="true"
        />
      </section>

      {/* SERVICES */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="services-heading"
      >
        <span
          className="divider-violet absolute top-0 inset-x-0"
          aria-hidden="true"
        />

        <Container>
          <SectionHeading
            id="services-heading"
            label={t.home.whatWeOffer}
            title={t.home.ourAstrology}
            highlight={t.home.services}
            subtitle={t.home.servicesSubtitle}
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <Card
                  key={service.title}
                  variant="bare"
                  accent
                  className="flex flex-col"
                >
                  {/* Service thumbnail */}
                  <div
                    className={`relative h-32 sm:h-36 w-full overflow-hidden bg-gradient-to-br ${service.thumbClass}`}
                    aria-hidden="true"
                  >
                    <span className="absolute -right-3 -bottom-5 text-[6rem] leading-none font-serif text-white/15 select-none">
                      {service.glyph}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-black/20 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-7 sm:p-8">
                    <h3 className="font-serif text-xl text-cream font-semibold mb-2">
                      {service.title}
                    </h3>

                    <p className="text-muted text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-6 pt-5 border-t border-cosmic-border">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-silver"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-bright shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7">
                      <Link
                        href="/appointment"
                        className="btn-secondary inline-flex text-sm px-6 py-3"
                      >
                        {t.home.bookConsultation}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>

        <span
          className="divider-gold absolute bottom-0 inset-x-0 opacity-30"
          aria-hidden="true"
        />
      </section>

      {/* BENEFITS */}
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
                <Card
                  key={benefit.title}
                  accent
                  className="p-7 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
                    <Icon
                      className="w-6 h-6 text-gold-bright"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-serif text-cream font-semibold text-lg">
                    {benefit.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* SHOP + APPOINTMENT CTA */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="cta-heading"
      >
        <span
          className="divider-violet absolute top-0 inset-x-0"
          aria-hidden="true"
        />

        <Container size="sm">
          <div className="glass rounded-3xl border border-violet/30 px-6 sm:px-12 py-14 text-center flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-violet">
              <MessageCircle
                className="w-6 h-6 text-white"
                aria-hidden="true"
              />
            </div>

            <h2
              id="cta-heading"
              className="heading-serif text-2xl sm:text-3xl font-bold text-balance"
            >
              {t.home.readyToFind}{' '}
              <span className="text-gradient-gold">{t.home.cosmicDirection}</span>
            </h2>

            <p className="text-silver text-base max-w-md leading-relaxed">
              {t.home.finalDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment"
                className="btn-primary text-sm px-8 py-3.5"
              >
                {t.home.bookConsultation}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/shop"
                className="btn-secondary text-sm px-8 py-3.5"
              >
                {t.common.exploreShop}
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}