import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Container from '@/components/ui/Container'
import ShopBookingForm from '@/components/shop/ShopBookingForm'
import { getActiveShopProduct } from '@/app/shop/actions'
import LocalizedCopy from '@/components/LocalizedCopy'

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

  const product = result.data

  return (
    <section className="relative pt-32 pb-20">
      <Container>
        <div className="mb-8">
          <Link href="/shop" className="btn-ghost text-sm px-0">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <LocalizedCopy id="backToShop" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <article className="card-cosmic overflow-hidden">
            {product.image_url && (
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            )}
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-gold-bright"><LocalizedCopy id="shopProducts" /></span>
              <h1 className="heading-serif text-3xl sm:text-4xl font-bold">{product.name}</h1>
              <p className="text-silver leading-relaxed">{product.description}</p>
              <p className="font-serif text-3xl font-bold text-gradient-gold">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </article>

          <ShopBookingForm product={product} />
        </div>
      </Container>
    </section>
  )
}
