import type { Metadata } from 'next'
import { getAppointments } from '@/app/admin/actions/appointments'
import AppointmentsClient from '@/components/admin/AppointmentsClient'
import { AlertCircle } from 'lucide-react'
import LocalizedCopy from '@/components/LocalizedCopy'

export const metadata: Metadata = { title: 'Appointments' }

export default async function AppointmentsPage() {
  const result = await getAppointments()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="heading-serif text-2xl sm:text-3xl font-bold mb-1"><LocalizedCopy id="adminAppointments" /></h1>
        <p className="text-muted text-sm"><LocalizedCopy id="adminAppointments" /></p>
      </div>

      {result.success ? (
        <AppointmentsClient initialAppointments={result.data} />
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {result.error}
        </div>
      )}
    </div>
  )
}
