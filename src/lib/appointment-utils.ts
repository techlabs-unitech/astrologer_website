/**
 * Client-safe appointment utilities — no server-only imports here.
 * These can be imported freely from both client and server components.
 */

// ─── Time slot definitions ────────────────────────────────────────────────────

export const TIME_SLOTS = [
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const

export type TimeSlot = (typeof TIME_SLOTS)[number]

/** Convert a 24-hour "HH:MM" string to a 12-hour display label */
export function formatTimeSlot(time: string): string {
  const [hStr, mStr] = time.split(':')
  const h = parseInt(hStr, 10)
  const m = mStr ?? '00'
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${m} ${period}`
}

/**
 * Returns true if `time` (HH:MM) is in the past for today's date.
 * Always returns false for future dates.
 */
export function isPastTimeSlot(date: string, time: string): boolean {
  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)
  if (date !== todayStr) return false
  const [h, m] = time.split(':').map(Number)
  return (h * 60 + m) <= (now.getHours() * 60 + now.getMinutes())
}
