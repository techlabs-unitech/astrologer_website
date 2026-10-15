'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import type { Order, OrderStatus } from '@/types/database'

export type OrderListResult =
  | { success: true;  data: Order[] }
  | { success: false; error: string }

export async function getOrders(): Promise<OrderListResult> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getOrders]', error.message)
      return { success: false, error: 'Failed to load orders. Have you run migration 007?' }
    }
    return { success: true, data: (data ?? []) as Order[] }
  } catch (err) {
    console.error('[getOrders] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<{ success: boolean; error?: string }> {
  const allowed: OrderStatus[] = ['new', 'processing', 'shipped', 'delivered', 'cancelled']
  if (!allowed.includes(status)) return { success: false, error: 'Invalid status value.' }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase.from('orders').update({ order_status: status } as never).eq('id', id)
    if (error) {
      console.error('[updateOrderStatus]', error.message)
      return { success: false, error: 'Failed to update order status.' }
    }
    revalidatePath('/admin/orders')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (err) {
    console.error('[updateOrderStatus] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
