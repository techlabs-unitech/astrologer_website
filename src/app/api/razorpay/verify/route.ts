import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/razorpay/verify
 * Called by the browser after Razorpay Checkout succeeds. The signature is
 * checked with our secret key, so a payment cannot be faked from the browser.
 */
export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) {
    return NextResponse.json({ success: false, error: 'Payment verification unavailable.' }, { status: 503 })
  }

  let body: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ success: false, error: 'Missing payment details.' }, { status: 400 })
  }

  const expected = createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(razorpay_signature)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ success: false, error: 'Payment verification failed.' }, { status: 400 })
  }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        razorpay_payment_id,
        paid_at: new Date().toISOString(),
      } as never)
      .eq('razorpay_order_id', razorpay_order_id)

    if (error) {
      console.error('[razorpay/verify] update failed:', error.message)
      return NextResponse.json({ success: false, error: 'Payment received but order update failed. Please contact us.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[razorpay/verify] unexpected:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 })
  }
}
