'use client'

import { useLanguage } from '@/components/LanguageProvider'

type CopyId =
  | 'shopBadge' | 'shopTitle' | 'shopTitlePrefix' | 'shopTitleHighlight' | 'shopDescription'
  | 'shopProducts' | 'shopAllServices' | 'shopFilterDescription' | 'shopDbError'
  | 'shopBenefitsLabel' | 'shopBenefitsTitle' | 'shopBenefitsHighlight' | 'shopBenefitsSubtitle'
  | 'shopCtaTitle' | 'shopCtaHighlight' | 'shopCtaDescription' | 'contactUs' | 'aboutApproach'
  | 'appointmentBadge' | 'appointmentTitlePrefix' | 'appointmentTitleHighlight'
  | 'appointmentDescription' | 'appointmentConfidential' | 'appointmentResponse' | 'appointmentReading'
  | 'appointmentForm' | 'adminDashboardSub' | 'adminAppointmentsSub' | 'adminProductsSub' | 'adminMessagesSub' | 'adminOrders' | 'adminRecentAppointments' | 'adminRecentOrders' | 'adminNoAppointments' | 'adminNoOrders' | 'adminOrdersSub' | 'shopBadgeText' | 'adminDashboard' | 'adminAppointments' | 'adminProducts' | 'adminMessages' | 'backToShop' | 'productNotFound'

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
    adminDashboardSub: t.common.dashboardSub,
    adminAppointmentsSub: t.common.appointmentsSub,
    adminProductsSub: t.common.productsSub,
    adminMessagesSub: t.common.messagesSub,
    adminOrders: t.common.orders,
    adminRecentAppointments: t.common.recentAppointments,
    adminRecentOrders: t.common.recentOrders,
    adminNoAppointments: t.common.noAppointments,
    adminNoOrders: t.common.noOrders,
    adminOrdersSub: t.common.ordersSub,
    shopBadgeText: t.common.shopBadgeText,
    adminDashboard: t.common.dashboard,
    adminAppointments: t.common.appointments,
    adminProducts: t.common.products,
    adminMessages: t.common.messages,
    backToShop: t.common.backToShop,
    productNotFound: t.common.productNotFound,
  }
  return <>{copy[id]}</>
}
