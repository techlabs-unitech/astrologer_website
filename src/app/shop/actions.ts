'use server'

import { createServiceClient } from '@/lib/supabase/service'
import type { Product } from '@/types/database'

export type ShopProductResult =
  | { success: true;  data: Product[] }
  | { success: false; error: string }

export type ShopProductByIdResult =
  | { success: true; data: Product }
  | { success: false; error: string }

/**
 * Fetch all active products for the public shop page.
 * Uses the service-role client so the query succeeds regardless of the
 * anon RLS policy — the results are already filtered to active=true.
 * Returns an empty array gracefully when Supabase is not configured.
 */
export async function getActiveProducts(): Promise<ShopProductResult> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return { success: false, error: 'Database not configured.' }
  }

  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .not('category', 'in', '(consultation,report,relationship,career)')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[getActiveProducts]', error.message)
      return { success: false, error: 'Failed to load products.' }
    }

    return { success: true, data: (data ?? []) as Product[] }
  } catch (err) {
    console.error('[getActiveProducts] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

/**
 * Fetch a small set of active shop products for the homepage
 * "Featured Products" carousel. Falls back to an empty array (the
 * carousel section simply doesn't render) when Supabase isn't configured
 * or the catalogue is empty.
 */
export async function getFeaturedProducts(limit = 8): Promise<ShopProductResult> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return { success: false, error: 'Database not configured.' }
  }

  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .not('category', 'in', '(consultation,report,relationship,career)')
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('[getFeaturedProducts]', error.message)
      return { success: false, error: 'Failed to load featured products.' }
    }

    return { success: true, data: (data ?? []) as Product[] }
  } catch (err) {
    console.error('[getFeaturedProducts] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

/** Fetch one active Shop product by ID for the separate Shop booking flow. */
export async function getActiveShopProduct(productId: string): Promise<ShopProductByIdResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: 'Database not configured.' }
  }

  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('active', true)
      .not('category', 'in', '(consultation,report,relationship,career)')
      .maybeSingle()

    if (error) {
      console.error('[getActiveShopProduct]', error.message)
      return { success: false, error: 'Failed to load product.' }
    }

    return data
      ? { success: true, data: data as Product }
      : { success: false, error: 'Product not found.' }
  } catch (err) {
    console.error('[getActiveShopProduct] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
