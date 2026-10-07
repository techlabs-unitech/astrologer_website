import { Clock } from 'lucide-react'
import { TIME_SLOTS, formatTimeSlot } from '@/lib/appointment-utils'
import { useLanguage } from '@/components/LanguageProvider'

interface TimeSlotSelectorProps {
  selectedDate: string    // YYYY-MM-DD
  selected: string        // HH:MM or ''
  bookedSlots: string[]   // HH:MM slots already taken on selectedDate
  onSelect: (time: string) => void
}

export default function TimeSlotSelector({
  selectedDate,
  selected,
  bookedSlots,
  onSelect,
}: TimeSlotSelectorProps) {
  const { t } = useLanguage()
  // Disable slots that are in the past for today
  const todayStr = new Date().toISOString().slice(0, 10)
  const isToday = selectedDate === todayStr
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-silver">
        <Clock className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
        <span>{t.common.time}: <strong className="text-cream">IST (Asia/Kolkata)</strong></span>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="group"
        aria-label="Available time slots"
      >
        {TIME_SLOTS.map((slot) => {
          const isBooked = bookedSlots.includes(slot)
          const isPast = isToday && (() => {
            const [h, m] = slot.split(':').map(Number)
            return (h * 60 + m) <= nowMinutes
          })()
          const isDisabled = isBooked || isPast
          const isSelected = selected === slot

          let statusLabel = ''
          if (isBooked) statusLabel = ' (fully booked)'
          else if (isPast) statusLabel = ' (past)'

          return (
            <button
              key={slot}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(slot)}
              aria-pressed={isSelected}
              aria-label={`${formatTimeSlot(slot)}${statusLabel}`}
              aria-disabled={isDisabled}
              className={`
                rounded-xl px-3 py-3 text-sm font-medium text-center
                border transition-all duration-200
                focus-visible:outline-2 focus-visible:outline-gold-bright focus-visible:outline-offset-2
                ${isDisabled
                  ? 'border-cosmic-border text-muted/30 cursor-not-allowed bg-transparent line-through'
                  : isSelected
                    ? 'border-gold bg-gold text-cosmic-black shadow-glow-gold font-bold'
                    : 'border-cosmic-border text-silver hover:border-violet/50 hover:bg-violet/10 hover:text-cream'
                }
              `}
            >
              {formatTimeSlot(slot)}
              {isBooked && (
                <span className="block text-[10px] text-muted/50 mt-0.5 normal-case no-underline">
                  Booked
                </span>
              )}
            </button>
          )
        })}
      </div>

      {bookedSlots.length > 0 && (
        <p className="text-xs text-muted">
          Booked slots are shown but cannot be selected. Please choose an available time.
        </p>
      )}
    </div>
  )
}
