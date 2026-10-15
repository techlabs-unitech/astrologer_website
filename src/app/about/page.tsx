'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import {
  Star,
  Award,
  Users,
  BookOpen,
  Heart,
  Briefcase,
  Shield,
  Eye,
  Compass,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Scroll,
} from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { SERVICE_VISUALS } from '@/lib/services-meta'

// ─── Metadata ─────────────────────────────────────────────────────────────────

// ─── Static data ──────────────────────────────────────────────────────────────

const CREDENTIALS = [
  {
    icon: Clock,
    value: '10+',
    label: 'Years of Practice',
    description: 'A decade of dedicated Jyotish study and active client consultations.',
  },
  {
    icon: Users,
    value: '1,000+',
    label: 'Consultations',
    description: 'Clients from across India and more than 20 countries served.',
  },
  {
    icon: BookOpen,
    value: 'Classical',
    label: 'Trained Lineage',
    description: 'Rooted in Brihat Parashara Hora Shastra and Jaimini traditions.',
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Confidential',
    description: 'Every consultation held in complete professional confidence.',
  },
]

const EXPERTISE = [
  {
    icon: BookOpen,
    title: 'Birth Chart Analysis',
    description:
      'A comprehensive reading of your natal chart — planets, houses, yogas, and the karmic blueprint that shapes your life.',
    color: 'from-violet to-violet-bright',
  },
  {
    icon: Heart,
    title: 'Relationship Astrology',
    description:
      'Synastry and composite chart analysis for understanding compatibility, karmic bonds, and partnership dynamics.',
    color: 'from-gold-dim to-gold',
  },
  {
    icon: Briefcase,
    title: 'Career & Finance',
    description:
      'Identifying your natural vocational strengths, optimal career timing, and financial cycles through Dashas and transits.',
    color: 'from-violet-bright to-violet-glow',
  },
  {
    icon: Compass,
    title: 'Marriage Compatibility',
    description:
      'Traditional Ashtakoot and Dashakoot matching combined with chart analysis for deep compatibility assessment.',
    color: 'from-gold to-gold-bright',
  },
  {
    icon: Eye,
    title: 'Life Guidance',
    description:
      'Broad guidance on life purpose, health patterns, spiritual inclinations, and the major chapters ahead.',
    color: 'from-violet/80 to-violet-bright',
  },
  {
    icon: Star,
    title: 'Horoscope Reading',
    description:
      'Annual and monthly forecast reports using planetary transits and Dasha periods for practical planning.',
    color: 'from-gold-bright to-gold',
  },
]

