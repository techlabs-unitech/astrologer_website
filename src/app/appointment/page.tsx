import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHero from '@/components/ui/PageHero'
import AppointmentForm from '@/components/appointment/AppointmentForm'
import { SERVICE_SLUG_MAP } from '@/lib/validations'
import type { AvailableService } from '@/lib/validations'
import { Shield, Clock, Star } from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book a personalised Vedic astrology consultation. Choose your service, select a date and time, and confirm your appointment online.',
}

interface AppointmentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AppointmentPage({ searchParams }: AppointmentPageProps) {
  const params = await searchParams
  const slug = typeof params.service === 'string' ? params.service : ''

  // Resolve slug → service name (validated against allow-list)
  const preselectedService: AvailableService | '' = SERVICE_SLUG_MAP[slug] ?? ''

  return (
    <>
      <PageHero
        id="appointment-heading"
        label={<LocalizedCopy id="appointmentBadge" />}
        title={<LocalizedCopy id="appointmentTitlePrefix" />}
        highlight={<LocalizedCopy id="appointmentTitleHighlight" />}
        description={<LocalizedCopy id="appointmentDescription" />}
      >
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-3" role="list">
          {[
            { icon: Shield, text: 'appointmentConfidential' as const },
            { icon: Clock, text: 'appointmentResponse' as const },
            { icon: Star, text: 'appointmentReading' as const },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-sm text-silver">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
              <LocalizedCopy id={text} />
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section-padding bg-cosmic-black" aria-labelledby="booking-form-heading">
        <Container size="default">
          <h2 id="booking-form-heading" className="sr-only">
            <LocalizedCopy id="appointmentForm" />
          </h2>
          <AppointmentForm preselectedService={preselectedService} />
        </Container>
      </section>
    </>
  )
}
