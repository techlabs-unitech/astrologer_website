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
 * `glyph` is the planetary symbol drawn as a watermark on the service emblem.
 */
export interface ServiceVisual {
  icon: LucideIcon
  glyph: string
}

export const SERVICE_VISUALS: ServiceVisual[] = [
  { icon: BookOpen,  glyph: '☉' }, // Birth chart — Sun
  { icon: Heart,     glyph: '♀' }, // Relationship — Venus
  { icon: Briefcase, glyph: '♃' }, // Career — Jupiter
  { icon: Compass,   glyph: '☽' }, // Life guidance — Moon
  { icon: Hash,      glyph: '☿' }, // Numerology — Mercury
  { icon: Home,      glyph: '⛩' }, // Vastu — dwelling
]
