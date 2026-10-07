import {
  BookOpen,
  Heart,
  Briefcase,
  Compass,
  Hash,
  Home,
  type LucideIcon,
} from 'lucide-react'

/**
 * Visual metadata for each of the 6 services in `t.services.servicesList`.
 * Order MUST match the order of `servicesList` in every language in
 * `src/translations/translations.ts`:
 *   0. Birth Chart Analysis
 *   1. Love & Relationship
 *   2. Career & Finance
 *   3. Life Guidance
 *   4. Numerology
 *   5. Vastu Shastra
 *
 * `thumbClass` drives a generated gradient "thumbnail" band (no external
 * images / hotlinked photos — see note in README) topped with the icon
 * and a large translucent watermark glyph for a distinct, on-brand look
 * per service.
 */
export interface ServiceVisual {
  icon: LucideIcon
  thumbClass: string
  glyph: string
}

export const SERVICE_VISUALS: ServiceVisual[] = [
  { icon: BookOpen,  thumbClass: 'from-violet-bright to-violet',      glyph: '☉' }, // Birth chart — Sun
  { icon: Heart,     thumbClass: 'from-pink-600 to-rose-500',         glyph: '♀' }, // Relationship — Venus
  { icon: Briefcase, thumbClass: 'from-blue-700 to-blue-500',         glyph: '♃' }, // Career — Jupiter
  { icon: Compass,   thumbClass: 'from-gold-dim to-gold',             glyph: '☽' }, // Life guidance — Moon
  { icon: Hash,      thumbClass: 'from-emerald-700 to-emerald-500',   glyph: '☿' }, // Numerology — Mercury
  { icon: Home,      thumbClass: 'from-teal-700 to-teal-500',         glyph: '⛩' }, // Vastu — dwelling
]
