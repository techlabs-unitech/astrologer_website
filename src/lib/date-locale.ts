import type { Language } from '@/translations/translations'

/** BCP 47 locale for each site language, used with Intl date formatting. */
const LOCALES: Record<Language, string> = {
  kn: 'kn-IN',
  en: 'en-IN',
  te: 'te-IN',
}

/** Formats a date in the visitor's language, e.g. "ಬುಧವಾರ, 13 ಜನವರಿ 2027". */
export function formatLocalDate(
  date: Date,
  language: Language,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(LOCALES[language], options).format(date)
}

/** Full booking date: weekday, day, month and year. */
export function formatBookingDate(date: Date, language: Language): string {
  return formatLocalDate(date, language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
