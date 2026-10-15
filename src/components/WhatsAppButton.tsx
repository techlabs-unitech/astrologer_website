'use client'

import { usePathname } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'

const WHATSAPP_NUMBER = '919591066613' // +91 95910 66613

/** Floating WhatsApp chat button — bottom-right on every public page. */
export default function WhatsAppButton() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Not needed inside the admin portal
  if (pathname?.startsWith('/admin')) return null

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.common.whatsappGreeting)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappChat}
      title={t.common.whatsappChat}
      className="whatsapp-fab group fixed z-[60] right-4 bottom-4 sm:right-6 sm:bottom-6 flex items-center gap-3 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_32px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 pl-3.5 pr-3.5 sm:pr-3.5 h-14"
    >
      <span className="whatsapp-pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="relative w-8 h-8 shrink-0 fill-current" aria-hidden="true">
        <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.72A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3zm0 23.7c-2.03 0-4.02-.55-5.76-1.58l-.41-.25-3.97 1.02 1.06-3.87-.27-.42A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.22-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.68s1.15 3.11 1.31 3.32c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37z" />
      </svg>
      {/* Label slides out on desktop hover */}
      <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 group-hover:max-w-[12rem] group-hover:opacity-100 group-hover:pr-2 transition-all duration-300">
        {t.common.whatsappChat}
      </span>
    </a>
  )
}
