/**
 * Server-side appointment helpers.
 * Must only be called from Server Components, Server Actions, or Route Handlers.
 */

import { createServiceClient } from '@/lib/supabase/service'

// Re-export client-safe utilities so server callers only need one import
export { TIME_SLOTS, formatTimeSlot, isPastTimeSlot } from '@/lib/appointment-utils'
export type { TimeSlot } from '@/lib/appointment-utils'

// ─── BookingResult — safe return type for server actions ─────────────────────

export type BookingResult =
  | { success: true;  bookingId: string }
  | { success: false; error: string; field?: string }

// ─── getBookedSlots ───────────────────────────────────────────────────────────
/**
 * Returns the list of already-booked time slots for `date` (YYYY-MM-DD).
 *
 * Uses the service-role client (SUPABASE_SERVICE_ROLE_KEY) which bypasses RLS
 * and is granted SELECT on appointments server-side only.
 * Only appointment_time is fetched — no private user data is ever returned.
 *
 * Only non-cancelled appointments count — mirrors the partial unique index.
 * Returns [] gracefully if Supabase is not configured or an error occurs.
 */
export async function getBookedSlots(date: string): Promise<string[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return []
  }

  try {
    const supabase = createServiceClient()

    // Select ONLY the time column — no private user data is ever fetched.
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .neq('status', 'cancelled')

    if (error) {
      console.error(
        '[getBookedSlots] Supabase error — code:', error.code,
        '| message:', error.message,
      )
      return []
    }

    return ((data ?? []) as Array<{ appointment_time: string }>).map((row) =>
      // Supabase returns TIME columns as "HH:MM:SS" — normalise to "HH:MM"
      row.appointment_time.slice(0, 5)
    )
  } catch (err) {
    console.error('[getBookedSlots] Unexpected error:', err instanceof Error ? err.message : String(err))
    return []
  }
}
