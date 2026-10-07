/**
 * Static shop data for Phase 3.
 * Field names mirror the Supabase `products` table exactly so this
 * array can be swapped for a Supabase query in a later phase with
 * minimal changes to the consuming components.
 */

import type { ProductCategory } from '@/types/database'

// ─── Extended static type ─────────────────────────────────────────────────────
// Adds `slug`, `icon`, and `featured` on top of the DB shape.
// These three fields are UI-only and will not be stored in Supabase.

export interface StaticProduct {
  id: string
  name: string
  description: string
  price: number                // in INR paise-free (e.g. 999 = ₹999)
  image_url: string | null
  category: ProductCategory
  active: boolean
  featured: boolean            // UI-only: show "Most Popular" / "Recommended" badge
  slug: string                 // URL-safe identifier for /appointment?service=<slug>
  icon: string                 // lucide icon name — resolved in ProductCard
  created_at: string
  updated_at: string
}

// ─── Filter category definition ───────────────────────────────────────────────

export interface ShopCategory {
  value: ProductCategory | 'all'
  label: string
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { value: 'all',          label: 'All' },
  { value: 'gemstone',     label: 'Gemstones' },
  { value: 'yantra',       label: 'Yantras' },
  { value: 'rudraksha',    label: 'Rudraksha' },
  { value: 'vastu',        label: 'Vastu' },
  { value: 'other',        label: 'Other' },
]

// ─── Product data ─────────────────────────────────────────────────────────────

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: 'prod_001',
    name: 'Detailed Birth Chart',
    description:
      'A comprehensive written analysis of your natal chart covering all 12 houses, planetary positions, yogas, and a 12-month Dasha forecast. Delivered as a structured PDF report.',
    price: 999,
    image_url: null,
    category: 'report',
    active: true,
    featured: false,
    slug: 'detailed-birth-chart',
    icon: 'BookOpen',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_002',
    name: 'Love & Relationship Reading',
    description:
      'An in-depth chart reading focused on your relationship patterns, Venus placement, 7th house analysis, and practical guidance for love and partnership decisions.',
    price: 1499,
    image_url: null,
    category: 'relationship',
    active: true,
    featured: true,
    slug: 'love-relationship-reading',
    icon: 'Heart',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_003',
    name: 'Career Astrology Consultation',
    description:
      'A focused live consultation examining your 10th house, 2nd house, and planetary periods to identify your natural vocational strengths and the best timing for career moves.',
    price: 1299,
    image_url: null,
    category: 'career',
    active: true,
    featured: false,
    slug: 'career-astrology-consultation',
    icon: 'Briefcase',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_004',
    name: 'Marriage Compatibility Report',
    description:
      'Traditional Ashtakoot matching combined with full synastry analysis — covering emotional compatibility, karmic bonds, and long-term partnership potential. Includes a written report.',
    price: 1799,
    image_url: null,
    category: 'relationship',
    active: true,
    featured: true,
    slug: 'marriage-compatibility-report',
    icon: 'Users',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_005',
    name: 'One-on-One Astrology Consultation',
    description:
      'A 60-minute live consultation (video or phone) covering any area of your chart and life. Bring your most pressing questions. Recording and brief written summary included.',
    price: 1999,
    image_url: null,
    category: 'consultation',
    active: true,
    featured: false,
    slug: 'one-on-one-consultation',
    icon: 'Calendar',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_006',
    name: 'Annual Horoscope Report',
    description:
      'A month-by-month written forecast for the year ahead — covering career, relationships, health, and major transits. Based on your natal chart and current planetary periods.',
    price: 1499,
    image_url: null,
    category: 'report',
    active: true,
    featured: false,
    slug: 'annual-horoscope-report',
    icon: 'Star',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]
