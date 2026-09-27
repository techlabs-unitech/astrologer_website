'use client'

import { useLanguage } from '@/components/LanguageProvider'

type CopyId =
  | 'shopBadge' | 'shopTitle' | 'shopTitlePrefix' | 'shopTitleHighlight' | 'shopDescription'
  | 'shopProducts' | 'shopAllServices' | 'shopFilterDescription' | 'shopDbError'
  | 'shopBenefitsLabel' | 'shopBenefitsTitle' | 'shopBenefitsHighlight' | 'shopBenefitsSubtitle'
  | 'shopCtaTitle' | 'shopCtaHighlight' | 'shopCtaDescription' | 'contactUs' | 'aboutApproach'
  | 'appointmentBadge' | 'appointmentTitlePrefix' | 'appointmentTitleHighlight'
  | 'appointmentDescription' | 'appointmentConfidential' | 'appointmentResponse' | 'appointmentReading'
  | 'appointmentForm' | 'adminDashboard' | 'adminAppointments' | 'adminProducts' | 'adminMessages' | 'backToShop' | 'productNotFound'

export default function LocalizedCopy({ id }: { id: CopyId }) {
  const { t } = useLanguage()
  const copy: Record<CopyId, string> = {
    shopBadge: t.common.shopTitle,
    shopTitle: t.common.shopTitle,
    shopTitlePrefix: t.common.productCatalogue,
    shopTitleHighlight: t.common.shopExplore,
    shopDescription: t.common.shopDescription,
    shopProducts: t.common.shopProducts,
    shopAllServices: t.common.shopProducts,
    shopFilterDescription: t.common.shopFilterDescription,
    shopDbError: t.home.finalDescription,
    shopBenefitsLabel: t.common.shopBenefitsLabel,
    shopBenefitsTitle: t.common.shopBenefitsTitle,
    shopBenefitsHighlight: t.common.shopBenefitsHighlight,
    shopBenefitsSubtitle: t.common.shopBenefitsDescription,
    shopCtaTitle: t.common.shopCtaTitle,
    shopCtaHighlight: t.common.shopCtaHighlight,
    shopCtaDescription: t.common.shopCtaDescription,
    contactUs: t.common.contactUs,
    aboutApproach: t.nav.about,
    appointmentBadge: t.home.bookConsultation,
    appointmentTitlePrefix: t.home.readyToFind,
    appointmentTitleHighlight: t.home.cosmicDirection,
    appointmentDescription: t.home.finalDescription,
    appointmentConfidential: t.home.confidential,
    appointmentResponse: t.home.experiencedGuidance,
    appointmentReading: t.home.personalised,
    appointmentForm: t.common.appointmentForm,
    adminDashboard: t.common.dashboard,
    adminAppointments: t.common.appointments,
    adminProducts: t.common.products,
    adminMessages: t.common.messages,
    backToShop: t.common.backToShop,
    productNotFound: t.common.productNotFound,
  }
  return <>{copy[id]}</>
}
