'use server'

import { createServiceClient } from '@/lib/supabase/service'
import { contactFormSchema } from '@/lib/validations'
import type { ContactMessageInsert } from '@/types/database'

export type ContactResult =
  | { success: true }
  | { success: false; error: string; field?: string }

export async function submitContactMessage(formData: unknown): Promise<ContactResult> {
  // 1. Server-side Zod validation — never trust client
  const parsed = contactFormSchema.safeParse(formData)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return {
      success: false,
      error: first?.message ?? 'Please check your details and try again.',
      field: first?.path?.[0]?.toString(),
    }
  }

  const data = parsed.data

  // 2. Guard — env vars present
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    console.error('[submitContactMessage] Supabase env vars missing')
    return {
      success: false,
      error: 'Unable to send your message right now. Please email us directly.',
    }
  }

  // 3. Insert into contact_messages
  try {
    const supabase = createServiceClient()

    const payload: ContactMessageInsert = {
      name:    data.name,
      email:   data.email,
      phone:   typeof data.phone === 'string' && data.phone.trim()
               ? data.phone.trim()
               : null,
      // Store subject + message together so the admin sees full context
      message: data.subject
               ? `[${data.subject}]\n\n${data.message}`
               : data.message,
      status:  'unread',
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert(payload as never)

    if (error) {
      console.error('[submitContactMessage] Supabase error:', error.code, error.message)
      return {
        success: false,
        error: "We couldn't send your message right now. Please try again or email us directly.",
      }
    }

    return { success: true }
  } catch (err) {
    console.error('[submitContactMessage] unexpected:', err)
    return {
      success: false,
      error: "We couldn't send your message right now. Please try again or email us directly.",
    }
  }
}
