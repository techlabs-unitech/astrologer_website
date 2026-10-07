import type { Metadata } from 'next'
import { getMessages } from '@/app/admin/actions/messages'
import MessagesClient from '@/components/admin/MessagesClient'
import { AlertCircle } from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

export const metadata: Metadata = { title: 'Messages' }

export default async function MessagesPage() {
  const result = await getMessages()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="heading-serif text-2xl sm:text-3xl font-bold mb-1"><LocalizedCopy id="adminMessages" /></h1>
        <p className="text-muted text-sm"><LocalizedCopy id="adminMessages" /></p>
      </div>

      {result.success ? (
        <MessagesClient initialMessages={result.data} />
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {result.error}
        </div>
      )}
    </div>
  )
}
