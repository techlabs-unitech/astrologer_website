'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PageHero from '@/components/ui/PageHero'
import FeatureGrid from '@/components/ui/FeatureGrid'
import ContactForm from '@/components/contact/ContactForm'
import SocialLinks from '@/components/ui/SocialLinks'
import { Phone, Mail, MapPin, Clock, Shield, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { CONTACT } from '@/lib/contact-info'

export default function ContactPage() {
  const { t } = useLanguage()

  const contactInfo = [
    { icon: Phone, label: t.common.phone, primary: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, label: t.common.email, primary: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: t.common.address, primary: CONTACT.address, href: null },
    { icon: Clock, label: t.common.hours, primary: `${t.common.mondaySaturday} · ${t.common.sundayByAppointment}`, href: null },
  ]

  const reassurances = [
    { icon: Shield, title: t.home.confidential, description: t.home.confidentialDescription },
    { icon: MessageCircle, title: t.home.getInTouch, description: t.home.servicesSubtitle },
    { icon: CheckCircle, title: t.home.experiencedGuidance, description: t.home.personalisedDescription },
  ]

  return (
    <>
      <PageHero label={t.nav.contact} title={t.home.getInTouch} description={t.home.finalDescription} />

      {/* CONTACT DETAILS */}
      <section className="bg-cosmic-black pt-12 sm:pt-16" aria-labelledby="contact-info-heading">
        <Container size="wide">
          <h2 id="contact-info-heading" className="sr-only">
            {t.common.contact}
          </h2>
          <ul className="grid grid-cols-1 border-l border-t border-cosmic-border sm:grid-cols-2 lg:grid-cols-4" role="list">
            {contactInfo.map((item) => {
              const Icon = item.icon
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-light/70 text-gold">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="eyebrow text-muted">{item.label}</span>
                    <span className="break-words text-[15px] font-semibold leading-snug text-cream">{item.primary}</span>
                  </span>
                </>
              )
              return (
                <li key={item.label} className="border-b border-r border-cosmic-border bg-cosmic-card">
                  {item.href ? (
                    <a href={item.href} className="flex h-full items-start gap-4 p-6 transition-colors hover:bg-cream/[0.03]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex h-full items-start gap-4 p-6">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="section-padding bg-cosmic-black" aria-labelledby="contact-form-heading">
        <Container size="wide">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
            <div className="card-cosmic p-6 sm:p-10">
              <div className="mb-8 flex flex-col gap-2">
                <h2 id="contact-form-heading" className="heading-serif text-3xl font-bold sm:text-4xl">
                  {t.common.sendMessage}
                </h2>
                <p className="text-[15px] leading-relaxed text-silver">{t.common.thankYouMessage}</p>
              </div>
              <ContactForm />
            </div>

            <aside className="flex flex-col gap-5" aria-label={t.home.bookConsultation}>
              <div className="flex flex-col gap-4 rounded-card border border-saffron/30 bg-night p-7">
                <h3 className="font-serif text-2xl font-bold text-[#F4E5DD]">{t.home.bookConsultation}</h3>
                <p className="text-[15px] leading-relaxed text-[#D8C8E2]">{t.home.servicesSubtitle}</p>
                <Link
                  href="/appointment"
                  className="inline-flex min-h-[48px] w-fit items-center gap-2 rounded-lg bg-saffron px-5 text-sm font-semibold text-night-deep transition-opacity hover:opacity-90"
                >
                  {t.nav.appointment}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="card-cosmic flex flex-col gap-3 p-6">
                <h3 className="eyebrow">{t.common.hours}</h3>
                <p className="text-[15px] text-cream">{t.common.mondaySaturday}</p>
                <p className="text-[15px] text-silver">{t.common.sundayByAppointment}</p>
              </div>

              <div className="card-cosmic flex flex-col gap-4 p-6">
                <h3 className="eyebrow">{t.common.followUs}</h3>
                <SocialLinks withLabels />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* REASSURANCE */}
      <section className="section-padding border-t border-cosmic-border bg-cosmic-deep" aria-labelledby="reassurance-heading">
        <Container size="wide">
          <SectionHeading
            id="reassurance-heading"
            label={t.home.getInTouch}
            title={t.home.whyChooseUs}
            subtitle={t.home.whyChooseSubtitle}
            layout="split"
            className="mb-12"
          />
          <FeatureGrid items={reassurances} />
        </Container>
      </section>
    </>
  )
}
