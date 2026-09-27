import { z } from 'zod'

// ─── Shared field definitions ─────────────────────────────────────────────────

const nameField = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be 100 characters or fewer')
  .trim()

const emailField = z
  .string()
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim()

const phoneField = z
  .string()
  .regex(/^[+]?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number')
  .trim()

const optionalPhoneField = z
  .union([
    z.string().regex(/^[+]?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number').trim(),
    z.literal(''),
  ])
  .optional()

// ─── Contact form ─────────────────────────────────────────────────────────────

export const CONTACT_SUBJECTS = [
  'General Enquiry',
  'Birth Chart Reading',
  'Love & Relationship Reading',
  'Career & Finance Reading',
  'Appointment / Booking',
  'Other',
] as const

export const contactFormSchema = z.object({
  name: nameField,
  email: emailField,
  phone: optionalPhoneField,
  subject: z.enum(CONTACT_SUBJECTS, {
    error: 'Please select a subject',
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be 2000 characters or fewer')
    .trim(),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>

// ─── Appointment booking ──────────────────────────────────────────────────────
// Service names match the STATIC_PRODUCTS in src/lib/shop-data.ts exactly.

export const AVAILABLE_SERVICES = [
  'Detailed Birth Chart',
  'Love & Relationship Reading',
  'Career Astrology Consultation',
  'Marriage Compatibility Report',
  'One-on-One Astrology Consultation',
  'Annual Horoscope Report',
] as const

export type AvailableService = (typeof AVAILABLE_SERVICES)[number]

// Slug → service name lookup used by the appointment page to preselect
// a service when arriving from /shop via ?service=<slug>
export const SERVICE_SLUG_MAP: Record<string, AvailableService> = {
  'detailed-birth-chart':          'Detailed Birth Chart',
  'love-relationship-reading':     'Love & Relationship Reading',
  'career-astrology-consultation': 'Career Astrology Consultation',
  'marriage-compatibility-report': 'Marriage Compatibility Report',
  'one-on-one-consultation':       'One-on-One Astrology Consultation',
  'annual-horoscope-report':       'Annual Horoscope Report',
}

// Reverse map: service name → slug, used by shop cards to build the
// ?service= query param reliably without deriving slugs from display names.
export const SERVICE_NAME_TO_SLUG: Record<AvailableService, string> = {
  'Detailed Birth Chart':             'detailed-birth-chart',
  'Love & Relationship Reading':      'love-relationship-reading',
  'Career Astrology Consultation':    'career-astrology-consultation',
  'Marriage Compatibility Report':    'marriage-compatibility-report',
  'One-on-One Astrology Consultation':'one-on-one-consultation',
  'Annual Horoscope Report':          'annual-horoscope-report',
}

export const appointmentSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  service: z.enum(AVAILABLE_SERVICES, {
    error: 'Please select a valid service',
  }),
  appointment_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((date) => {
      const selected = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, 'Appointment date cannot be in the past'),
  appointment_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  notes: z
    .union([
      z.string().max(1000, 'Notes must be 1000 characters or fewer').trim(),
      z.literal(''),
    ])
    .optional(),
})

export type AppointmentSchema = z.infer<typeof appointmentSchema>

// ─── Product (admin CRUD) ─────────────────────────────────────────────────────

export const PRODUCT_CATEGORIES = [
  'consultation',
  'report',
  'relationship',
  'career',
  'gemstone',
  'yantra',
  'rudraksha',
  'vastu',
  'other',
] as const

export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(150, 'Product name must be 150 characters or fewer')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be 2000 characters or fewer')
    .trim(),
  price: z
    .number({ error: 'Price must be a number' })
    .positive('Price must be greater than zero')
    .multipleOf(0.01, 'Price can have at most 2 decimal places'),
  image_url: z
    .union([z.string().url('Please enter a valid image URL'), z.literal('')])
    .optional(),
  category: z.enum(PRODUCT_CATEGORIES, {
    error: 'Please select a valid category',
  }),
  active: z.boolean().default(true),
})

export type ProductSchema = z.infer<typeof productSchema>

// ─── Admin login ──────────────────────────────────────────────────────────────

export const adminLoginSchema = z.object({
  email: emailField,
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>
