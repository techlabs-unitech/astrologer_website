'use server'

import { appointmentSchema, AVAILABLE_SERVICES } from '@/lib/validations'
import { createServiceClient } from '@/lib/supabase/service'
import type { BookingResult } from '@/lib/appointment'
import type { AppointmentInsert } from '@/types/database'

// ─── createAppointment server action ─────────────────────────────────────────
// Uses the service-role client so the insert bypasses RLS.
// The appointments table has an INSERT policy for anon users, but relying on
// the anon key + RLS is fragile across Supabase project resets. The service-
// role client is already used by every other server action in this project.

export async function createAppointment(
  formData: unknown
): Promise<BookingResult> {
  // 1. Guard — env vars present
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return {
      success: false,
      error:
        'Booking is temporarily unavailable. Please contact us directly to arrange an appointment.',
    }
  }

  // 2. Server-side Zod validation — never trust the client
  const parsed = appointmentSchema.safeParse(formData)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return {
      success: false,
      error: firstIssue?.message ?? 'Please check your details and try again.',
      field: firstIssue?.path?.[0]?.toString(),
    }
  }

  const data = parsed.data

  // 3. Guard — service must be in the allow-list (paranoid double-check)
  if (!(AVAILABLE_SERVICES as readonly string[]).includes(data.service)) {
    return { success: false, error: 'The selected service is not available.' }
  }

  // 4. Normalise time to "HH:MM:SS" for the PostgreSQL TIME column
  const appointmentTime =
    data.appointment_time.length === 5
      ? `${data.appointment_time}:00`
      : data.appointment_time

  // 5. Insert using the service-role client (bypasses RLS, guaranteed to work)
  try {
    const supabase = createServiceClient()

    const insertPayload: AppointmentInsert = {
      name:             data.name,
      email:            data.email,
      phone:            data.phone,
      service:          data.service,
      appointment_date: data.appointment_date,
      appointment_time: appointmentTime,
      status:           'pending',
      notes:            data.notes?.trim() || null,
    }

    const { error } = await supabase
      .from('appointments')
      .insert(insertPayload as never)

    if (error) {
      // PostgreSQL unique-violation: duplicate active slot
      if (error.code === '23505') {
        return {
          success: false,
          error:
            'That time slot has just been booked by someone else. Please choose a different time.',
          field: 'appointment_time',
        }
      }

      // Log full detail server-side; return safe message to client
      console.error(
        '[createAppointment] Supabase error — code:', error.code,
        '| message:', error.message,
        '| details:', error.details,
        '| hint:', error.hint,
      )
      return {
        success: false,
        error:
          "We couldn't complete your booking right now. Please try again or contact us directly.",
      }
    }

    return { success: true, bookingId: '' }
  } catch (err) {
    console.error(
      '[createAppointment] unexpected error:',
      err instanceof Error ? err.message : String(err),
    )
    return {
      success: false,
      error:
        "We couldn't complete your booking right now. Please try again or contact us directly.",
    }
  }
}
