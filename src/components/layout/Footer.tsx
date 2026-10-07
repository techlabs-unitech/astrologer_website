'use client'

import Link from 'next/link'
import { Star, Mail, Phone, MapPin, Share2, Heart, Rss } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

const FOOTER_LINKS = {
  services: [
    { label: 'Birth Chart Reading',      href: '/shop' },
    { label: 'Love & Relationship',       href: '/shop' },
    { label: 'Career & Finance',          href: '/shop' },
    { label: 'Gemstone Recommendation',   href: '/shop' },
    { label: 'Vastu Consultation',        href: '/shop' },
  ],
  quickLinks: [
    { label: 'About Us',     href: '/about' },
    { label: 'Services',     href: '/shop' },
    { label: 'Appointment',  href: '/appointment' },
    { label: 'Contact',      href: '/contact' },
  ],
}

const SOCIAL_LINKS = [
  { label: 'Facebook',  href: '#', icon: Share2 },
  { label: 'Instagram', href: '#', icon: Heart },
  { label: 'YouTube',   href: '#', icon: Rss },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()
  const footerServices = [t.home.detailedBirthChart, t.home.compatibilityReading, t.home.careerAstrology, t.home.personalisedRemedies, t.services.lifeGuidance]
  const quickLinks = [t.nav.about, t.nav.services, t.nav.appointment, t.nav.contact]

  return (
    <footer className="relative border-t border-cosmic-border bg-cosmic-deep/80 mt-auto">
      {/* Top gold divider glow */}
      <span className="divider-gold absolute top-0 inset-x-0" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main footer grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet to-gold shadow-glow-sm">
                <Star className="w-4 h-4 text-cosmic-black fill-current" />
              </span>
              <span className="font-serif text-xl font-bold">
                <span className="text-cream">SaiBaba</span>
                <span className="text-gradient-gold">Astro</span>
              </span>
            </Link>

            <p className="text-muted text-sm leading-relaxed">
              {t.home.astrologyDescription2}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-cosmic-border text-muted hover:text-gold-bright hover:border-gold/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-cream font-semibold mb-4 text-sm tracking-wide uppercase">
              {t.common.footerServices}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.services.map((link, index) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-gold-bright transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet group-hover:bg-gold-bright transition-colors" aria-hidden="true" />
                    {footerServices[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-cream font-semibold mb-4 text-sm tracking-wide uppercase">
              {t.common.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.quickLinks.map((link, index) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-gold-bright transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet group-hover:bg-gold-bright transition-colors" aria-hidden="true" />
                    {quickLinks[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-serif text-cream font-semibold mb-4 text-sm tracking-wide uppercase">
              {t.common.contact}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="mailto:info@saibabaastro.com"
                  className="flex items-start gap-3 text-sm text-muted hover:text-gold-bright transition-colors duration-200 group break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-violet-bright group-hover:text-gold-bright transition-colors shrink-0" />
                  info@saibabaastro.store
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-start gap-3 text-sm text-muted hover:text-gold-bright transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-violet-bright group-hover:text-gold-bright transition-colors shrink-0" />
                  +91 99720 49339
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="w-4 h-4 mt-0.5 text-violet-bright shrink-0" />
                NO 13/7, Guttapalya Village, Gownipalli Post, Chintamani Taluk, Chikkaballapura District, Karnataka - 563161
              </li>
            </ul>

            {/* Working hours */}
            <div className="mt-4 pt-4 border-t border-cosmic-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-bright mb-2">
                {t.common.hours}
              </p>
              <p className="text-xs text-muted">{t.common.mondaySaturday}</p>
              <p className="text-xs text-muted">{t.common.sundayByAppointment}</p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="border-t border-cosmic-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {year} SaiBabaAstro. All rights reserved | Design by Unitechlabs</p>
          <p className="flex items-center gap-1">
            {t.home.practical} 
            <Star className="w-3 h-3 text-gold-bright fill-current mx-0.5" aria-hidden="true" />
            {t.home.cosmicDirection}
          </p>
        </div>
      </div>
    </footer>
  )
}
