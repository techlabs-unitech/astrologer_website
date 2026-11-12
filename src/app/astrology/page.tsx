import type { Metadata } from 'next'
import AstrologyGuide from '@/components/astrology/AstrologyGuide'

export const metadata: Metadata = {
  title: 'Astrology Guide — Rashis, Nakshatras & Grahas',
  description:
    'A short guide to the twelve rashis (zodiac signs), the twenty-seven nakshatras and the nine grahas of Vedic astrology, with their ruling planets, elements and weekdays.',
}

export default function AstrologyPage() {
  return <AstrologyGuide />
}
