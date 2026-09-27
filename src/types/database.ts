export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type ContactMessageStatus = 'unread' | 'read' | 'resolved'
export type ProductCategory =
  | 'consultation'
  | 'report'
  | 'relationship'
  | 'career'
  | 'gemstone'
  | 'yantra'
  | 'rudraksha'
  | 'vastu'
  | 'other'

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: Appointment
        Insert: AppointmentInsert
        Update: Partial<AppointmentInsert>
      }
      products: {
        Row: Product
        Insert: ProductInsert
        Update: Partial<ProductInsert>
      }
      contact_messages: {
        Row: ContactMessage
        Insert: ContactMessageInsert
        Update: Partial<ContactMessageInsert>
      }
    }
  }
}

// ─── Appointment ────────────────────────────────────────────────────────────

export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  appointment_date: string   // ISO date string: YYYY-MM-DD
  appointment_time: string   // HH:MM (24-hour)
  status: AppointmentStatus
  notes: string | null
  created_at: string
}

export type AppointmentInsert = Omit<Appointment, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
  status?: AppointmentStatus
  notes?: string | null
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: ProductCategory
  active: boolean
  created_at: string
  updated_at: string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  created_at?: string
  updated_at?: string
  active?: boolean
}

// ─── Contact Message ─────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: ContactMessageStatus
  created_at: string
}

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
  status?: ContactMessageStatus
  phone?: string | null
}