const MISSION_POINTS = [
  'Provide clarity, not fear — the chart is a map, not a sentence',
  'Ground every reading in classical texts and honest interpretation',
  'Offer practical, actionable guidance alongside astrological insight',
  'Treat each consultation as a unique, deeply personal conversation',
  'Respect and protect client privacy at every stage',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { t } = useLanguage()
  void CREDENTIALS
  void EXPERTISE
  void MISSION_POINTS
  const credentials = [
    { icon: Clock, value: '10+', label: t.home.yearsOfExperience, description: t.home.experiencedDescription },
    { icon: Users, value: '1,000+', label: t.home.consultationsCompleted, description: t.home.personalisedDescription },
    { icon: BookOpen, value: 'Classical', label: t.home.ancientWisdom, description: t.home.astrologyDescription },
    { icon: Shield, value: '100%', label: t.home.confidential, description: t.home.confidentialDescription },
  ]
  const expertise = t.services.servicesList.map((item, index) => ({
    ...item,
    ...SERVICE_VISUALS[index],
  }))
  const missionPoints = [t.home.understandStrengths, t.home.majorDecisions, t.home.relationshipPatterns, t.home.personalisedRemedies, t.home.practicalDescription]
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          A. PAGE HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-label="About page hero"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-violet/10 blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gold/6 blur-[90px]" />
        </div>

        {/* Decorative rings — desktop */}
        <div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          {[240, 180, 120].map((size, i) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/15"
              style={{
                width: size,
                height: size,
                animation: `rotate-slow ${20 + i * 8}s linear infinite ${i % 2 ? 'reverse' : ''}`,
              }}
            />
          ))}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-violet/30 to-gold/20 border border-violet/30 flex items-center justify-center">
            <Scroll className="w-8 h-8 text-gold-bright" />
          </div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t.home.ourAstrology}
            </div>

            <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.home.guidanceYouCan}{' '}
              <span className="text-gradient-gold">{t.home.trust}</span>
            </h1>

            <p className="text-silver text-lg leading-relaxed max-w-xl">
              {t.home.finalDescription}
            </p>
          </div>
        </Container>

        <span
          className="divider-gold absolute bottom-0 inset-x-0 opacity-40"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          B. ASTROLOGER INTRODUCTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="astrologer-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: decorative portrait composition ── */}
            <div
              className="relative flex items-center justify-center min-h-[340px]"
              aria-hidden="true"
            >
              {/* Outer decorative rings */}
              {[320, 256, 192].map((size, i) => (
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

              {/* Portrait frame */}
              <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-violet/40 shadow-glow-violet">
                <Image
                  src="/images/astrologer-portrait.png"
                  alt="Portrait of the astrologer"
                  fill
                  sizes="(max-width: 640px) 208px, 240px"
                  className="object-cover"
                  priority
                />
                {/* Stars overlay */}
                {[
                  { style: { top: '18%', left: '22%' } },
                  { style: { top: '12%', right: '20%' } },
                  { style: { top: '35%', right: '14%' } },
                ].map(({ style }, i) => (
                  <Star
                    key={i}
                    className="absolute w-3 h-3 text-gold-bright fill-current animate-twinkle drop-shadow"
                    style={{ ...style, animationDelay: `${i * 0.8}s` }}
                  />
                ))}
              </div>

              {/* Floating zodiac symbols */}
              {[
                { sym: '♈', cls: 'top-6  left-6',  delay: '0s' },
                { sym: '♌', cls: 'top-6  right-6', delay: '1s' },
                { sym: '♎', cls: 'bottom-6 left-6', delay: '2s' },
                { sym: '♓', cls: 'bottom-6 right-6', delay: '3s' },
              ].map(({ sym, cls, delay }) => (
                <span
                  key={sym}
                  className={`absolute ${cls} text-2xl text-violet-light/30 font-serif animate-twinkle-slow`}
                  style={{ animationDelay: delay }}
                >
                  {sym}
                </span>
              ))}

              {/* Award badge */}
              <div className="absolute -bottom-2 right-8 glass rounded-xl px-3 py-2 flex items-center gap-2 border border-gold/30">
                <Award className="w-4 h-4 text-gold-bright" />
                <span className="text-xs font-semibold text-cream">
                  {t.home.experiencedGuidance}
                </span>
              </div>
            </div>

            {/* ── Right: bio text ── */}
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-bright">
                <span className="glow-dot" aria-hidden="true" />
                {t.home.whatWeOffer}
              </span>

              <h2
                id="astrologer-heading"
                className="heading-serif text-3xl sm:text-4xl font-bold"
              >
                {t.home.ancientWisdom},{' '}
                <span className="text-gradient-gold">{t.home.personalisedInsights}</span>
              </h2>

              <p className="text-silver leading-relaxed">
                {t.home.astrologyDescription}
              </p>

              <p className="text-muted text-sm leading-relaxed">
                {t.home.astrologyDescription2}{' '}
                <em className="text-gold-bright not-italic">
                  Brihat Parashara Hora Shastra
                </em>{' '}
                {t.home.experiencedDescription}
              </p>

              <p className="text-muted text-sm leading-relaxed">
                {t.home.personalisedDescription}
              </p>

              {/* Key facts */}
              <ul className="grid grid-cols-2 gap-3 mt-1" role="list">
                {[
                  t.home.experiencedGuidance,
                  t.home.yearsOfExperience,
                  t.home.ancientWisdom,
                  t.home.countriesServed,
                  t.home.confidentialConsultations,
                  t.home.detailedBirthChart,
                ].map((fact) => (
                  <li
                    key={fact}
                    className="flex items-center gap-2 text-sm text-silver"
                  >
                    <CheckCircle
                      className="w-3.5 h-3.5 text-gold-bright shrink-0"
                      aria-hidden="true"
                    />
                    {fact}
                  </li>
                ))}
              </ul>

              <Link
                href="/appointment"
                className="btn-primary w-fit text-sm mt-2"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {t.home.bookConsultation}
              </Link>
            </div>
          </div>
        </Container>

        <span
          className="divider-gold absolute bottom-0 inset-x-0 opacity-30"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          C. CREDENTIALS & EXPERIENCE
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding"
        aria-labelledby="credentials-heading"
      >
        <Container>
          <SectionHeading
            id="credentials-heading"
            label={t.home.experiencedGuidance}
            title={t.home.guidanceYouCan}
            highlight={t.home.trust}
            subtitle={t.home.whyChooseSubtitle}
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((c) => {
              const Icon = c.icon
              return (
                <Card key={c.label} accent className="p-6 flex flex-col gap-4 text-center items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-bright" aria-hidden="true" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gradient-gold">
                    {c.value}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-cream font-semibold text-sm">{c.label}</p>
                    <p className="text-muted text-xs leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          D. AREAS OF EXPERTISE
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="expertise-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/6 blur-[100px]" />
        </div>

        <Container className="relative z-10">
          <SectionHeading
            id="expertise-heading"
            label={t.home.whatWeOffer}
            title={t.home.ourAstrology}
            highlight={t.home.services}
            subtitle={t.home.servicesSubtitle}
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  variant="bare"
                  className="group flex flex-col"
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative h-28 w-full overflow-hidden bg-gradient-to-br ${item.thumbClass}`}
                    aria-hidden="true"
                  >
                    <span className="absolute -right-2 -bottom-4 text-6xl leading-none font-serif text-white/15 select-none">
                      {item.glyph}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-xl bg-black/20 border border-white/25 backdrop-blur-sm flex items-center justify-center shadow-glow-sm">
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-6 flex-1">
                  <h3 className="font-serif text-cream font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-bright hover:text-gold transition-colors group-hover:gap-2 duration-200"
                  >
                    {t.common.learnMore}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
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

      {/* ══════════════════════════════════════════════════════════════
          E. OUR MISSION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding"
        aria-labelledby="mission-heading"
      >
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: heading + statement */}
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-bright">
                <span className="glow-dot" aria-hidden="true" />
                {t.home.ancientWisdom}
              </span>

              <h2
                id="mission-heading"
                className="heading-serif text-3xl sm:text-4xl font-bold"
              >
                {t.home.whatVedicAstrology}{' '}
                <span className="text-gradient-gold">{t.home.canDoForYou}</span>
              </h2>

              <p className="text-silver leading-relaxed">
                {t.home.astrologyDescription}
              </p>

              <p className="text-muted text-sm leading-relaxed">
                {t.home.finalDescription}
              </p>

              {/* Mission points */}
              <ul className="flex flex-col gap-3 mt-2" role="list">
                {missionPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-silver"
                  >
                    <span
                      className="mt-1 w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <Star className="w-2.5 h-2.5 text-gold-bright fill-current" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: decorative quote card */}
            <div className="flex flex-col gap-6">
              <div className="glass rounded-2xl border border-violet/30 p-8 relative overflow-hidden">
                {/* Ambient glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 bg-gold/8 blur-[60px] pointer-events-none"
                  aria-hidden="true"
                />

                <span
                  className="block font-serif text-5xl text-gold/30 leading-none mb-4 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="text-cream font-serif text-lg sm:text-xl leading-relaxed italic mb-6">
                  {t.home.practicalDescription}
                </blockquote>
                <p className="text-muted text-xs tracking-widest uppercase">
                  — {t.home.ancientWisdom}
                </p>

                {/* Divider */}
                <span
                  className="divider-gold block mt-6 opacity-40"
                  aria-hidden="true"
                />

                {/* Approach summary */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: BookOpen, label: t.home.ancientWisdom },
                    { icon: Eye,      label: t.home.personalisedInsights },
                    { icon: Users,    label: t.home.clientSatisfaction },
                    { icon: Shield,   label: t.home.confidential },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon
                        className="w-4 h-4 text-gold-bright shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-silver">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          F. CTA
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="about-cta-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-violet/12 blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-28 bg-gold/8 blur-[60px]" />
        </div>

        <Container size="sm" className="relative z-10">
          <div className="glass rounded-3xl border border-violet/30 px-6 sm:px-12 py-14 text-center flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-violet">
              <Star className="w-6 h-6 text-white fill-current" aria-hidden="true" />
            </div>

            <h2
              id="about-cta-heading"
              className="heading-serif text-3xl sm:text-4xl font-bold text-balance"
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
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {t.home.bookConsultation}
              </Link>
              <Link
                href="/shop"
                className="btn-secondary text-sm px-8 py-3.5"
              >
                {t.nav.services}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-muted text-xs flex items-center gap-2 mt-1">
              <Shield className="w-3.5 h-3.5 text-gold/60" aria-hidden="true" />
              {t.home.confidential} &bull; {t.home.personalised} &bull; {t.home.ancientWisdom}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
