import { useId, type ReactNode } from 'react'
import { GRAHAS, RASHIS, type GrahaId } from '@/lib/astrology-data'

/**
 * Original vector artwork for the three astrology categories.
 *
 * Drawn in-house (no third-party images), so there is no licensing risk and
 * the files cost nothing to optimise: each illustration is a few KB of inline
 * SVG that scales crisply on any screen. All three share the same 4:3 canvas,
 * backdrop, palette and stroke weights so the cards look like one set.
 */

const PALETTE = {
  deep: '#281044',
  violet: '#54217B',
  gold: '#E6B553',
  cream: '#F4E5DD',
}

const SYMBOL_FONT =
  "'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', 'DejaVu Sans', 'Apple Symbols', serif"

const VIEW_W = 400
const VIEW_H = 300
const CX = VIEW_W / 2
const CY = VIEW_H / 2

/** Deterministic pseudo-random stars so server and client render identically. */
function makeStars(seed: number, count: number) {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: count }, () => ({
    x: +(rand() * VIEW_W).toFixed(1),
    y: +(rand() * VIEW_H).toFixed(1),
    r: +(0.4 + rand() * 1.1).toFixed(2),
    o: +(0.25 + rand() * 0.6).toFixed(2),
  }))
}

function useSvgId(prefix: string) {
  // React ids contain ":" which some browsers reject inside url(#...)
  return `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, '')}`
}

interface ArtFrameProps {
  title: string
  seed: number
  starCount?: number
  className?: string
  children: (ids: { glow: string | undefined; gold: string }) => ReactNode
}

function ArtFrame({ title, seed, starCount = 70, className = '', children }: ArtFrameProps) {
  const id = useSvgId('astro')
  const bg = `${id}-bg`
  const gold = `${id}-gold`
  const stars = makeStars(seed, starCount)

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      style={{ fontFamily: SYMBOL_FONT }}
    >
      <defs>
        <radialGradient id={bg} cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor={PALETTE.violet} />
          <stop offset="60%" stopColor={PALETTE.deep} />
          <stop offset="100%" stopColor="#170828" />
        </radialGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6D58A" />
          <stop offset="55%" stopColor={PALETTE.gold} />
          <stop offset="100%" stopColor="#B9872F" />
        </linearGradient>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${bg})`} />
      <g aria-hidden="true">
        {stars.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.r} fill={PALETTE.cream} opacity={star.o} />
        ))}
      </g>
      <g aria-hidden="true">{children({ glow: undefined, gold: `url(#${gold})` })}</g>
    </svg>
  )
}

const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: +(CX + r * Math.cos(rad)).toFixed(2), y: +(CY + r * Math.sin(rad)).toFixed(2) }
}

// ─── Card 1: Zodiac wheel ─────────────────────────────────────────────────────

export function ZodiacWheelArt({ title, className }: { title: string; className?: string }) {
  const outer = 122
  const inner = 84
  const glyphR = (outer + inner) / 2

  return (
    <ArtFrame title={title} seed={11} className={className}>
      {({ glow, gold }) => (
        <>
          <circle cx={CX} cy={CY} r={outer + 14} fill="none" stroke={PALETTE.gold} strokeOpacity={0.18} />
          <circle cx={CX} cy={CY} r={outer} fill={PALETTE.deep} fillOpacity={0.55} stroke={gold} strokeWidth={2} filter={glow} />
          <circle cx={CX} cy={CY} r={inner} fill="none" stroke={gold} strokeWidth={1.2} />
          <circle cx={CX} cy={CY} r={inner - 30} fill="none" stroke={PALETTE.gold} strokeOpacity={0.45} strokeDasharray="2 4" />

          {/* tick marks on the outer rim */}
          {Array.from({ length: 72 }, (_, i) => {
            const a = polar(outer, i * 5)
            const b = polar(outer + (i % 6 === 0 ? 9 : 4), i * 5)
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={PALETTE.gold} strokeOpacity={0.55} strokeWidth={0.8} />
          })}

          {/* 12 house dividers and inner spokes */}
          {RASHIS.map((_, i) => {
            const deg = i * 30 + 15
            const a = polar(inner, deg)
            const b = polar(outer, deg)
            const c = polar(inner - 30, deg)
            return (
              <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={PALETTE.gold} strokeWidth={1} />
                <line x1={c.x} y1={c.y} x2={a.x} y2={a.y} stroke={PALETTE.gold} strokeOpacity={0.3} strokeWidth={0.8} />
              </g>
            )
          })}

          {/* zodiac glyphs */}
          {RASHIS.map((rashi, i) => {
            const p = polar(glyphR, i * 30)
            return (
              <text key={rashi.id} x={p.x} y={p.y} fill={gold} fontSize={19} textAnchor="middle" dominantBaseline="central">
                {rashi.symbol}
              </text>
            )
          })}

          {/* central sun-star */}
          <g filter={glow}>
            {Array.from({ length: 16 }, (_, i) => {
              const long = i % 2 === 0
              const a = polar(14, i * 22.5)
              const b = polar(long ? 40 : 26, i * 22.5)
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={gold} strokeWidth={long ? 1.6 : 1} strokeLinecap="round" />
            })}
            <circle cx={CX} cy={CY} r={12} fill={gold} />
          </g>
        </>
      )}
    </ArtFrame>
  )
}

