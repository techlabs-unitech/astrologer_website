'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  translations,
  type Language,
} from '@/translations/translations'

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  // Kannada is the default language
  const [language, setLanguageState] = useState<Language>('kn')

  // Load previously selected language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('astro-language')

    if (
      savedLanguage === 'kn' ||
      savedLanguage === 'en' ||
      savedLanguage === 'te'
    ) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Change language and save it
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('astro-language', newLanguage)
  }

  // Get translations for current language
  const t = translations[language] ?? translations.kn

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
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