'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import ContactForm from '@/components/contact/ContactForm'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

// ─── Metadata ─────────────────────────────────────────────────────────────────

// ─── Static data ──────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone',
    primary: '+91 98765 43210',
    secondary: 'Mon – Sat, 10 AM – 7 PM',
    href: 'tel:+919876543210',
    color: 'from-violet to-violet-bright',
  },
  {
    icon: Mail,
    label: 'Email',
    primary: 'hello@saibabaastro.com',
    secondary: 'Typically replied within 24 hours',
    href: 'mailto:hello@saibabaastro.com',
    color: 'from-gold-dim to-gold',
  },
  {
    icon: MapPin,
    label: 'Location',
    primary: 'New Delhi, India',
    secondary: 'In-person & remote sessions',
    href: null,
    color: 'from-violet-bright to-violet-glow',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    primary: 'Mon – Sat: 10 AM – 7 PM',
    secondary: 'Sunday: by appointment only',
    href: null,
    color: 'from-gold to-gold-bright',
  },
]

const REASSURANCES = [
  {
    icon: Shield,
    title: 'Fully Confidential',
    body: 'Everything shared in a consultation — or in your message to us — is held in complete professional confidence.',
  },
  {
    icon: MessageCircle,
    title: 'Ask Before You Book',
    body: "Not sure which service is right for you? Send us a message first. We're happy to guide you to the most relevant option.",
  },
  {
    icon: CheckCircle,
    title: 'Professional Handling',
    body: 'Every enquiry is read personally and responded to thoughtfully. You will never receive a canned or automated reply.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { t } = useLanguage()
  const contactInfo = [
    { ...CONTACT_INFO[0], label: t.common.phone, secondary: t.home.confidentialDescription },
    { ...CONTACT_INFO[1], label: t.common.email, secondary: t.home.finalDescription },
    { ...CONTACT_INFO[2], label: t.home.getInTouch, secondary: t.home.personalisedDescription },
    { ...CONTACT_INFO[3], label: t.common.hours, secondary: t.common.sundayByAppointment },
  ]
  const reassurances = [
    { ...REASSURANCES[0], title: t.home.confidential, body: t.home.confidentialDescription },
    { ...REASSURANCES[1], title: t.home.getInTouch, body: t.home.servicesSubtitle },
    { ...REASSURANCES[2], title: t.home.experiencedGuidance, body: t.home.personalisedDescription },
  ]
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          A. PAGE HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-label={t.home.getInTouch}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 bg-violet/10 blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-gold/6 blur-[90px]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t.home.getInTouch}
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

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-40" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          B. CONTACT INFORMATION CARDS
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="contact-info-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container>
          <h2 id="contact-info-heading" className="sr-only">
            Contact information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item) => {
              const Icon = item.icon
              const inner = (
                <>
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-glow-sm shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-muted text-xs font-semibold uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-cream text-sm font-semibold leading-snug truncate">
                      {item.primary}
                    </p>
                    <p className="text-muted text-xs leading-relaxed">
                      {item.secondary}
                    </p>
                  </div>
                </>
              )

              // Make phone / email tappable
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="card-cosmic p-5 flex items-start gap-4 group hover:border-violet/40 focus-visible:outline-gold-bright"
                    aria-label={`${item.label}: ${item.primary}`}
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <Card
                  key={item.label}
                  variant="bare"
                  className="p-5 flex items-start gap-4"
                >
                  {inner}
                </Card>
              )
            })}
          </div>
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-30" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          C. CONTACT FORM + SIDEBAR
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding"
        aria-labelledby="contact-form-heading"
      >
        <Container>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">

            {/* ── Form panel ─────────────────────────────────────────── */}
            <div className="card-cosmic p-6 sm:p-8">
              <div className="mb-8">
                <h2
                  id="contact-form-heading"
                  className="heading-serif text-2xl sm:text-3xl font-bold mb-2"
                >
                  {t.home.getInTouch}
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {t.home.finalDescription}
                </p>
              </div>

              {/* Client component — form with RHF + Zod */}
              <ContactForm />
            </div>

            {/* ── Sidebar ────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-5" aria-label={t.home.getInTouch}>

              {/* Quick booking nudge */}
              <div className="glass rounded-2xl border border-violet/30 p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-sm">
                  <Calendar className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-cream font-semibold mb-1">
                    {t.home.bookConsultation}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {t.home.servicesSubtitle}
                  </p>
                </div>
                <Link href="/appointment" className="btn-primary text-xs px-5 py-2.5 w-fit">
                  {t.home.bookConsultation}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Working hours detail */}
              <div className="card-cosmic p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
                  <h3 className="font-serif text-cream font-semibold text-sm">
                    {t.common.hours}
                  </h3>
                </div>
                <ul className="flex flex-col gap-2" role="list">
                  {[
                    { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM' },
                    { day: 'Saturday',        hours: '10:00 AM – 5:00 PM' },
                    { day: 'Sunday',          hours: 'By appointment only' },
                  ].map(({ day, hours }) => (
                    <li
                      key={day}
                      className="flex items-center justify-between text-xs gap-4"
                    >
                      <span className="text-silver">{day}</span>
                      <span className="text-muted text-right">{hours}</span>
                    </li>
                  ))}
                </ul>
                <span className="divider-violet opacity-40" aria-hidden="true" />
                <p className="text-muted text-xs leading-relaxed">
                  Responses to email enquiries are typically sent within one
                  business day, even outside working hours.
                </p>
              </div>

              {/* Social / direct contact */}
              <div className="card-cosmic p-5 flex flex-col gap-3">
                <h3 className="font-serif text-cream font-semibold text-sm">
                  {t.home.getInTouch}
                </h3>
                <a
                  href="mailto:hello@saibabaastro.com"
                  className="flex items-center gap-2.5 text-xs text-muted hover:text-gold-bright transition-colors group"
                >
                  <Mail className="w-4 h-4 text-violet-bright group-hover:text-gold-bright transition-colors shrink-0" aria-hidden="true" />
                  hello@saibabaastro.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2.5 text-xs text-muted hover:text-gold-bright transition-colors group"
                >
                  <Phone className="w-4 h-4 text-violet-bright group-hover:text-gold-bright transition-colors shrink-0" aria-hidden="true" />
                  +91 98765 43210
                </a>
                <div className="flex items-start gap-2.5 text-xs text-muted">
                  <MapPin className="w-4 h-4 text-violet-bright shrink-0 mt-0.5" aria-hidden="true" />
                  New Delhi, India
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          D. REASSURANCE / FAQ-STYLE SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="reassurance-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container>
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-bright mb-4">
              <span className="glow-dot" aria-hidden="true" />
              {t.home.getInTouch}
              <span className="glow-dot" aria-hidden="true" />
            </span>
            <h2
              id="reassurance-heading"
              className="heading-serif text-2xl sm:text-3xl font-bold"
            >
              {t.home.whyChooseUs}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reassurances.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} accent className="p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-bright" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-cream font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.body}
                  </p>
                </Card>
              )
            })}
          </div>

          {/* Final nudge */}
          <p className="text-center text-muted text-sm mt-12">
            {t.home.bookConsultation}{' '}
            <Link
              href="/appointment"
              className="text-gold-bright hover:text-gold underline-offset-2 hover:underline transition-colors"
            >
              {t.common.appointmentForm}
            </Link>{' '}
            to choose a service, date, and time slot.
          </p>
        </Container>
      </section>
    </>
  )
}
