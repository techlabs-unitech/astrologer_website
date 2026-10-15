import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import AppointmentForm from '@/components/appointment/AppointmentForm'
import { SERVICE_SLUG_MAP } from '@/lib/validations'
import type { AvailableService } from '@/lib/validations'
import { Sparkles, Shield, Clock, Star } from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book a personalised Vedic astrology consultation. Choose your service, select a date and time, and confirm your appointment online.',
}

// ─── Page props ───────────────────────────────────────────────────────────────

interface AppointmentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AppointmentPage({ searchParams }: AppointmentPageProps) {
  const params = await searchParams
  const slug = typeof params.service === 'string' ? params.service : ''

  // Resolve slug → service name (validated against allow-list)
  const preselectedService: AvailableService | '' =
    SERVICE_SLUG_MAP[slug] ?? ''

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        aria-label="Appointment"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-52 bg-violet/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/6 blur-[80px]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold-bright text-xs font-semibold tracking-[0.2em] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <LocalizedCopy id="appointmentBadge" />
            </div>

            <h1 className="heading-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
              <LocalizedCopy id="appointmentTitlePrefix" />{' '}
              <span className="text-gradient-gold"><LocalizedCopy id="appointmentTitleHighlight" /></span>
            </h1>

            <p className="text-silver text-lg leading-relaxed mb-8 max-w-xl">
              <LocalizedCopy id="appointmentDescription" />
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, text: 'appointmentConfidential' as const },
                { icon: Clock,  text: 'appointmentResponse' as const },
                { icon: Star,   text: 'appointmentReading' as const },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-muted">
                  <Icon className="w-3.5 h-3.5 text-gold-bright" aria-hidden="true" />
                  <LocalizedCopy id={text} />
                </div>
              ))}
            </div>
          </div>
        </Container>

        <span className="divider-gold absolute bottom-0 inset-x-0 opacity-40" aria-hidden="true" />
      </section>

      {/* ── Booking form ─────────────────────────────────────────────── */}
      <section
        className="section-padding bg-section-dark relative"
        aria-labelledby="booking-form-heading"
      >
        <span className="divider-violet absolute top-0 inset-x-0" aria-hidden="true" />

        <Container size="default">
          <h2 id="booking-form-heading" className="sr-only">
            <LocalizedCopy id="appointmentForm" />
          </h2>

          {/* AppointmentForm is a client component that manages all 4 steps */}
          <AppointmentForm preselectedService={preselectedService} />
        </Container>
      </section>
    </>
  )
}
