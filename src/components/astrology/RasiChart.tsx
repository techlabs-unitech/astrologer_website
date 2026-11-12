'use client'

import { RASHIS } from '@/lib/astrology-data'
import { useLanguage } from '@/components/LanguageProvider'
import { localName, westernName } from '@/lib/astrology-names'

/**
 * South Indian rasi chart: a fixed 4×4 grid where each sign keeps its house,
 * starting with Meena top-left and running clockwise. The centre 2×2 holds
 * the chart title.
 */
const CELL_POSITIONS: Record<string, { row: number; col: number }> = {
  meena: { row: 1, col: 1 },
  mesha: { row: 1, col: 2 },
  vrishabha: { row: 1, col: 3 },
  mithuna: { row: 1, col: 4 },
  karka: { row: 2, col: 4 },
  simha: { row: 3, col: 4 },
  kanya: { row: 4, col: 4 },
  tula: { row: 4, col: 3 },
  vrishchika: { row: 4, col: 2 },
  dhanu: { row: 4, col: 1 },
  makara: { row: 3, col: 1 },
  kumbha: { row: 2, col: 1 },
}

const LINE = 'border border-cream/80 dark:border-gold/45'

export default function RasiChart({ className = '' }: { className?: string }) {
  const { t, language } = useLanguage()

  return (
    <figure
      className={`m-0 border border-gold-light/70 p-3 sm:p-4 dark:bg-night/50 ${className}`}
      aria-label={t.home.chartLabel}
    >
      <div className={`grid aspect-square grid-cols-4 grid-rows-4 ${LINE}`}>
        {RASHIS.map((rashi) => {
          const pos = CELL_POSITIONS[rashi.id]
          return (
            <div
              key={rashi.id}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
              className={`flex min-w-0 flex-col justify-between p-2 sm:p-3 ${LINE}`}
            >
              <span aria-hidden="true" className="font-symbol text-base leading-none text-gold sm:text-xl">
                {rashi.symbol}
              </span>
              <span className="flex min-w-0 flex-col items-center text-center leading-tight">
                <span className="max-w-full truncate text-[11px] font-semibold text-cream sm:text-[15px]">
                  {localName(rashi.name, language)}
                </span>
                {language === 'en' && (
                  <span className="hidden max-w-full truncate text-[11px] text-muted sm:block">
                    {westernName(rashi.name)}
                  </span>
                )}
              </span>
            </div>
          )
        })}
        <div
          style={{ gridRow: '2 / span 2', gridColumn: '2 / span 2' }}
          className={`flex flex-col items-center justify-center gap-2 p-3 text-center ${LINE}`}
        >
          <span className="font-serif text-2xl font-bold text-cream sm:text-[34px]">{t.home.chartTitle}</span>
          <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-muted sm:text-[11px]">
            {t.home.chartSubtitle}
          </span>
        </div>
      </div>
    </figure>
  )
}
