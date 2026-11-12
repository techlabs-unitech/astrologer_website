'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  translations,
  type Language,
} from '@/translations/translations'

type Dictionary = typeof translations.en

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * English is the source of truth. Any key missing from the Kannada or Telugu
 * dictionary falls back to its English text, so new English copy can ship
 * before its translations are written.
 */
function withEnglishFallback(base: unknown, override: unknown): unknown {
  if (override === undefined || override === null) return base
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base
    return base.map((item, index) => withEnglishFallback(item, override[index]))
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const merged: Record<string, unknown> = { ...override }
    for (const key of Object.keys(base)) {
      merged[key] = withEnglishFallback(base[key], override[key])
    }
    return merged
  }
  return typeof override === typeof base ? override : base
}

const DICTIONARIES: Record<Language, Dictionary> = {
  en: translations.en,
  kn: withEnglishFallback(translations.en, translations.kn) as Dictionary,
  te: withEnglishFallback(translations.en, translations.te) as Dictionary,
}

const HTML_LANG: Record<Language, string> = { en: 'en', kn: 'kn', te: 'te' }

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  // Kannada is the default language
  const [language, setLanguageState] = useState<Language>('kn')

  // Load previously selected language
  useEffect(() => {
    let savedLanguage: string | null = null
    try {
      savedLanguage = localStorage.getItem('astro-language')
    } catch {
      // storage blocked: keep the default
    }

    if (
      savedLanguage === 'kn' ||
      savedLanguage === 'en' ||
      savedLanguage === 'te'
    ) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Keep <html lang> in sync so fonts and screen readers pick the right script
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language]
  }, [language])

  // Change language and save it
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    try {
      localStorage.setItem('astro-language', newLanguage)
    } catch {
      // storage blocked: the choice still applies for this visit
    }
  }

  const value = useMemo(
    () => ({ language, setLanguage, t: DICTIONARIES[language] ?? DICTIONARIES.en }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    )
  }

  return context
}
