'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
<<<<<<< HEAD
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Languages, Sun, Moon } from 'lucide-react'
=======
import { usePathname } from 'next/navigation'
import { Menu, X, Star, Languages, Sun, Moon } from 'lucide-react'
>>>>>>> 8f4e63506aa1c8be07df8c5103e0677c8b136e1e
import { useLanguage } from '@/components/LanguageProvider'
import { useTheme } from '@/components/ThemeProvider'

const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Services',    href: '/services' },
  { label: 'Appointment', href: '/appointment' },
  { label: 'Contact',     href: '/contact' },
  { label: 'Shop',        href: '/shop' },
]
export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  // Add backdrop-blur once user scrolls past 20px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cosmic-deep/90 backdrop-blur-md border-b border-cosmic-border shadow-[0_2px_20px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-gold-bright"
          >
<<<<<<< HEAD
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image
                src="/images/logo.png"
                alt="SaiBaba Astro Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
              />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide whitespace-nowrap">
              <span className="text-cream">Saibaba</span>
              <span className="text-gradient-gold"> Astro</span>
=======
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet to-gold shadow-glow-sm group-hover:shadow-glow-gold transition-all duration-300"
              aria-hidden="true"
            >
              <Star className="w-4 h-4 text-cosmic-black fill-current" />
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide whitespace-nowrap">
              <span className="text-cream">SaiBaba</span>
              <span className="text-gradient-gold">Astro</span>
>>>>>>> 8f4e63506aa1c8be07df8c5103e0677c8b136e1e
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                      focus-visible:outline-gold-bright
                      ${isActive
                        ? 'text-gold-bright bg-gold/10'
                        : 'text-silver hover:text-cream hover:bg-white/5'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t.nav[link.label.toLowerCase() as keyof typeof t.nav]}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
 <button
    type="button"
    onClick={toggleTheme}
    className="flex items-center justify-center w-9 h-9 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-gold/40 transition-all duration-200"
    aria-label={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
    title={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
  >
    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
  </button>
 <div className="relative">
  <button
    type="button"
    onClick={() => setLanguageOpen((prev) => !prev)}
    className="flex items-center gap-2 px-3 py-2 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-gold/40 transition-all duration-200"
    aria-expanded={languageOpen}
  >
    <Languages className="w-4 h-4" />
    <span className="text-sm">
  {language === 'kn'
    ? 'ಕನ್ನಡ'
    : language === 'te'
      ? 'తెలుగు'
      : 'English'}
</span>
  </button>

  {languageOpen && (
    <div className="absolute right-0 mt-2 w-36 rounded-xl border border-cosmic-border bg-cosmic-deep shadow-xl overflow-hidden">
      <button
        type="button"
        onClick={() => {
          setLanguage('en')
          setLanguageOpen(false)
        }}
        className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
      >
        English
      </button>

      <button
        type="button"
        onClick={() => {
          setLanguage('kn')
          setLanguageOpen(false)
        }}
        className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
      >
        ಕನ್ನಡ
      </button>

      <button
        type="button"
        onClick={() => {
          setLanguage('te')
          setLanguageOpen(false)
        }}
        className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
      >
        తెలుగు
      </button>
    </div>
  )}
</div>

  <Link
    href="/appointment"
    className="btn-primary text-xs px-5 py-2.5"
  >
    {t.nav.bookConsultation}
  </Link>
</div>

<<<<<<< HEAD
          {/* ── Mobile controls ─────────────────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-gold/40 transition-all duration-200"
                aria-expanded={languageOpen}
                aria-label="Change language"
              >
                <Languages className="w-4 h-4" />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-cosmic-border bg-cosmic-deep shadow-xl overflow-hidden z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('en')
                      setLanguageOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
                  >
                    English
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('kn')
                      setLanguageOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
                  >
                    ಕನ್ನಡ
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('te')
                      setLanguageOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-silver hover:bg-white/5 hover:text-cream"
                  >
                    తెలుగు
                  </button>
                </div>
              )}
            </div>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-violet/40 transition-all duration-200 focus-visible:outline-gold-bright"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
=======
          {/* ── Mobile menu toggle ────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-cosmic-border text-silver hover:text-cream hover:border-violet/40 transition-all duration-200 focus-visible:outline-gold-bright"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
>>>>>>> 8f4e63506aa1c8be07df8c5103e0677c8b136e1e
        </div>
      </nav>

      {/* ── Mobile menu drawer ──────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-y-auto overscroll-contain transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="glass border-t border-cosmic-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'text-gold-bright bg-gold/10 border border-gold/20'
                        : 'text-silver hover:text-cream hover:bg-white/5'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
                    )}
                    {t.nav[link.label.toLowerCase() as keyof typeof t.nav]}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 pt-4 border-t border-cosmic-border">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-ghost w-full justify-center text-sm mb-2"
              tabIndex={isOpen ? 0 : -1}
              aria-label={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? t.common.themeLight : t.common.themeDark}
            </button>
            <Link
              href="/appointment"
              className="btn-primary w-full justify-center text-sm"
              tabIndex={isOpen ? 0 : -1}
            >
              {t.nav.bookConsultation}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}