'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import { productSchema } from '@/lib/validations'
import { translateText, isTranslationConfigured } from '@/lib/translate'
import type { Product, ProductInsert } from '@/types/database'

export type ProductListResult =
  | { success: true;  data: Product[] }
  | { success: false; error: string }

export type ProductMutateResult =
  /** translationsSaved is false when the table has no Kannada / Telugu columns */
  | { success: true; translationsSaved?: boolean }
  | { success: false; error: string }

type Translations = {
  name_kn: string | null; name_te: string | null
  description_kn: string | null; description_te: string | null
}

/**
 * Whether the products table has the name_kn / name_te / description_kn /
 * description_te columns. Unknown until the first save; the live table
 * currently does not have them, so saves fall back to English-only.
 */
let translationColumns: boolean | null = null

function isMissingTranslationColumn(error: { code?: string; message?: string }) {
  // 42703: Postgres undefined column; PGRST204: column not in PostgREST's schema cache
  return (
    (error.code === '42703' || error.code === 'PGRST204') &&
    /(name|description)_(kn|te)/.test(error.message ?? '')
  )
}

/**
 * Run an insert/update with the translation fields; if the table lacks those
 * columns, run it again without them so the product still saves.
 */
async function saveWithTranslations(
  translations: Translations,
  run: (fields: Partial<Translations>) => PromiseLike<{ error: { code?: string; message: string } | null }>,
) {
  if (translationColumns !== false) {
    const { error } = await run(translations)
    if (!error) {
      translationColumns = true
      return { error: null, translationsSaved: true }
    }
    if (!isMissingTranslationColumn(error)) return { error, translationsSaved: false }
    translationColumns = false
  }
  const { error } = await run({})
  return { error, translationsSaved: false }
}

/**
 * Fill any blank Kannada / Telugu field by translating the English text.
 * Manually-typed translations are never overwritten. Skipped once we know
 * the table can't store translations, to avoid paying for unused API calls.
 */
async function withTranslations(d: {
  name: string; description: string
  name_kn?: string; name_te?: string; description_kn?: string; description_te?: string
}): Promise<Translations> {
  const out: Translations = {
    name_kn:        d.name_kn?.trim() || null,
    name_te:        d.name_te?.trim() || null,
    description_kn: d.description_kn?.trim() || null,
    description_te: d.description_te?.trim() || null,
  }
  if (!isTranslationConfigured() || translationColumns === false) return out

  const [name, desc] = await Promise.all([
    out.name_kn && out.name_te ? null : translateText(d.name),
    out.description_kn && out.description_te ? null : translateText(d.description),
  ])
  out.name_kn        = out.name_kn        ?? name?.kn ?? null
  out.name_te        = out.name_te        ?? name?.te ?? null
  out.description_kn = out.description_kn ?? desc?.kn ?? null
  out.description_te = out.description_te ?? desc?.te ?? null
  return out
}

export type TranslatePreviewResult =
  | { success: true; configured: true;  name_kn: string; name_te: string; description_kn: string; description_te: string }
  | { success: false; configured: boolean; error: string }

/** Used by the "Auto-translate" button in the admin product form. */
export async function previewTranslation(name: string, description: string): Promise<TranslatePreviewResult> {
  if (!isTranslationConfigured()) {
    return {
      success: false, configured: false,
      error: 'Auto-translate is not set up. Add GOOGLE_TRANSLATE_API_KEY to your environment, or type the Kannada / Telugu text manually.',
    }
  }
  if (!name.trim() || !description.trim()) {
    return { success: false, configured: true, error: 'Enter the English name and description first.' }
  }
  const [n, d] = await Promise.all([translateText(name), translateText(description)])
  if (!n.kn || !n.te || !d.kn || !d.te) {
    return { success: false, configured: true, error: 'Translation failed. Please try again or type it manually.' }
  }
  return { success: true, configured: true, name_kn: n.kn, name_te: n.te, description_kn: d.kn, description_te: d.te }
}

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
    const base: ProductInsert = {
      name:        parsed.data.name,
      description: parsed.data.description,
      price:       parsed.data.price,
      image_url:   parsed.data.image_url?.trim() || null,
      category:    parsed.data.category,
      active:      parsed.data.active,
    }

    const { error, translationsSaved } = await saveWithTranslations(
      await withTranslations(parsed.data),
      (fields) => supabase.from('products').insert({ ...base, ...fields } as never),
    )
    if (error) {
      console.error('[createProduct]', error.message)
      return { success: false, error: 'Failed to create product.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
    return { success: true, translationsSaved }
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
    const base = {
      name:        parsed.data.name,
      description: parsed.data.description,
      price:       parsed.data.price,
      image_url:   parsed.data.image_url?.trim() || null,
      category:    parsed.data.category,
      active:      parsed.data.active,
      updated_at:  new Date().toISOString(),
    }

    const { error, translationsSaved } = await saveWithTranslations(
      await withTranslations(parsed.data),
      (fields) => supabase.from('products').update({ ...base, ...fields } as never).eq('id', id),
    )
    if (error) {
      console.error('[updateProduct]', error.message)
      return { success: false, error: 'Failed to update product.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
    return { success: true, translationsSaved }
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
    revalidatePath('/')
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
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('[toggleProductActive] unexpected:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
