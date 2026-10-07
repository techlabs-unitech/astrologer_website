'use client'

import {
  format,
  addDays,
  isBefore,
  startOfDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

interface DateSelectorProps {
  selected: string          // YYYY-MM-DD or ''
  onSelect: (date: string) => void
  viewMonth: Date           // which month is currently displayed
  onPrevMonth: () => void
  onNextMonth: () => void
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const today = startOfDay(new Date())
// Allow bookings up to 90 days ahead
const maxDate = addDays(today, 90)

export default function DateSelector({
  selected,
  onSelect,
  viewMonth,
  onPrevMonth,
  onNextMonth,
}: DateSelectorProps) {
  const { t } = useLanguage()
  const monthStart = startOfMonth(viewMonth)
  const monthEnd   = endOfMonth(viewMonth)
  const days       = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Leading blank cells so the grid starts on the correct weekday
  const leadingBlanks = getDay(monthStart) // 0 = Sun

  const selectedDate = selected ? startOfDay(new Date(selected + 'T00:00:00')) : null

  // Can we go back? Not before the month containing today
  const canGoPrev = !isBefore(
    startOfMonth(addDays(monthStart, -1)),
    startOfMonth(today)
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          disabled={!canGoPrev}
          aria-label={t.common.back}
          className="w-8 h-8 rounded-full border border-cosmic-border flex items-center justify-center text-silver hover:text-cream hover:border-violet/40 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-gold-bright"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        <h3 className="font-serif text-cream font-semibold text-sm">
          {format(viewMonth, 'MMMM yyyy')}
        </h3>

        <button
          type="button"
          onClick={onNextMonth}
          aria-label={t.common.continue}
          className="w-8 h-8 rounded-full border border-cosmic-border flex items-center justify-center text-silver hover:text-cream hover:border-violet/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold-bright"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1" role="row">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold text-muted uppercase tracking-widest py-1"
            role="columnheader"
            aria-label={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div
        className="grid grid-cols-7 gap-1"
        role="grid"
        aria-label={`${format(viewMonth, 'MMMM yyyy')} calendar`}
      >
        {/* Leading blanks */}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} role="gridcell" aria-hidden="true" />
        ))}

        {days.map((day) => {
          const isPast      = isBefore(day, today)
          const isTooFar    = isBefore(maxDate, day)
          const isDisabled  = isPast || isTooFar
          const isSelected  = selectedDate ? isSameDay(day, selectedDate) : false
          const isToday     = isSameDay(day, today)
          const dateStr     = format(day, 'yyyy-MM-dd')

          return (
            <div key={dateStr} role="gridcell">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onSelect(dateStr)}
                aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                aria-pressed={isSelected}
                aria-disabled={isDisabled}
                className={`
                  w-full aspect-square rounded-lg text-xs font-medium
                  flex items-center justify-center
                  transition-all duration-150
                  focus-visible:outline-2 focus-visible:outline-gold-bright focus-visible:outline-offset-1
                  ${isDisabled
                    ? 'text-muted/30 cursor-not-allowed'
                    : isSelected
                      ? 'bg-gold text-cosmic-black shadow-glow-gold font-bold'
                      : isToday
                        ? 'border border-violet/60 text-violet-glow hover:bg-violet/20'
                        : 'text-silver hover:bg-violet/15 hover:text-cream'
                  }
                `}
              >
                {format(day, 'd')}
              </button>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted mt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gold inline-block" aria-hidden="true" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-violet/60 inline-block" aria-hidden="true" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-muted/10 inline-block" aria-hidden="true" />
          Unavailable
        </span>
      </div>
    </div>
  )
}
