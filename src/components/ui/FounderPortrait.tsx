import Image from 'next/image'
import type { CSSProperties } from 'react'

interface FounderPortraitProps {
  /** Circular cut-out (transparent outside its gold frame) */
  src: string
  alt: string
  /** Four zodiac signs placed at the corners */
  signs: [string, string, string, string]
  /** Mirror the ring directions so a pair of portraits feels balanced */
  reverse?: boolean
  priority?: boolean
  sizes?: string
  className?: string
}

const TEXT_GLYPH = '︎'

/**
 * Founder portrait with the original site's looping effect: concentric rings
 * slowly turning in alternating directions, a breathing gold halo and
 * twinkling zodiac signs. The photo keeps its own gold frame and is never
 * cropped (object-contain on a circular cut-out).
 *
 * Motion stops for visitors who prefer reduced motion (see globals.css).
 */
export default function FounderPortrait({
  src,
  alt,
  signs,
  reverse = false,
  priority = false,
  sizes = '(max-width: 640px) 80vw, 300px',
  className = '',
}: FounderPortraitProps) {
  // ring classes + duration; keyframes live in globals.css
  const ring = (seconds: number, backwards: boolean) => ({
    className: `founder-ring${backwards !== reverse ? ' founder-ring-reverse' : ''}`,
    style: { '--spin': `${seconds}s` } as CSSProperties,
  })
  const outer = ring(36, false)
  const middle = ring(29, true)
  const inner = ring(22, false)
  const corners = ['left-[4%] top-[4%]', 'right-[4%] top-[4%]', 'bottom-[4%] left-[4%]', 'bottom-[4%] right-[4%]']

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[320px] ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* outer ring: dotted, with an orbiting bead */}
        <div className={`absolute inset-0 rounded-full border border-dotted border-violet/40 ${outer.className}`} style={outer.style}>
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/60" />
        </div>
        {/* middle ring: dashed gold, with a gold bead */}
        <div className={`absolute inset-[6%] rounded-full border border-dashed border-gold-light/50 ${middle.className}`} style={middle.style}>
          <span className="absolute bottom-[14.6%] right-[14.6%] h-2.5 w-2.5 translate-x-1/2 translate-y-1/2 rounded-full bg-gold-light" />
        </div>
        {/* inner ring: fine solid line with tick beads */}
        <div className={`absolute inset-[11%] rounded-full border border-gold-light/30 ${inner.className}`} style={inner.style}>
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/80" />
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold-light/80" />
        </div>
        {/* breathing halo */}
        <div className="founder-halo absolute inset-[14%] rounded-full bg-gold-light/25 blur-md" />
        {/* twinkling signs */}
        {signs.map((sign, i) => (
          <span
            key={sign}
            className={`absolute ${corners[i]} animate-twinkle-slow font-symbol text-xl text-gold/50`}
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            {sign}
            {TEXT_GLYPH}
          </span>
        ))}
      </div>

      <div className="absolute inset-[15%] overflow-hidden rounded-full">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-contain" />
      </div>
    </div>
  )
}
