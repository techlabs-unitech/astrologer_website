import type { Product } from '@/types/database'
import type { Language } from '@/translations/translations'
import { PRODUCT_TRANSLATIONS } from '@/lib/product-translations'

type LocalizableProduct = Pick<Product, 'name' | 'description'> &
  Partial<Pick<Product, 'id' | 'name_kn' | 'name_te' | 'description_kn' | 'description_te'>>

/**
 * Returns the product name/description in the visitor's language.
 * Order of preference: translation columns on the product (if the database
 * ever gets them) → the in-code translations in product-translations.ts →
 * the English text entered in the admin panel.
 */
export function localizeProduct(
  product: LocalizableProduct,
  language: Language
): { name: string; description: string } {
  if (language === 'en') return { name: product.name, description: product.description }

  const stored =
    language === 'kn'
      ? { name: product.name_kn, description: product.description_kn }
      : { name: product.name_te, description: product.description_te }
  const bundled = product.id ? PRODUCT_TRANSLATIONS[product.id]?.[language] : undefined

  return {
    name: stored.name?.trim() || bundled?.name || product.name,
    description: stored.description?.trim() || bundled?.description || product.description,
  }
}
