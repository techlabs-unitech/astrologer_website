import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/razorpay/webhook
 * Safety net: if the customer closes the tab right after paying, Razorpay
 * still tells us the payment succeeded, so the order is never lost.
 *
 * Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://YOUR-DOMAIN/api/razorpay/webhook
 *   Events: payment.captured, order.paid, payment.failed
 *   Secret: same value as RAZORPAY_WEBHOOK_SECRET
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 })

  const raw = await request.text()
  const signature = request.headers.get('x-razorpay-signature') ?? ''
  const expected = createHmac('sha256', secret).update(raw).digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  type Payload = {
    event: string
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } }
  }
  const event = JSON.parse(raw) as Payload
  const payment = event.payload?.payment?.entity
  if (!payment?.order_id) return NextResponse.json({ ok: true })

  try {
    const supabase = createServiceClient()

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          razorpay_payment_id: payment.id ?? null,
          paid_at: new Date().toISOString(),
        } as never)
        .eq('razorpay_order_id', payment.order_id)
        .neq('payment_status', 'paid')
    } else if (event.event === 'payment.failed') {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' } as never)
        .eq('razorpay_order_id', payment.order_id)
        .eq('payment_status', 'pending')
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[razorpay/webhook] unexpected:', err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
