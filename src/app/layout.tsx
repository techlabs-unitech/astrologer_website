import type { Metadata, Viewport } from 'next'
import {
  Baloo_Tamma_2,
  Baloo_Tammudu_2,
  Cormorant_Garamond,
  Inter,
  Noto_Sans_Kannada,
  Noto_Sans_Telugu,
} from 'next/font/google'
import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

// ─── Fonts ──────────────────────────────────────────────────────────────────
// Self-hosted by next/font at build time (no runtime request to Google).
// Latin: Inter (text) + Cormorant Garamond (headings).
// Kannada / Telugu: Noto Sans (text) + Baloo Tamma 2 / Baloo Tammudu 2 (headings).

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-kannada',
  display: 'swap',
})
const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-telugu',
  display: 'swap',
})
const balooKannada = Baloo_Tamma_2({
  subsets: ['kannada'],
  weight: ['600', '700', '800'],
  variable: '--font-baloo-kannada',
  display: 'swap',
})
const balooTelugu = Baloo_Tammudu_2({
  subsets: ['telugu'],
  weight: ['600', '700', '800'],
  variable: '--font-baloo-telugu',
  display: 'swap',
})

const fontVariables = [inter, cormorant, notoKannada, notoTelugu, balooKannada, balooTelugu]
  .map((font) => font.variable)
  .join(' ')

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t='light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`

// ─── Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Sai Baba Astrology — Vedic Astrology, Numerology & Vastu Guidance',
    template: '%s | Sai Baba Astrology',
  },
  description:
    'Discover your cosmic path with authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalised guidance. Book an appointment today.',
  keywords: [
    'Vedic astrology',
    'Jyotish',
    'birth chart reading',
    'horoscope',
    'astrologer',
    'kundli',
    'gemstone recommendation',
    'numerology',
    'vastu shastra',
    'vastu consultant',
  ],
  authors: [{ name: 'Sai Baba Astrology' }],
  creator: 'Sai Baba Astrology',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sai Baba Astrology',
    title: 'Sai Baba Astrology — Vedic Astrology, Numerology & Vastu Guidance',
    description:
      'Authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalised guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Baba Astrology — Vedic Astrology, Numerology & Vastu Guidance',
    description:
      'Authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalised guidance.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4E5DD' },
    { media: '(prefers-color-scheme: dark)', color: '#1C0B30' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// ─── Root layout ────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light" className={`scroll-smooth ${fontVariables}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-on-primary focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <LanguageProvider>
            <Navbar />

            <main id="main-content" className="flex-1">
              {children}
            </main>

            <Footer />
            <WhatsAppButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
