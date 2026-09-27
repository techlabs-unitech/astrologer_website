'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import type { Appointment, AppointmentStatus } from '@/types/database'

export type AppointmentListResult =
  | { success: true;  data: Appointment[] }
  | { success: false; error: string }

export async function getAppointments(): Promise<AppointmentListResult> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false })

    if (error) {
      console.error('[getAppointments]', error.message)
      return { success: false, error: 'Failed to load appointments.' }
    }
    return { success: true, data: (data ?? []) as Appointment[] }
  } catch (err) {
    console.error('[getAppointments] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<{ success: boolean; error?: string }> {
  const allowed: AppointmentStatus[] = ['pending', 'confirmed', 'completed', 'cancelled']
  if (!allowed.includes(status)) {
    return { success: false, error: 'Invalid status value.' }
  }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('appointments')
      .update({ status } as never)
      .eq('id', id)

    if (error) {
      console.error('[updateAppointmentStatus]', error.message)
      return { success: false, error: 'Failed to update appointment status.' }
    }

    revalidatePath('/admin/appointments')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (err) {
    console.error('[updateAppointmentStatus] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
