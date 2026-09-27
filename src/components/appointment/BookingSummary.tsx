import { format, parseISO } from 'date-fns'
import { CalendarDays, Clock, User, Mail, Phone, FileText, Star } from 'lucide-react'
import { formatTimeSlot } from '@/lib/appointment-utils'
import { STATIC_PRODUCTS } from '@/lib/shop-data'
import { useLanguage } from '@/components/LanguageProvider'

interface BookingSummaryProps {
  service: string
  date: string          // YYYY-MM-DD
  time: string          // HH:MM
  name: string
  email: string
  phone: string
  notes: string
  onBack: () => void
  onConfirm: () => void
  submitting: boolean
  error: string
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gold-bright" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-muted text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-cream text-sm font-medium break-words">{value}</span>
      </div>
    </div>
  )
}

export default function BookingSummary({
  service,
  date,
  time,
  name,
  email,
  phone,
  notes,
  onBack,
  onConfirm,
  submitting,
  error,
}: BookingSummaryProps) {
  const { t } = useLanguage()
  const product = STATIC_PRODUCTS.find((p) => p.name === service)
  const formattedDate = format(parseISO(date), 'EEEE, d MMMM yyyy')
  const formattedTime = formatTimeSlot(time)

  return (
    <div className="flex flex-col gap-6">
      <div className="card-cosmic p-6 flex flex-col gap-5">
        {/* Service highlight */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-cosmic-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-sm">
              <Star className="w-5 h-5 text-white fill-current" aria-hidden="true" />
            </div>
            <div>
              <p className="text-muted text-[10px] uppercase tracking-widest mb-0.5">{t.common.service}</p>
              <p className="text-cream font-serif font-semibold text-base leading-tight">{service}</p>
            </div>
          </div>
          {product && (
            <span className="font-serif text-xl font-bold text-gradient-gold shrink-0">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Detail rows */}
        <div className="grid sm:grid-cols-2 gap-4">
          <SummaryRow icon={CalendarDays} label={t.common.date}  value={formattedDate} />
          <SummaryRow icon={Clock}        label={t.common.time}  value={`${formattedTime} IST`} />
          <SummaryRow icon={User}         label={t.common.name}  value={name} />
          <SummaryRow icon={Mail}         label={t.common.email} value={email} />
          <SummaryRow icon={Phone}        label={t.common.phone} value={phone} />
        </div>

        {notes.trim() && (
          <div className="flex items-start gap-3 pt-2 border-t border-cosmic-border">
            <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-gold-bright" aria-hidden="true" />
            </div>
            <div>
              <span className="text-muted text-[10px] uppercase tracking-widest block mb-1">{t.common.notesQuestions}</span>
              <p className="text-silver text-sm leading-relaxed">{notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Info note */}
      <p className="text-muted text-xs leading-relaxed text-center">
        {t.home.finalDescription}
      </p>

      {/* Server error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300 flex items-start gap-2"
        >
          <span className="shrink-0 mt-0.5" aria-hidden="true">⚠</span>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="btn-secondary flex-1 text-sm"
        >
          {t.common.backAndEdit}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          aria-busy={submitting}
          className="btn-primary flex-1 text-sm"
        >
          {submitting ? (
            <>
              <span
                className="inline-block w-4 h-4 border-2 border-cosmic-black border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
              {t.common.confirming}
            </>
          ) : (
            t.common.confirmAppointment
          )}
        </button>
      </div>
    </div>
  )
}
