import type { Language } from '@/translations/translations'
import type { Localized } from '@/lib/astrology-data'

/**
 * English names in astrology-data are "Transliteration (Western name)",
 * e.g. "Mesha (Aries)". These helpers split that for compact displays.
 */
export function localName(name: Localized, language: Language): string {
  if (language !== 'en') return name[language]
  return name.en.replace(/\s*\(.*\)\s*$/, '')
}

export function westernName(name: Localized): string {
  return name.en.match(/\(([^)]+)\)/)?.[1] ?? ''
}
