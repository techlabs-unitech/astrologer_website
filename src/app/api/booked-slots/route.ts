import { NextResponse } from 'next/server'
import { getBookedSlots } from '@/lib/appointment'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') ?? ''

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ slots: [] }, { status: 400 })
  }

  // Reject past dates — use UTC midnight for both sides so timezone offsets
  // on the server never cause a future date to be misclassified as past.
  const dateMidnightUTC  = new Date(date + 'T00:00:00Z')
  const todayMidnightUTC = new Date(
    new Date().toISOString().slice(0, 10) + 'T00:00:00Z'
  )

  if (dateMidnightUTC < todayMidnightUTC) {
    return NextResponse.json({ slots: [] }, { status: 400 })
  }

  const slots = await getBookedSlots(date)
  return NextResponse.json({ slots })
}
