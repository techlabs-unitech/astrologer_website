'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { format } from 'date-fns'
import { Search, Mail, Phone, MapPin } from 'lucide-react'
import type { Order, OrderStatus, PaymentStatus } from '@/types/database'
import { updateOrderStatus } from '@/app/admin/actions/orders'
import { useLanguage } from '@/components/LanguageProvider'

interface Props { initialOrders: Order[] }

const PAYMENT_CLASSES: Record<PaymentStatus, string> = {
  pending: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  paid:    'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  failed:  'bg-red-900/40 text-red-300 border-red-700/40',
}

const ORDER_STATUSES: OrderStatus[] = ['new', 'processing', 'shipped', 'delivered', 'cancelled']

export default function OrdersClient({ initialOrders }: Props) {
  const { t } = useLanguage()
  const [orders, setOrders] = useState(initialOrders)
  useEffect(() => { setOrders(initialOrders) }, [initialOrders])

  const [search, setSearch] = useState('')
  const [payFilter, setPayFilter] = useState<PaymentStatus | 'all'>('all')
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  const payLabels: Record<PaymentStatus, string> = {
    pending: t.common.pendingPayment, paid: t.common.paid, failed: t.common.failed,
  }
  const statusLabels: Record<OrderStatus, string> = {
    new: t.common.newOrder, processing: t.common.processingStatus, shipped: t.common.shipped,
    delivered: t.common.delivered, cancelled: t.common.cancelled,
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return orders.filter((o) => {
      const matchSearch = !q ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q) ||
        o.customer_phone.includes(q) ||
        o.product_name.toLowerCase().includes(q)
      return matchSearch && (payFilter === 'all' || o.payment_status === payFilter)
    })
  }, [orders, search, payFilter])

  function handleStatus(id: string, status: OrderStatus) {
    setError('')
    startTransition(async () => {
      const r = await updateOrderStatus(id, status)
      if (r.success) setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, order_status: status } : o)))
      else setError(r.error ?? 'Update failed.')
    })
  }

  const filters: Array<{ value: PaymentStatus | 'all'; label: string }> = [
    { value: 'all', label: t.common.all },
    { value: 'paid', label: t.common.paid },
    { value: 'pending', label: t.common.pendingPayment },
    { value: 'failed', label: t.common.failed },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`${t.common.search}…`} className="input-cosmic pl-9" aria-label={t.common.search}
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.common.paymentStatus}>
          {filters.map((f) => (
            <button
              key={f.value} type="button" onClick={() => setPayFilter(f.value)} aria-pressed={payFilter === f.value}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                payFilter === f.value ? 'bg-gold text-cosmic-black border-gold' : 'text-silver border-cosmic-border hover:border-violet/40 hover:text-cream'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <p className="text-xs text-muted">{filtered.length} {t.common.orders}</p>

      {filtered.length === 0 && (
        <div className="card-cosmic px-5 py-16 text-center text-muted text-sm">{t.common.noOrders}</div>
      )}

      <div className="grid gap-4">
        {filtered.map((o) => (
          <article key={o.id} className="card-cosmic p-5 flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-cream font-semibold">{o.product_name} <span className="text-muted font-normal">× {o.quantity}</span></p>
                <p className="text-xs text-muted mt-0.5">
                  #{o.id.slice(0, 8).toUpperCase()} · {format(new Date(o.created_at), 'd MMM yyyy, h:mm a')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl font-bold text-gold-bright">₹{Number(o.amount).toLocaleString('en-IN')}</span>
                <span className={`badge border text-[10px] ${PAYMENT_CLASSES[o.payment_status]}`}>{payLabels[o.payment_status]}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-silver">
              <p className="font-medium text-cream sm:col-span-2">{o.customer_name}</p>
              <a href={`tel:${o.customer_phone}`} className="flex items-center gap-2 hover:text-gold-bright"><Phone className="w-3.5 h-3.5 text-violet-bright shrink-0" />{o.customer_phone}</a>
              <a href={`mailto:${o.customer_email}`} className="flex items-center gap-2 hover:text-gold-bright break-all"><Mail className="w-3.5 h-3.5 text-violet-bright shrink-0" />{o.customer_email}</a>
              <p className="flex items-start gap-2 sm:col-span-2 whitespace-pre-line"><MapPin className="w-3.5 h-3.5 text-violet-bright shrink-0 mt-0.5" />{o.address}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cosmic-border">
              <label className="flex items-center gap-2 text-xs text-muted">
                {t.common.orderStatus}
                <select
                  value={o.order_status}
                  onChange={(e) => handleStatus(o.id, e.target.value as OrderStatus)}
                  className="input-cosmic !py-1.5 !text-xs w-auto"
                >
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
                </select>
              </label>
              {o.razorpay_payment_id && (
                <span className="text-[11px] text-muted font-mono">{o.razorpay_payment_id}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
