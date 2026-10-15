import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { CheckCircle2, CalendarDays, Clock, Star, Home, RotateCcw } from 'lucide-react'
import { formatTimeSlot } from '@/lib/appointment-utils'
import { useLanguage } from '@/components/LanguageProvider'

interface BookingConfirmationProps {
  service: string
  date: string      // YYYY-MM-DD
  time: string      // HH:MM
  name: string
  email: string
  onBookAnother: () => void
}

export default function BookingConfirmation({
  service,
  date,
  time,
  name,
  email,
  onBookAnother,
}: BookingConfirmationProps) {
  const { t } = useLanguage()
  const formattedDate = format(parseISO(date), 'EEEE, d MMMM yyyy')
  const formattedTime = formatTimeSlot(time)

  return (
    <div className="flex flex-col items-center gap-6 text-center py-4">
      {/* Success icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-violet/20 border border-gold/40 flex items-center justify-center shadow-glow-gold">
          <CheckCircle2 className="w-10 h-10 text-gold-bright" aria-hidden="true" />
        </div>
        {/* Orbit dots */}
        {[0, 120, 240].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const r = 44
          const x = 40 + r * Math.cos(rad - Math.PI / 2)
          const y = 40 + r * Math.sin(rad - Math.PI / 2)
          return (
            <span
              key={deg}
              className="absolute w-2 h-2 rounded-full bg-gold-bright animate-twinkle"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${deg / 120 * 0.6}s`,
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h3 className="heading-serif text-2xl sm:text-3xl font-bold">
          {t.common.appointmentForm}{' '}
          <span className="text-gradient-gold">{t.common.messageReceived}</span>
        </h3>
        <p className="text-silver text-sm max-w-sm leading-relaxed">
          {t.common.thankYouMessage} <strong className="text-cream">{name}</strong>{' '}
          <strong className="text-cream">{email}</strong>
        </p>
      </div>

      {/* Booking details card */}
      <div className="w-full max-w-sm glass rounded-2xl border border-violet/30 p-5 text-left flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-2 border-b border-cosmic-border">
          <Star className="w-4 h-4 text-gold-bright" aria-hidden="true" />
          <span className="text-cream text-sm font-semibold">{service}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-silver">
          <CalendarDays className="w-4 h-4 text-violet-bright shrink-0" aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-silver">
          <Clock className="w-4 h-4 text-violet-bright shrink-0" aria-hidden="true" />
          <span>{formattedTime} IST</span>
        </div>
        <div className="pt-2 border-t border-cosmic-border">
          <span className="badge-gold text-[10px]">{t.home.confidential}</span>
        </div>
      </div>

      <p className="text-muted text-xs max-w-sm leading-relaxed">
        {t.home.getInTouch}{' '}
        <a href="mailto:hello@saibabaastro.com" className="text-gold-bright hover:underline">
          hello@saibabaastro.com
        </a>{' '}
        with your booking details.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link href="/" className="btn-secondary flex-1 text-sm justify-center">
          <Home className="w-4 h-4" aria-hidden="true" />
          {t.nav.home}
        </Link>
        <button
          type="button"
          onClick={onBookAnother}
          className="btn-primary flex-1 text-sm"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          {t.common.bookNow}
        </button>
      </div>
    </div>
  )
}