// ─── Card 2: Nakshatras ───────────────────────────────────────────────────────

/** Orion-like figure (Mrigashira / Ardra region) with Pleiades (Krittika). */
const CONSTELLATION = {
  stars: [
    { x: 168, y: 92, r: 3.6 },  // 0 Ardra (Betelgeuse)
    { x: 236, y: 98, r: 2.6 },  // 1
    { x: 202, y: 70, r: 2 },    // 2 Mrigashira (head)
    { x: 190, y: 146, r: 2.4 }, // 3 belt
    { x: 202, y: 150, r: 2.4 }, // 4 belt
    { x: 214, y: 154, r: 2.4 }, // 5 belt
    { x: 176, y: 206, r: 2.6 }, // 6
    { x: 240, y: 212, r: 3.4 }, // 7 Rigel
  ],
  lines: [
    [2, 0], [2, 1], [0, 3], [1, 5], [3, 4], [4, 5], [3, 6], [5, 7],
  ] as Array<[number, number]>,
}

const PLEIADES_OFFSET = { x: 22, y: 20 }
const PLEIADES = [
  { x: 84, y: 72, r: 2.4 }, { x: 98, y: 64, r: 1.8 }, { x: 106, y: 78, r: 2.2 },
  { x: 92, y: 88, r: 1.6 }, { x: 116, y: 66, r: 1.5 }, { x: 78, y: 86, r: 1.4 },
].map((s) => ({ ...s, x: s.x + PLEIADES_OFFSET.x, y: s.y + PLEIADES_OFFSET.y }))

export function NakshatraArt({ title, className }: { title: string; className?: string }) {
  const ringR = 128

  return (
    <ArtFrame title={title} seed={29} starCount={110} className={className}>
      {({ glow, gold }) => (
        <>
          {/* the 27-mansion ring */}
          <circle cx={CX} cy={CY} r={ringR} fill="none" stroke={PALETTE.gold} strokeOpacity={0.28} />
          {Array.from({ length: 27 }, (_, i) => {
            const p = polar(ringR, (360 / 27) * i)
            return <circle key={i} cx={p.x} cy={p.y} r={i % 9 === 0 ? 2.6 : 1.6} fill={gold} opacity={i % 9 === 0 ? 1 : 0.75} />
          })}

          {/* crescent moon */}
          <g filter={glow} transform="translate(318 74)">
            <path d="M 0 -22 A 22 22 0 0 0 0 22 A 28 28 0 0 1 0 -22 Z" fill={gold} />
          </g>

          {/* constellation figure */}
          <g stroke={gold} strokeWidth={0.9} strokeOpacity={0.85}>
            {CONSTELLATION.lines.map(([a, b], i) => (
              <line
                key={i}
                x1={CONSTELLATION.stars[a].x}
                y1={CONSTELLATION.stars[a].y}
                x2={CONSTELLATION.stars[b].x}
                y2={CONSTELLATION.stars[b].y}
              />
            ))}
          </g>
          <g filter={glow}>
            {CONSTELLATION.stars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={PALETTE.cream} />
            ))}
            {PLEIADES.map((s, i) => (
              <circle key={`p${i}`} cx={s.x} cy={s.y} r={s.r} fill={PALETTE.cream} />
            ))}
          </g>
          <g stroke={gold} strokeWidth={0.6} strokeOpacity={0.6}>
            {[[0, 1], [1, 4], [0, 2], [2, 3]].map(([a, b], i) => (
              <line key={i} x1={PLEIADES[a].x} y1={PLEIADES[a].y} x2={PLEIADES[b].x} y2={PLEIADES[b].y} />
            ))}
          </g>

          {/* four-point sparkle accents */}
          {[{ x: 300, y: 214, s: 9 }, { x: 110, y: 222, s: 7 }, { x: 262, y: 48, s: 6 }].map((p, i) => (
            <path
              key={i}
              filter={glow}
              fill={gold}
              d={`M ${p.x} ${p.y - p.s} Q ${p.x} ${p.y} ${p.x + p.s} ${p.y} Q ${p.x} ${p.y} ${p.x} ${p.y + p.s} Q ${p.x} ${p.y} ${p.x - p.s} ${p.y} Q ${p.x} ${p.y} ${p.x} ${p.y - p.s} Z`}
            />
          ))}
        </>
      )}
    </ArtFrame>
  )
}

