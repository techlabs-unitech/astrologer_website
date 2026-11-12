'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { useTheme } from '@/components/ThemeProvider'
import type { Language } from '@/translations/translations'

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'astrology', href: '/astrology' },
  { key: 'appointment', href: '/appointment' },
  { key: 'contact', href: '/contact' },
  { key: 'shop', href: '/shop' },
] as const

const LANGUAGES: Array<{ code: Language; short: string; full: string }> = [
  { code: 'kn', short: 'ಕ', full: 'ಕನ್ನಡ' },
  { code: 'en', short: 'EN', full: 'English' },
  { code: 'te', short: 'తె', full: 'తెలుగు' },
]

function isActivePath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

function LanguageSwitch({ className = '', tabIndex }: { className?: string; tabIndex?: number }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`flex overflow-hidden rounded-lg border border-cosmic-border text-sm ${className}`}
    >
      {LANGUAGES.map((lang) => {
        const active = lang.code === language
        return (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            aria-label={lang.full}
            title={lang.full}
            tabIndex={tabIndex}
            className={`min-h-[44px] min-w-[44px] px-3 font-semibold transition-colors ${
              active ? 'bg-primary text-on-primary' : 'text-silver hover:text-cream hover:bg-cream/5'
            }`}
          >
            {lang.short}
          </button>
        )
      })}
    </div>
  )
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const label = theme === 'dark' ? t.common.themeLight : t.common.themeDark
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-lg border border-cosmic-border text-cream transition-colors hover:border-gold-light hover:text-gold ${className}`}
    >
      {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  )
}

export default function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-cosmic-deep/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? 'border-cosmic-border shadow-[0_8px_24px_-20px_rgb(var(--c-shadow)/0.5)]' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8" aria-label={t.nav.mainNavigation}>
        <div className="flex h-20 items-center justify-between gap-4 2xl:gap-6">
          {/* Brand */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="relative h-11 w-11 shrink-0">
              <Image src="/images/logo.png" alt="" fill sizes="44px" className="object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="whitespace-nowrap font-serif text-[22px] font-semibold text-cream sm:text-[26px] xl:text-[23px] 2xl:text-[26px]">
                Sai Baba Astrology
              </span>
              <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                {t.nav.brandTagline}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-4 xl:flex 2xl:gap-6" role="list">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block whitespace-nowrap py-2 text-sm font-medium transition-colors 2xl:text-[15px] ${
                      active ? 'text-cream' : 'text-silver hover:text-cream'
                    }`}
                  >
                    {t.nav[link.key]}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold-light transition-opacity ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop controls */}
          <div className="hidden items-center gap-2 xl:flex 2xl:gap-3">
            <LanguageSwitch />
            <ThemeToggle />
            <Link href="/appointment" className="btn-primary whitespace-nowrap px-4 2xl:px-5">
              {t.nav.bookConsultation}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-cosmic-border text-cream transition-colors hover:border-gold-light"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`overflow-y-auto overscroll-contain transition-[max-height,opacity] duration-300 ease-in-out xl:hidden ${
          isOpen ? 'max-h-[calc(100dvh-5rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="border-t border-cosmic-border bg-cosmic-deep px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <ul className="flex flex-col" role="list">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <li key={link.href} className="border-b border-cosmic-border last:border-b-0">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    tabIndex={isOpen ? 0 : -1}
                    className={`flex min-h-[52px] items-center justify-between text-base font-medium ${
                      active ? 'text-cream' : 'text-silver'
                    }`}
                  >
                    {t.nav[link.key]}
                    {active && <span className="h-1.5 w-1.5 rotate-45 bg-gold-light" aria-hidden="true" />}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-cosmic-border pt-4">
            <LanguageSwitch className="self-start" tabIndex={isOpen ? 0 : -1} />
            <Link href="/appointment" className="btn-primary w-full" tabIndex={isOpen ? 0 : -1}>
              {t.nav.bookConsultation}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
