'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import { productSchema } from '@/lib/validations'
import type { Product, ProductInsert } from '@/types/database'

export type ProductListResult =
  | { success: true;  data: Product[] }
  | { success: false; error: string }

export type ProductMutateResult =
  | { success: true }
  | { success: false; error: string }

export async function getProducts(): Promise<ProductListResult> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getProducts]', error.message)
      return { success: false, error: 'Failed to load products.' }
    }
    return { success: true, data: (data ?? []) as Product[] }
  } catch (err) {
    console.error('[getProducts] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function createProduct(formData: unknown): Promise<ProductMutateResult> {
  const parsed = productSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid product data.' }
  }

  try {
    const supabase = createServiceClient()
    const payload: ProductInsert = {
      name:        parsed.data.name,
      description: parsed.data.description,
      price:       parsed.data.price,
      image_url:   parsed.data.image_url?.trim() || null,
      category:    parsed.data.category,
      active:      parsed.data.active,
    }

    const { error } = await supabase.from('products').insert(payload as never)
    if (error) {
      console.error('[createProduct]', error.message)
      return { success: false, error: 'Failed to create product.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    return { success: true }
  } catch (err) {
    console.error('[createProduct] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function updateProduct(id: string, formData: unknown): Promise<ProductMutateResult> {
  const parsed = productSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid product data.' }
  }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('products')
      .update({
        name:        parsed.data.name,
        description: parsed.data.description,
        price:       parsed.data.price,
        image_url:   parsed.data.image_url?.trim() || null,
        category:    parsed.data.category,
        active:      parsed.data.active,
        updated_at:  new Date().toISOString(),
      } as never)
      .eq('id', id)

    if (error) {
      console.error('[updateProduct]', error.message)
      return { success: false, error: 'Failed to update product.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    return { success: true }
  } catch (err) {
    console.error('[updateProduct] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function deleteProduct(id: string): Promise<ProductMutateResult> {
  try {
    const supabase = createServiceClient()
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      console.error('[deleteProduct]', error.message)
      return { success: false, error: 'Failed to delete product.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    return { success: true }
  } catch (err) {
    console.error('[deleteProduct] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function toggleProductActive(id: string, active: boolean): Promise<ProductMutateResult> {
  try {
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('products')
      .update({ active, updated_at: new Date().toISOString() } as never)
      .eq('id', id)

    if (error) {
      console.error('[toggleProductActive]', error.message)
      return { success: false, error: 'Failed to update product status.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    return { success: true }
  } catch (err) {
    console.error('[toggleProductActive] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
