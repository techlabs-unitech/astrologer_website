'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Keeps admin pages live: re-fetches server data every `seconds` and whenever
 * the tab becomes visible again, so new appointments / orders / messages show
 * up without a manual reload.
 */
export default function AutoRefresh({ seconds = 20 }: { seconds?: number }) {
  const router = useRouter()

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === 'visible') router.refresh()
    }
    const interval = window.setInterval(tick, seconds * 1000)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [router, seconds])

  return null
}
