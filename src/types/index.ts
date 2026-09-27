// Re-export all database types for convenient imports
export type {
  Database,
  Appointment,
  AppointmentInsert,
  AppointmentStatus,
  Product,
  ProductInsert,
  ProductCategory,
  ContactMessage,
  ContactMessageInsert,
  ContactMessageStatus,
} from './database'

// ─── UI / Component types ────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
  slug: string
}

export interface TestimonialItem {
  name: string
  location: string
  rating: number
  text: string
  avatarInitials: string
}

// ─── API response wrapper ────────────────────────────────────────────────────

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// ─── Form state (used with react-hook-form) ──────────────────────────────────

export interface BookingFormValues {
  name: string
  email: string
  phone: string
  service: string
  appointment_date: string
  appointment_time: string
  notes?: string
}

export interface ContactFormValues {
  name: string
  email: string
  phone?: string
  message: string
}
