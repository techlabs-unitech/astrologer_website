import type { Config } from 'tailwindcss'

/**
 * Panchanga design system.
 *
 * Every colour is a role backed by a CSS variable (see `src/app/globals.css`),
 * defined once for the light (cream) theme and once for the dark (temple
 * night) theme. Switching `data-theme` on <html> re-themes the whole site.
 *
 * The historic names (`cosmic-*`, `cream`, `silver`, …) are kept as roles so
 * existing markup keeps working:
 *   cosmic-black  page ground          cream   headings / ink
 *   cosmic-deep   band ground (hero)   silver  body text
 *   cosmic-navy   alternate band       muted   secondary text
 *   cosmic-card   card surface         gold    labels, accents
 *   cosmic-border hairlines            violet  italic accents, links
 *   primary / on-primary  main button
 *
 * `night` and `saffron` are fixed (not themed): they paint the deep-violet
 * art panels, which look the same in both themes.
 */
const role = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

const config: Config = {
  // `dark:` variants follow the site's theme toggle, not the OS setting.
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: role('ground'),
          deep: role('band'),
          navy: role('band-alt'),
          card: role('card'),
          border: role('line'),
        },
        violet: {
          dim: role('violet-dim'),
          DEFAULT: role('violet'),
          bright: role('violet'),
          light: role('violet-soft'),
          glow: role('violet-soft'),
        },
        gold: {
          dim: role('gold-dim'),
          DEFAULT: role('gold'),
          bright: role('gold'),
          light: role('gold-line'),
          pale: role('gold-pale'),
        },
        cream: role('ink'),
        ink: role('ink'),
        silver: role('body'),
        muted: role('muted'),
        primary: role('primary'),
        'on-primary': role('on-primary'),
        danger: role('danger'),
        success: role('success'),
        night: {
          DEFAULT: '#281044',
          deep: '#170828',
          violet: '#54217B',
        },
        saffron: {
          DEFAULT: '#E6B553',
          light: '#F6D58A',
        },
      },

      fontFamily: {
        // Latin text uses Inter / Cormorant; Kannada and Telugu glyphs fall
        // through to the Noto / Baloo faces listed after them.
        sans: [
          'var(--font-inter)',
          'var(--font-noto-kannada)',
          'var(--font-noto-telugu)',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          'var(--font-cormorant)',
          'var(--font-baloo-kannada)',
          'var(--font-baloo-telugu)',
          'Georgia',
          'serif',
        ],
        display: [
          'var(--font-cormorant)',
          'var(--font-baloo-kannada)',
          'var(--font-baloo-telugu)',
          'Georgia',
          'serif',
        ],
        symbol: [
          '"Segoe UI Symbol"',
          '"Noto Sans Symbols"',
          '"Noto Sans Symbols 2"',
          '"Apple Symbols"',
          'serif',
        ],
      },

      maxWidth: {
        '8xl': '90rem',
      },

      borderRadius: {
        card: '14px',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Panchanga uses hairlines instead of glows; the old glow names stay
      // as quiet shadows so existing markup doesn't break.
      boxShadow: {
        'glow-violet': '0 1px 2px rgb(var(--c-shadow) / 0.08)',
        'glow-gold': '0 1px 2px rgb(var(--c-shadow) / 0.08)',
        'glow-sm': '0 1px 2px rgb(var(--c-shadow) / 0.06)',
        card: '0 1px 2px rgb(var(--c-shadow) / 0.06)',
        'card-hover': '0 12px 32px -16px rgb(var(--c-shadow) / 0.35)',
      },

      backgroundImage: {
        'cosmic-radial': 'none',
        'hero-gradient': 'linear-gradient(rgb(var(--c-band)), rgb(var(--c-band)))',
        'card-gradient': 'linear-gradient(rgb(var(--c-card)), rgb(var(--c-card)))',
        'gold-gradient': 'linear-gradient(rgb(var(--c-gold)), rgb(var(--c-gold)))',
        'violet-gradient': 'linear-gradient(rgb(var(--c-violet)), rgb(var(--c-violet)))',
        'section-dark': 'linear-gradient(rgb(var(--c-band-alt)), rgb(var(--c-band-alt)))',
        'night-panel':
          'radial-gradient(circle at 50% 45%, #54217B 0%, #281044 62%, #170828 100%)',
      },

      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'twinkle-fast': 'twinkle 1.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'rotate-slow': 'rotate-slow 60s linear infinite',
      },

      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.12' }],
        '7xl': ['4.5rem', { lineHeight: '1.08' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}

export default config
