'use client'

import Container from '@/components/ui/Container'
import CtaBand from '@/components/ui/CtaBand'
import { NakshatraArt, NavagrahaArt, ZodiacWheelArt } from '@/components/astrology/AstrologyArt'
import { useLanguage } from '@/components/LanguageProvider'
import {
  ASTROLOGY_SECTIONS,
  GRAHAS,
  NAKSHATRAS,
  RASHIS,
  getGraha,
  getRashisRuledBy,
  type Element,
} from '@/lib/astrology-data'
import { localName, westernName } from '@/lib/astrology-names'

function SectionIntro({
  id,
  number,
  title,
  intro,
  art,
}: {
  id: string
  number: string
  title: string
  intro: string
  art: React.ReactNode
}) {
  return (
    <div className="mb-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
      <div className="flex flex-col gap-4">
        <span className="font-serif text-2xl italic text-gold" aria-hidden="true">
          {number}
        </span>
        <h2 id={`${id}-heading`} className="heading-serif text-3xl font-bold sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">{intro}</p>
      </div>
      <div className="hidden aspect-[4/3] overflow-hidden rounded-card border border-cosmic-border bg-night lg:block">
        {art}
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-t border-cosmic-border py-2 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-cream">{value}</dd>
    </div>
  )
}

export default function AstrologyGuide() {
  const { t, language } = useLanguage()
  const e = t.explore
  const p = t.astrologyPage
  const elementLabel: Record<Element, string> = { fire: e.fire, earth: e.earth, air: e.air, water: e.water }
  const grahaName = (id: Parameters<typeof getGraha>[0]) => localName(getGraha(id).name, language)

  const sections = [
    { id: ASTROLOGY_SECTIONS.zodiac, title: e.zodiacTitle },
    { id: ASTROLOGY_SECTIONS.nakshatras, title: e.nakshatraTitle },
    { id: ASTROLOGY_SECTIONS.grahas, title: e.grahaTitle },
  ]

  return (
    <>
      {/* Hero */}
      <section className="border-b border-cosmic-border bg-cosmic-deep pb-14 pt-32 sm:pt-36" aria-labelledby="astrology-heading">
        <Container size="wide">
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="eyebrow">{p.label}</span>
            <h1 id="astrology-heading" className="heading-serif text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
              {p.title}
            </h1>
            <p className="text-base leading-relaxed text-silver sm:text-lg">{p.intro}</p>
          </div>

          <nav aria-label={p.onThisPage} className="mt-10">
            <ul className="flex flex-wrap gap-3" role="list">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-[44px] items-center gap-3 rounded-lg border border-cosmic-border bg-cosmic-card px-4 text-[15px] font-semibold text-cream transition-colors hover:border-gold-light hover:text-gold"
                  >
                    <span className="font-serif italic text-gold" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Rashis */}
      <section
        id={ASTROLOGY_SECTIONS.zodiac}
        className="section-padding scroll-mt-20 bg-cosmic-black"
        aria-labelledby={`${ASTROLOGY_SECTIONS.zodiac}-heading`}
      >
        <Container size="wide">
          <SectionIntro
            id={ASTROLOGY_SECTIONS.zodiac}
            number="01"
            title={e.zodiacTitle}
            intro={e.zodiacIntro}
            art={<ZodiacWheelArt title={e.zodiacTitle} />}
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list">
            {RASHIS.map((rashi, index) => (
              <li key={rashi.id} className="card-cosmic flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/70 font-symbol text-xl text-gold"
                  >
                    {rashi.symbol}
                  </span>
                  <span className="font-serif text-lg italic text-muted" aria-hidden="true">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream">{localName(rashi.name, language)}</h3>
                  <p className="text-sm text-muted">{westernName(rashi.name)}</p>
                </div>
                <dl className="mt-auto">
                  <Fact label={e.lord} value={grahaName(rashi.lord)} />
                  <Fact label={e.element} value={elementLabel[rashi.element]} />
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Nakshatras */}
      <section
        id={ASTROLOGY_SECTIONS.nakshatras}
        className="section-padding scroll-mt-20 border-y border-cosmic-border bg-cosmic-deep"
        aria-labelledby={`${ASTROLOGY_SECTIONS.nakshatras}-heading`}
      >
        <Container size="wide">
          <SectionIntro
            id={ASTROLOGY_SECTIONS.nakshatras}
            number="02"
            title={e.nakshatraTitle}
            intro={e.nakshatraIntro}
            art={<NakshatraArt title={e.nakshatraTitle} />}
          />
          <ol className="grid grid-cols-1 border-l border-t border-cosmic-border sm:grid-cols-2 lg:grid-cols-3" role="list">
            {NAKSHATRAS.map((nakshatra, index) => (
              <li
                key={nakshatra.id}
                className="flex items-center gap-4 border-b border-r border-cosmic-border bg-cosmic-card px-5 py-4"
              >
                <span className="w-8 shrink-0 font-serif text-xl italic text-gold" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 text-[17px] font-semibold text-cream">
                  {localName(nakshatra.name, language)}
                </span>
                <span className="text-right text-sm text-muted">
                  <span className="sr-only">{e.lord}: </span>
                  <span aria-hidden="true" className="mr-1.5 font-symbol text-gold">
                    {getGraha(nakshatra.lord).symbol}
                  </span>
                  {grahaName(nakshatra.lord)}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Grahas */}
      <section
        id={ASTROLOGY_SECTIONS.grahas}
        className="section-padding scroll-mt-20 bg-cosmic-black"
        aria-labelledby={`${ASTROLOGY_SECTIONS.grahas}-heading`}
      >
        <Container size="wide">
          <SectionIntro
            id={ASTROLOGY_SECTIONS.grahas}
            number="03"
            title={e.grahaTitle}
            intro={e.grahaIntro}
            art={<NavagrahaArt title={e.grahaTitle} />}
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {GRAHAS.map((graha) => {
              const ruled = getRashisRuledBy(graha.id)
              return (
                <li key={graha.id} className="card-cosmic flex flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-14 w-14 items-center justify-center rounded-full font-symbol text-2xl ${
                        graha.id === 'surya'
                          ? 'bg-saffron text-night'
                          : 'border border-gold-light/70 text-gold'
                      }`}
                    >
                      {graha.symbol}
                    </span>
                    {graha.shadow && <span className="badge-violet">{e.shadowGraha}</span>}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-cream">{localName(graha.name, language)}</h3>
                    <p className="text-sm text-muted">{westernName(graha.name)}</p>
                  </div>
                  <dl className="mt-auto">
                    <Fact label={e.day} value={graha.day ? graha.day[language] : '—'} />
                    <Fact
                      label={e.rules}
                      value={ruled.length ? ruled.map((r) => localName(r.name, language)).join(', ') : e.noRashis}
                    />
                  </dl>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={p.ctaTitle}
        description={p.ctaDescription}
        primary={{ href: '/appointment', label: t.home.bookConsultation }}
      />
    </>
  )
}
