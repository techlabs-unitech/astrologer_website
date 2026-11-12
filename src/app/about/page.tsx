'use client'

import Link from 'next/link'
import FounderPortrait from '@/components/ui/FounderPortrait'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PageHero from '@/components/ui/PageHero'
import CtaBand from '@/components/ui/CtaBand'
import ServiceEmblem from '@/components/ui/ServiceEmblem'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { SERVICE_VISUALS } from '@/lib/services-meta'

function Diamond() {
  return <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" aria-hidden="true" />
}

export default function AboutPage() {
  const { t } = useLanguage()

  const credentials = [
    { value: '10+', label: t.home.yearsOfExperience, description: t.home.experiencedDescription },
    { value: '1,000+', label: t.home.consultationsCompleted, description: t.home.personalisedDescription },
    { value: '20+', label: t.home.countriesServed, description: t.home.practicalDescription },
    { value: '100%', label: t.home.confidential, description: t.home.confidentialDescription },
  ]
  const expertise = t.services.servicesList.map((item, index) => ({
    ...item,
    ...SERVICE_VISUALS[index],
  }))
  const keyFacts = [
    t.home.experiencedGuidance,
    t.home.yearsOfExperience,
    t.home.ancientWisdom,
    t.home.countriesServed,
    t.home.confidentialConsultations,
    t.home.detailedBirthChart,
  ]
  const missionPoints = [
    t.home.understandStrengths,
    t.home.majorDecisions,
    t.home.relationshipPatterns,
    t.home.personalisedRemedies,
    t.home.practicalDescription,
  ]

  return (
    <>
      <PageHero label={t.nav.about} title={t.home.guidanceYouCan} highlight={t.home.trust} description={t.home.finalDescription} />

      {/* ASTROLOGER INTRODUCTION */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="astrologer-heading">
        <Container size="wide">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <figure className="m-0 mx-auto flex w-full max-w-sm flex-col items-center text-center">
              <FounderPortrait
                src="/images/founders/founder-1.webp"
                alt="Portrait of the astrologer"
                signs={['♈', '♌', '♎', '♓']}
                priority
                sizes="(max-width: 768px) 70vw, 260px"
                className="max-w-[360px]"
              />
              <figcaption className="mt-4 flex flex-col gap-1">
                <span className="eyebrow">{t.home.astrologerTitle1}</span>
                <span lang="kn" className="text-[15px] font-medium text-cream">
                  ಡಾ|| ಶ್ರೀಸಾಯಿ ಸ್ವಾಮಿ ಮಲ್ಲುರಾಜ ಎನ್‌.ಆ‌ರ್
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-5">
              <span className="eyebrow">{t.home.meetAstrologer}</span>
              <h2 id="astrologer-heading" className="heading-serif text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
                {t.home.ancientWisdom}
              </h2>
              <p className="text-base leading-relaxed text-silver sm:text-lg">{t.home.astrologyDescription}</p>
              <p className="text-[15px] leading-relaxed text-silver">
                {t.home.astrologyDescription2} <em className="font-serif text-lg text-violet">Brihat Parashara Hora Shastra</em>{' '}
                {t.home.experiencedDescription}
              </p>

              <ul className="mt-2 grid grid-cols-1 border-t border-cosmic-border sm:grid-cols-2" role="list">
                {keyFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 border-b border-cosmic-border py-3.5 text-[15px] text-silver sm:pr-4">
                    <Diamond />
                    {fact}
                  </li>
                ))}
              </ul>

              <Link href="/appointment" className="btn-primary mt-3 w-fit px-7 text-[15px]">
                {t.home.bookConsultation}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CREDENTIALS */}
      <section className="section-padding border-y border-cosmic-border bg-cosmic-deep" aria-labelledby="credentials-heading">
        <Container size="wide">
          <SectionHeading
            id="credentials-heading"
            label={t.home.experiencedGuidance}
            title={`${t.home.guidanceYouCan} ${t.home.trust}`}
            subtitle={t.home.whyChooseSubtitle}
            layout="split"
            className="mb-12"
          />
          <dl className="grid grid-cols-1 border-l border-t border-cosmic-border sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.label} className="flex flex-col gap-3 border-b border-r border-cosmic-border bg-cosmic-card p-7">
                <dd className="font-serif text-5xl font-semibold leading-none text-cream">{c.value}</dd>
                <dt className="eyebrow text-gold">{c.label}</dt>
                <dd className="text-[15px] leading-relaxed text-silver">{c.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* AREAS OF EXPERTISE */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="expertise-heading">
        <Container size="wide">
          <SectionHeading
            id="expertise-heading"
            label={t.home.whatWeOffer}
            title={`${t.home.ourAstrology} ${t.home.services}`}
            subtitle={t.home.servicesSubtitle}
            layout="split"
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <article key={item.title} className="card-cosmic flex flex-col overflow-hidden">
                <ServiceEmblem icon={item.icon} glyph={item.glyph} className="h-36" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-serif text-2xl font-bold text-cream">{item.title}</h3>
                  <p className="flex-1 text-[15px] leading-relaxed text-silver">{item.description}</p>
                  <Link
                    href="/services"
                    className="group mt-2 flex min-h-[48px] items-center justify-between border-t border-cosmic-border pt-4 text-[15px] font-semibold text-cream transition-colors hover:text-gold"
                  >
                    {t.common.learnMore}
                    <span className="sr-only">: {item.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="section-padding border-t border-cosmic-border bg-cosmic-deep" aria-labelledby="mission-heading">
        <Container size="wide">
          <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-5">
              <span className="eyebrow">{t.home.ancientWisdom}</span>
              <h2 id="mission-heading" className="heading-serif text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
                {t.home.whatVedicAstrology} {t.home.canDoForYou}
              </h2>
              <p className="text-base leading-relaxed text-silver sm:text-lg">{t.home.astrologyDescription}</p>
              <ul className="mt-2 flex flex-col border-t border-cosmic-border" role="list">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 border-b border-cosmic-border py-3.5 text-[15px] text-silver">
                    <Diamond />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="card-cosmic m-0 p-8 sm:p-10">
              <span className="block font-serif text-6xl leading-none text-gold-light" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="mt-2 font-serif text-2xl italic leading-relaxed text-cream sm:text-[28px]">
                {t.home.practicalDescription}
              </blockquote>
              <figcaption className="eyebrow mt-6 text-muted">— {t.home.ancientWisdom}</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <CtaBand
        id="about-cta-heading"
        title={`${t.home.readyToFind} ${t.home.cosmicDirection}`}
        description={t.home.finalDescription}
        primary={{ href: '/appointment', label: t.home.bookConsultation }}
        secondary={{ href: '/services', label: t.nav.services }}
      />
    </>
  )
}
