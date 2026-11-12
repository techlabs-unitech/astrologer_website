import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

// ─── Fonts ──────────────────────────────────────────────────────────────────
// Self-hosted from src/app/fonts (variable WOFF2 files from Google Fonts, OFL),
// so builds never fetch from Google — that fetch broke Vercel builds.
// Latin: Inter (text) + Cormorant Garamond (headings).
// Kannada / Telugu: Noto Sans (text) + Baloo Tamma 2 / Baloo Tammudu 2 (headings).
// Each face carries its subset's unicode-range, so browsers only download the
// Kannada or Telugu files on pages that actually contain those scripts.
// (next/font only accepts literal options, hence the repeated ranges.)

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
})
const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-latin.woff2', weight: '500 700', style: 'normal' },
    { path: './fonts/cormorant-latin-italic.woff2', weight: '500 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
})
// Kannada is the default site language, so its faces are preloaded; Telugu
// faces load on demand.
const notoKannada = localFont({
  src: './fonts/noto-sans-kannada.woff2',
  weight: '400 600',
  variable: '--font-noto-kannada',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0951-0952, U+0964-0965, U+0B83, U+0C80-0CF3, U+1CD0, U+1CD2-1CD3, U+1CDA, U+1CF2, U+1CF4, U+200C-200D, U+20B9, U+25CC, U+A830-A835',
    },
  ],
})
const notoTelugu = localFont({
  src: './fonts/noto-sans-telugu.woff2',
  weight: '400 600',
  variable: '--font-noto-telugu',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0951-0952, U+0964-0965, U+0B83, U+0C00-0C7F, U+1CD5-1CD6, U+1CD8, U+1CDA, U+1CF2, U+200C-200D, U+25CC',
    },
  ],
})
const balooKannada = localFont({
  src: './fonts/baloo-tamma-2-kannada.woff2',
  weight: '600 800',
  variable: '--font-baloo-kannada',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0951-0952, U+0964-0965, U+0B83, U+0C80-0CF3, U+1CD0, U+1CD2-1CD3, U+1CDA, U+1CF2, U+1CF4, U+200C-200D, U+20B9, U+25CC, U+A830-A835',
    },
  ],
})
const balooTelugu = localFont({
  src: './fonts/baloo-tammudu-2-telugu.woff2',
  weight: '600 800',
  variable: '--font-baloo-telugu',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0951-0952, U+0964-0965, U+0B83, U+0C00-0C7F, U+1CD5-1CD6, U+1CD8, U+1CDA, U+1CF2, U+200C-200D, U+25CC',
    },
  ],
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
