/**
 * Server-only auto-translation (English → Kannada / Telugu).
 *
 * Uses Google Cloud Translation (Basic v2) when GOOGLE_TRANSLATE_API_KEY is set.
 * When the key is missing or the call fails, functions return nulls and the
 * storefront simply falls back to the English text — nothing breaks.
 */

export type TranslatedPair = { kn: string | null; te: string | null }

async function translateOne(text: string, target: 'kn' | 'te'): Promise<string | null> {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY
  if (!key || !text.trim()) return null

  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: 'en', target, format: 'text' }),
        cache: 'no-store',
      }
    )
    if (!res.ok) {
      console.error('[translate] HTTP', res.status)
      return null
    }
    const json = (await res.json()) as {
      data?: { translations?: Array<{ translatedText?: string }> }
    }
    return json.data?.translations?.[0]?.translatedText?.trim() || null
  } catch (err) {
    console.error('[translate] failed:', err instanceof Error ? err.message : err)
    return null
  }
}

export async function translateText(text: string): Promise<TranslatedPair> {
  const [kn, te] = await Promise.all([translateOne(text, 'kn'), translateOne(text, 'te')])
  return { kn, te }
}

export function isTranslationConfigured(): boolean {
  return Boolean(process.env.GOOGLE_TRANSLATE_API_KEY)
}
