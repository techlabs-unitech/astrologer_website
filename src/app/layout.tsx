import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'SaiBabaAstro — Vedic Astrology, Numerology & Vastu Guidance',
    template: '%s | SaiBabaAstro',
  },
  description:
    'Discover your cosmic path with authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalized guidance. Book an appointment today.',
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
  authors: [{ name: 'SaiBabaAstro' }],
  creator: 'SaiBabaAstro',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SaiBabaAstro',
    title: 'SaiBabaAstro — Vedic Astrology, Numerology & Vastu Guidance',
    description:
      'Authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalized guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaiBabaAstro — Vedic Astrology, Numerology & Vastu Guidance',
    description:
      'Authentic Vedic astrology readings, numerology, Vastu consultations, birth chart analysis, and personalized guidance.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#07060f',
  width: 'device-width',
  initialScale: 1,
}

// ─── Root layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/*
        Font strategy: system-font stack defined in Tailwind + globals.css.
        No external font fetching — avoids layout shift and network dependency.
        Serif headings use Georgia (universally available).
      */}
      <body className="min-h-screen flex flex-col antialiased">
        {/* Skip-to-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-cosmic-black focus:font-semibold focus:text-sm"
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
  </LanguageProvider>
  </ThemeProvider>
      </body>
    </html>
  )
}
