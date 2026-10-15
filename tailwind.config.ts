import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Color palette ──────────────────────────────────────────────────
      colors: {
        // Base backgrounds
        cosmic: {
          black:   '#07060f',   // deepest background
          deep:    '#0d0b1e',   // primary bg
          navy:    '#0f0d2a',   // section bg
          card:    '#13103a',   // card bg
          border:  '#2a2060',   // subtle border
        },
        // Purple family
        violet: {
          dim:    '#3b2f6e',
          DEFAULT:'#6b46c1',
          bright: '#8b5cf6',
          light:  '#a78bfa',
          glow:   '#c4b5fd',
        },
        // Gold / orange accents
        gold: {
          dim:    '#92400e',
          DEFAULT:'#d97706',
          bright: '#f59e0b',
          light:  '#fcd34d',
          pale:   '#fef3c7',
        },
        // Text colours
        cream:   '#f5f0e8',
        silver:  '#cbd5e1',
        muted:   '#94a3b8',
      },

      // ─── Typography ────────────────────────────────────────────────────
      fontFamily: {
        serif:  ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans:   [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: ['Georgia', 'Cambria', 'serif'], // for hero headings
      },

      // ─── Spacing / sizing ──────────────────────────────────────────────
      maxWidth: {
        '8xl': '90rem',
      },

      // ─── Border radius ─────────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Box shadows / glows ───────────────────────────────────────────
      boxShadow: {
        'glow-violet': '0 0 20px 4px rgba(107,70,193,0.35)',
        'glow-gold':   '0 0 20px 4px rgba(217,119,6,0.35)',
        'glow-sm':     '0 0 10px 2px rgba(107,70,193,0.25)',
        'card':        '0 4px 24px 0 rgba(0,0,0,0.5)',
        'card-hover':  '0 8px 40px 0 rgba(107,70,193,0.25)',
      },

      // ─── Background images / gradients ────────────────────────────────
      backgroundImage: {
        'cosmic-radial':
          'radial-gradient(ellipse at 50% 0%, rgba(107,70,193,0.18) 0%, transparent 70%)',
        'hero-gradient':
          'linear-gradient(135deg, #0d0b1e 0%, #130f35 50%, #0d0b1e 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(19,16,58,0.9) 0%, rgba(13,11,30,0.95) 100%)',
        'gold-gradient':
          'linear-gradient(90deg, #d97706, #f59e0b, #d97706)',
        'violet-gradient':
          'linear-gradient(135deg, #6b46c1, #8b5cf6)',
        'section-dark':
          'linear-gradient(180deg, #0d0b1e 0%, #0f0d2a 100%)',
      },

      // ─── Keyframe animations ───────────────────────────────────────────
      keyframes: {
        'twinkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.3', transform: 'scale(0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(107,70,193,0.3)' },
          '50%':      { boxShadow: '0 0 25px 6px rgba(107,70,193,0.6)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rotate-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'twinkle':      'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'twinkle-fast': 'twinkle 1.5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 2.5s ease-in-out infinite',
        'shimmer':      'shimmer 3s linear infinite',
        'fade-up':      'fade-up 0.6s ease-out forwards',
        'rotate-slow':  'rotate-slow 30s linear infinite',
      },

      // ─── Typography scale ───────────────────────────────────────────────
      fontSize: {
        '5xl':  ['3rem',   { lineHeight: '1.1' }],
        '6xl':  ['3.75rem',{ lineHeight: '1.05' }],
        '7xl':  ['4.5rem', { lineHeight: '1' }],
        '8xl':  ['6rem',   { lineHeight: '0.95' }],
      },
    },
  },
  plugins: [],
}

export default config
