import type { Product } from '@/types/database'
import type { Language } from '@/translations/translations'

/**
 * Returns the product name/description in the visitor's language.
 * Falls back to English (the admin-entered text) when a translation is missing.
 */
export function localizeProduct(
  product: Pick<Product, 'name' | 'description' | 'name_kn' | 'name_te' | 'description_kn' | 'description_te'>,
  language: Language
): { name: string; description: string } {
  if (language === 'kn') {
    return {
      name: product.name_kn?.trim() || product.name,
      description: product.description_kn?.trim() || product.description,
    }
  }
  if (language === 'te') {
    return {
      name: product.name_te?.trim() || product.name,
      description: product.description_te?.trim() || product.description,
    }
  }
  return { name: product.name, description: product.description }
}
