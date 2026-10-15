import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Container from '@/components/ui/Container'
import ShopCheckout from '@/components/shop/ShopCheckout'
import { getActiveShopProduct } from '@/app/shop/actions'
import LocalizedCopy from '@/components/LocalizedCopy'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop Booking',
  description: 'Complete your SaiBabaAstro product booking.',
}

interface ShopBookingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ShopBookingPage({ searchParams }: ShopBookingPageProps) {
  const params = await searchParams
  const productId = typeof params.product === 'string' ? params.product : ''
  const result = productId
    ? await getActiveShopProduct(productId)
    : { success: false as const, error: 'Product not found.' }

  if (!result.success) {
    return (
      <section className="relative pt-32 pb-20 min-h-[70vh]">
        <Container size="sm">
          <div className="card-cosmic p-8 sm:p-12 flex flex-col items-center gap-5 text-center">
            <ShoppingBag className="w-10 h-10 text-gold-bright" aria-hidden="true" />
            <h1 className="heading-serif text-3xl font-bold"><LocalizedCopy id="productNotFound" /></h1>
            <p className="text-silver text-sm">{result.error}</p>
            <Link href="/shop" className="btn-primary text-sm">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <LocalizedCopy id="backToShop" />
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20">
      <Container>
        <div className="mb-8">
          <Link href="/shop" className="btn-ghost text-sm px-0">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <LocalizedCopy id="backToShop" />
          </Link>
        </div>

        <ShopCheckout product={result.data} />
      </Container>
    </section>
  )
}
