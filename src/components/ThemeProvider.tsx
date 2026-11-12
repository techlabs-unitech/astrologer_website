'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { THEME_STORAGE_KEY } from '@/lib/theme'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Light (cream) is the default Panchanga theme.
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    // The inline script in layout.tsx already applied the saved theme;
    // sync React state with it.
    const current = document.documentElement.dataset.theme
    setThemeState(current === 'dark' ? 'dark' : 'light')
  }, [])

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
    document.documentElement.dataset.theme = nextTheme
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
