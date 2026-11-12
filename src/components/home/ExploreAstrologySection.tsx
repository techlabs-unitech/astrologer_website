'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import CardCarousel from '@/components/ui/CardCarousel'
import { NakshatraArt, NavagrahaArt, ZodiacWheelArt } from '@/components/astrology/AstrologyArt'
import { useLanguage } from '@/components/LanguageProvider'
import { ASTROLOGY_SECTIONS, GRAHAS, NAKSHATRAS, RASHIS } from '@/lib/astrology-data'
import { localName } from '@/lib/astrology-names'
import { translations } from '@/translations/translations'

interface ExploreCard {
  key: string
  number: string
  title: string
  /** Small spaced-capitals line under the title */
  kicker: string
  description: string
  range: string
  href: string
  art: ReactNode
}

function ExploreCardView({ card, cta }: { card: ExploreCard; cta: string }) {
  return (
    <article className="card-cosmic flex h-full flex-col overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-night">{card.art}</div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-3xl font-bold text-cream">{card.title}</h3>
          <span className="font-serif text-xl italic text-gold" aria-hidden="true">
            {card.number}
          </span>
        </div>
        <p className="eyebrow text-muted">{card.kicker}</p>
        <p className="text-[15px] leading-relaxed text-silver">{card.description}</p>
        <p className="text-[15px] text-gold">{card.range}</p>
        <Link
          href={card.href}
          className="group mt-auto flex min-h-[48px] items-center justify-between border-t border-cosmic-border pt-4 text-[15px] font-semibold text-cream transition-colors hover:text-gold"
        >
          {cta}
          <span className="sr-only">: {card.title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default function ExploreAstrologySection() {
  const { t, language } = useLanguage()
  const e = t.explore
  const english = translations.en.explore
  // Kannada / Telugu cards carry the English name as their kicker, like the
  // Panchanga mock; English cards use the tagline instead.
  const kicker = (englishTitle: string, tagline: string) => (language === 'en' ? tagline : englishTitle)
  const span = <T extends { name: Parameters<typeof localName>[0] }>(items: T[]) =>
    `${localName(items[0].name, language)} → ${localName(items[items.length - 1].name, language)}`

  const cards: ExploreCard[] = [
    {
      key: 'zodiac',
      number: '01',
      title: e.zodiacTitle,
      kicker: kicker(english.zodiacTitle, e.zodiacTagline),
      description: e.zodiacDescription,
      range: `${e.zodiacTagline} · ${span(RASHIS)}`,
      href: `/astrology#${ASTROLOGY_SECTIONS.zodiac}`,
      art: <ZodiacWheelArt title={e.zodiacTitle} />,
    },
    {
      key: 'nakshatras',
      number: '02',
      title: e.nakshatraTitle,
      kicker: kicker(english.nakshatraTitle, e.nakshatraTagline),
      description: e.nakshatraDescription,
      range: `${e.nakshatraTagline} · ${span(NAKSHATRAS)}`,
      href: `/astrology#${ASTROLOGY_SECTIONS.nakshatras}`,
      art: <NakshatraArt title={e.nakshatraTitle} />,
    },
    {
      key: 'grahas',
      number: '03',
      title: e.grahaTitle,
      kicker: kicker(english.grahaTitle, e.grahaTagline),
      description: e.grahaDescription,
      range: `${e.grahaTagline} · ${span(GRAHAS)}`,
      href: `/astrology#${ASTROLOGY_SECTIONS.grahas}`,
      art: <NavagrahaArt title={e.grahaTitle} />,
    },
  ]

  return (
    <section className="section-padding bg-cosmic-black" aria-labelledby="explore-heading">
      <Container size="wide">
        <SectionHeading
          id="explore-heading"
          label={e.label}
          title={e.title}
          subtitle={e.subtitle}
          layout="split"
          className="mb-12"
        />

        <CardCarousel
          labels={{ region: e.carouselLabel, previous: e.previous, next: e.next, goToSlide: e.goToSlide }}
          slideClassName="w-[86%] sm:w-[58%] lg:w-[calc((100%-3rem)/3)]"
          slides={cards.map((card) => ({
            key: card.key,
            label: card.title,
            content: <ExploreCardView card={card} cta={t.common.learnMore} />,
          }))}
        />
      </Container>
    </section>
  )
}
