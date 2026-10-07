'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('astro-theme')
    const nextTheme: Theme = savedTheme === 'light' ? 'light' : 'dark'
    setThemeState(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }, [])

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme)
    localStorage.setItem('astro-theme', nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}