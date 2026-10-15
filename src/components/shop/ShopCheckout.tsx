'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Loader2, Lock, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { localizeProduct } from '@/lib/localize'
import type { Product } from '@/types/database'

// ─── Minimal Razorpay Checkout.js typings ────────────────────────────────────
interface RazorpaySuccess {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  prefill: { name: string; email: string; contact: string }
  theme: { color: string }
  handler: (response: RazorpaySuccess) => void
  modal: { ondismiss: () => void }
}
interface RazorpayInstance {
  open: () => void
  on: (event: 'payment.failed', cb: (res: { error?: { description?: string } }) => void) => void
}
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) return resolve(true)
    const existing = document.getElementById('razorpay-checkout-js')
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }
    const script = document.createElement('script')
    script.id = 'razorpay-checkout-js'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

type Phase = 'form' | 'paying' | 'success'

export default function ShopCheckout({ product }: { product: Product }) {
  const { t, language } = useLanguage()
  const { name: productName, description } = localizeProduct(product, language)

  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [paidInfo, setPaidInfo] = useState<{ orderId: string; amount: number } | null>(null)

  const total = useMemo(() => Math.round(Number(product.price) * quantity * 100) / 100, [product.price, quantity])
  const money = (n: number) => `₹${n.toLocaleString('en-IN')}`

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (phase === 'paying') return
    setError('')

    const form = new FormData(event.currentTarget)
    const customer = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      address: String(form.get('address') ?? '').trim(),
    }

    setPhase('paying')
    try {
      const sdkReady = await loadRazorpay()
      if (!sdkReady || !window.Razorpay) throw new Error(t.common.paymentFailed)

      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity, ...customer }),
      })
      const order = await res.json()
      if (!order.success) throw new Error(order.error || t.common.paymentFailed)

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name: 'SaiBabaAstro',
        description: product.name,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        theme: { color: '#d97706' },
        handler: async (response) => {
          try {
            const verify = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })
            const result = await verify.json()
            if (!result.success) throw new Error(result.error)
            setPaidInfo({ orderId: order.dbOrderId, amount: total })
            setPhase('success')
          } catch (e) {
            setError(e instanceof Error && e.message ? e.message : t.common.paymentFailed)
            setPhase('form')
          }
        },
        modal: {
          ondismiss: () => {
            setPhase((p) => (p === 'paying' ? 'form' : p))
          },
        },
      })
      rzp.on('payment.failed', (r) => {
        setError(r.error?.description || t.common.paymentFailed)
        setPhase('form')
      })
      rzp.open()
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : t.common.paymentFailed)
      setPhase('form')
    }
  }

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
      {/* ── Product summary ─────────────────────────────────────────────── */}
      <article className="card-cosmic overflow-hidden lg:sticky lg:top-28">
        {product.image_url && (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={product.image_url}
              alt={productName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-card/70 via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-gold-bright">{t.common.shopProducts}</span>
          <h1 className="heading-serif text-3xl sm:text-4xl font-bold">{productName}</h1>
          <p className="text-silver leading-relaxed">{description}</p>
          <p className="font-serif text-3xl font-bold text-gradient-gold">{money(Number(product.price))}</p>
        </div>
      </article>

      {/* ── Success ─────────────────────────────────────────────────────── */}
      {phase === 'success' && paidInfo ? (
        <div className="card-cosmic p-8 sm:p-10 flex flex-col items-center gap-5 text-center animate-in" role="status">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-gold/20 border border-emerald-400/40 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-300" aria-hidden="true" />
          </div>
          <h2 className="heading-serif text-2xl font-semibold">{t.common.paymentSuccessTitle}</h2>
          <p className="text-silver text-sm max-w-md leading-relaxed">{t.common.paymentSuccessText}</p>
          <dl className="w-full max-w-sm rounded-xl border border-cosmic-border divide-y divide-cosmic-border text-sm text-left">
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-muted">{t.common.orderId}</dt>
              <dd className="text-cream font-mono text-xs break-all">{paidInfo.orderId.slice(0, 8).toUpperCase()}</dd>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-muted">{t.common.product}</dt>
              <dd className="text-cream text-right">{productName} × {quantity}</dd>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-muted">{t.common.paid}</dt>
              <dd className="text-gold-bright font-semibold">{money(paidInfo.amount)}</dd>
            </div>
          </dl>
          <Link href="/shop" className="btn-primary text-sm px-8">{t.common.continueShopping}</Link>
        </div>
      ) : (
        /* ── Checkout form ──────────────────────────────────────────────── */
        <form onSubmit={handleSubmit} className="card-cosmic p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-cosmic-border">
            <ShoppingBag className="w-5 h-5 text-gold-bright" aria-hidden="true" />
            <h2 className="heading-serif text-xl font-semibold">{t.common.shopBooking}</h2>
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="co-name" className="label-cosmic">{t.common.customerName}</label>
              <input id="co-name" name="name" required minLength={2} className="input-cosmic" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="co-phone" className="label-cosmic">{t.common.phone}</label>
              <input id="co-phone" name="phone" required type="tel" className="input-cosmic" autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="co-email" className="label-cosmic">{t.common.email}</label>
              <input id="co-email" name="email" required type="email" className="input-cosmic" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="co-qty" className="label-cosmic">{t.common.quantity}</label>
              <input
                id="co-qty" name="quantity" required type="number" min={1} max={50}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(50, Math.max(1, Math.floor(Number(e.target.value)) || 1)))}
                className="input-cosmic"
              />
            </div>
          </div>

          <div>
            <label htmlFor="co-address" className="label-cosmic">{t.common.address}</label>
            <textarea id="co-address" name="address" required minLength={10} rows={4} className="input-cosmic resize-none" autoComplete="street-address" />
          </div>

          <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 flex items-start gap-3 text-xs text-silver">
            <ShieldCheck className="w-4 h-4 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">{t.common.securePayment} {t.common.noCod}</p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-cosmic-border">
            <div>
              <p className="text-muted text-xs">{t.common.total}</p>
              <p className="font-serif text-2xl font-bold text-gradient-gold">{money(total)}</p>
            </div>
            <button type="submit" disabled={phase === 'paying'} className="btn-primary text-sm px-7 disabled:opacity-60">
              {phase === 'paying'
                ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />{t.common.processing}</>
                : <><Lock className="w-4 h-4" aria-hidden="true" />{t.common.payNow} {money(total)}</>}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