// ─── Card 3: Grahagalu (Navagraha mandala) ────────────────────────────────────

/**
 * Traditional navagraha shrine layout with east at the top:
 * Budha NE, Shukra E, Chandra SE / Guru N, Surya centre, Mangala S /
 * Ketu NW, Shani W, Rahu SW.
 */
const NAVAGRAHA_GRID: GrahaId[][] = [
  ['budha', 'shukra', 'chandra'],
  ['guru', 'surya', 'mangala'],
  ['ketu', 'shani', 'rahu'],
]

export function NavagrahaArt({ title, className }: { title: string; className?: string }) {
  const step = 78
  const symbolOf = (id: GrahaId) => GRAHAS.find((g) => g.id === id)?.symbol ?? ''

  return (
    <ArtFrame title={title} seed={47} className={className}>
      {({ glow, gold }) => (
        <>
          {/* yantra frame */}
          <rect x={CX - 118} y={CY - 118} width={236} height={236} fill="none" stroke={PALETTE.gold} strokeOpacity={0.35} />
          <rect
            x={CX - 84}
            y={CY - 84}
            width={168}
            height={168}
            fill="none"
            stroke={PALETTE.gold}
            strokeOpacity={0.35}
            transform={`rotate(45 ${CX} ${CY})`}
          />
          <circle cx={CX} cy={CY} r={step * 1.42} fill="none" stroke={gold} strokeWidth={1} strokeOpacity={0.7} />

          {NAVAGRAHA_GRID.flatMap((row, r) =>
            row.map((id, c) => {
              const x = CX + (c - 1) * step
              const y = CY + (r - 1) * step
              const isSun = id === 'surya'
              return (
                <g key={id}>
                  {isSun && (
                    <g filter={glow}>
                      {Array.from({ length: 12 }, (_, i) => {
                        const rad = (i * 30 * Math.PI) / 180
                        return (
                          <line
                            key={i}
                            x1={+(x + 30 * Math.cos(rad)).toFixed(2)}
                            y1={+(y + 30 * Math.sin(rad)).toFixed(2)}
                            x2={+(x + 40 * Math.cos(rad)).toFixed(2)}
                            y2={+(y + 40 * Math.sin(rad)).toFixed(2)}
                            stroke={gold}
                            strokeWidth={1.6}
                            strokeLinecap="round"
                          />
                        )
                      })}
                    </g>
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSun ? 26 : 21}
                    fill={isSun ? gold : PALETTE.deep}
                    stroke={gold}
                    strokeWidth={isSun ? 0 : 1.4}
                    filter={isSun ? glow : undefined}
                  />
                  <text
                    x={x}
                    y={y + 1}
                    fill={isSun ? PALETTE.deep : gold}
                    fontSize={isSun ? 26 : 20}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {symbolOf(id)}
                  </text>
                </g>
              )
            }),
          )}
        </>
      )}
    </ArtFrame>
  )
}
