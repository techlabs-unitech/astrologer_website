'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import SocialLinks from '@/components/ui/SocialLinks'
import { useLanguage } from '@/components/LanguageProvider'
import { CONTACT } from '@/lib/contact-info'

const SERVICE_HREFS = [
  '/appointment?service=detailed-birth-chart',
  '/appointment?service=love-relationship-reading',
  '/appointment?service=career-astrology-consultation',
  '/services',
  '/services',
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="eyebrow mb-5 text-muted">{children}</h3>
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()
  const list = t.services.servicesList
  const footerServices = [list[0].title, list[1].title, list[2].title, list[4].title, list[5].title]
  const quickLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.astrology, href: '/astrology' },
    { label: t.nav.shop, href: '/shop' },
    { label: t.nav.appointment, href: '/appointment' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const linkClass = 'text-[15px] text-silver transition-colors hover:text-gold'

  return (
    <footer className="mt-auto border-t border-cosmic-border bg-cosmic-deep">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex w-fit flex-col leading-none">
              <span className="font-serif text-[28px] font-semibold text-cream">Sai Baba Astrology</span>
              <span className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                {t.nav.brandTagline}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-silver">{t.home.astrologyDescription2}</p>
            <SocialLinks className="mt-1" />
          </div>

          {/* Services */}
          <div>
            <ColumnHeading>{t.common.footerServices}</ColumnHeading>
            <ul className="flex flex-col gap-3" role="list">
              {SERVICE_HREFS.map((href, index) => (
                <li key={`${href}-${index}`}>
                  <Link href={href} className={linkClass}>
                    {footerServices[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <ColumnHeading>{t.common.quickLinks}</ColumnHeading>
            <ul className="flex flex-col gap-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnHeading>{t.common.contact}</ColumnHeading>
            <ul className="flex flex-col gap-3.5" role="list">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`flex items-start gap-3 break-all ${linkClass}`}>
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className={`flex items-start gap-3 ${linkClass}`}>
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-silver">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {CONTACT.address}
              </li>
            </ul>

            <div className="mt-6 border-t border-cosmic-border pt-5">
              <p className="eyebrow mb-2">{t.common.hours}</p>
              <p className="text-sm text-silver">{t.common.mondaySaturday}</p>
              <p className="text-sm text-silver">{t.common.sundayByAppointment}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-cosmic-border py-6 text-sm text-muted sm:flex-row">
          <p>© {year} Sai Baba Astrology. All rights reserved · Design by Unitechlabs</p>
          <p>{t.home.eyebrow}</p>
        </div>
      </div>
    </footer>
  )
}
