'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, ShoppingBag } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import type { Product } from '@/types/database'

interface ShopBookingFormProps {
  product: Product
}

export default function ShopBookingForm({ product }: ShopBookingFormProps) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 350)
  }

  if (submitted) {
    return (
      <div className="card-cosmic p-8 sm:p-10 flex flex-col items-center gap-5 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-violet/20 border border-gold/40 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gold-bright" aria-hidden="true" />
        </div>
        <h2 className="heading-serif text-2xl font-semibold">{t.common.orderReceived}</h2>
        <p className="text-silver text-sm max-w-md leading-relaxed">{t.common.orderConfirmation}</p>
        <p className="text-muted text-xs max-w-md">{t.common.orderNotSaved}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-cosmic p-6 sm:p-8 flex flex-col gap-5">
      <div className="flex items-center gap-3 pb-4 border-b border-cosmic-border">
        <ShoppingBag className="w-5 h-5 text-gold-bright" aria-hidden="true" />
        <h2 className="heading-serif text-xl font-semibold">{t.common.shopBooking}</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="shop-order-name" className="label-cosmic">{t.common.customerName}</label>
          <input id="shop-order-name" name="name" required className="input-cosmic" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="shop-order-phone" className="label-cosmic">{t.common.phone}</label>
          <input id="shop-order-phone" name="phone" required type="tel" className="input-cosmic" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="shop-order-email" className="label-cosmic">{t.common.email}</label>
          <input id="shop-order-email" name="email" required type="email" className="input-cosmic" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="shop-order-quantity" className="label-cosmic">{t.common.quantity}</label>
          <input id="shop-order-quantity" name="quantity" required type="number" min="1" defaultValue="1" className="input-cosmic" />
        </div>
      </div>

      <div>
        <label htmlFor="shop-order-address" className="label-cosmic">{t.common.address}</label>
        <textarea id="shop-order-address" name="address" required rows={4} className="input-cosmic resize-none" autoComplete="street-address" />
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-cosmic-border">
        <div>
          <p className="text-muted text-xs">{t.common.products}</p>
          <p className="font-serif text-xl font-bold text-gradient-gold">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-6">
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {t.common.placeOrder}
        </button>
      </div>
    </form>
  )
}
