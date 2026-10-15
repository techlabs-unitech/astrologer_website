import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { checkoutSchema } from '@/lib/validations'
import type { Product } from '@/types/database'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/razorpay/create-order
 *
 * 1. Validates the checkout form.
 * 2. Loads the product from the DB and calculates the amount SERVER-SIDE
 *    (the browser can never choose its own price).
 * 3. Saves an order row (payment_status = 'pending') so the admin sees it.
 * 4. Creates the Razorpay order and returns what Checkout.js needs.
 */
export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    console.error('[razorpay/create-order] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing')
    return NextResponse.json(
      { success: false, error: 'Online payment is temporarily unavailable. Please contact us.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      { success: false, error: issue?.message ?? 'Please check your details.', field: issue?.path?.[0]?.toString() },
      { status: 400 }
    )
  }
  const input = parsed.data

  try {
    const supabase = createServiceClient()

    const { data: productRow, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', input.product_id)
      .eq('active', true)
      .not('category', 'in', '(consultation,report,relationship,career)')
      .maybeSingle()

    const product = productRow as Product | null
    if (productError || !product) {
      return NextResponse.json({ success: false, error: 'This product is no longer available.' }, { status: 404 })
    }

    const unitPrice = Number(product.price)
    const amount = Math.round(unitPrice * input.quantity * 100) / 100
    const amountPaise = Math.round(amount * 100)

    // 1) Save the order first
    const { data: inserted, error: insertError } = await supabase
      .from('orders')
      .insert({
        product_id: product.id,
        product_name: product.name,
        unit_price: unitPrice,
        quantity: input.quantity,
        amount,
        customer_name: input.name,
        customer_email: input.email,
        customer_phone: input.phone,
        address: input.address,
      } as never)
      .select('id')
      .single()

    const dbOrderId = (inserted as { id: string } | null)?.id
    if (insertError || !dbOrderId) {
      console.error('[razorpay/create-order] insert failed:', insertError?.message)
      return NextResponse.json({ success: false, error: 'Could not start your order. Please try again.' }, { status: 500 })
    }

    // 2) Create the Razorpay order
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: dbOrderId.slice(0, 36),
        notes: { order_id: dbOrderId, product: product.name.slice(0, 100) },
      }),
      cache: 'no-store',
    })

    if (!rzpRes.ok) {
      const detail = await rzpRes.text()
      console.error('[razorpay/create-order] Razorpay error:', rzpRes.status, detail)
      await supabase.from('orders').update({ payment_status: 'failed' } as never).eq('id', dbOrderId)
      return NextResponse.json({ success: false, error: 'Could not start the payment. Please try again.' }, { status: 502 })
    }

    const rzpOrder = (await rzpRes.json()) as { id: string }
    await supabase.from('orders').update({ razorpay_order_id: rzpOrder.id } as never).eq('id', dbOrderId)

    return NextResponse.json({
      success: true,
      keyId,
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      currency: 'INR',
      dbOrderId,
    })
  } catch (err) {
    console.error('[razorpay/create-order] unexpected:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
