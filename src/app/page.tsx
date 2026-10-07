import HomeContent from '@/components/home/HomeContent'
import { getFeaturedProducts } from '@/app/shop/actions'

export const revalidate = 60

export default async function HomePage() {
  const result = await getFeaturedProducts(8)
  const featuredProducts = result.success ? result.data : []

  return <HomeContent featuredProducts={featuredProducts} />
}
