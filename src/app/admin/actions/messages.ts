'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import type { ContactMessage, ContactMessageStatus } from '@/types/database'

export type MessageListResult =
  | { success: true;  data: ContactMessage[] }
  | { success: false; error: string }

export async function getMessages(): Promise<MessageListResult> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getMessages]', error.message)
      return { success: false, error: 'Failed to load messages.' }
    }
    return { success: true, data: (data ?? []) as ContactMessage[] }
  } catch (err) {
    console.error('[getMessages] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function updateMessageStatus(
  id: string,
  status: ContactMessageStatus
): Promise<{ success: boolean; error?: string }> {
  const allowed: ContactMessageStatus[] = ['unread', 'read', 'resolved']
  if (!allowed.includes(status)) {
    return { success: false, error: 'Invalid status value.' }
  }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('contact_messages')
      .update({ status } as never)
      .eq('id', id)

    if (error) {
      console.error('[updateMessageStatus]', error.message)
      return { success: false, error: 'Failed to update message status.' }
    }

    revalidatePath('/admin/messages')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (err) {
    console.error('[updateMessageStatus] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient()
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)

    if (error) {
      console.error('[deleteMessage]', error.message)
      return { success: false, error: 'Failed to delete message.' }
    }

    revalidatePath('/admin/messages')
    return { success: true }
  } catch (err) {
    console.error('[deleteMessage] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
