'use client'

import { useState, useTransition, useMemo } from 'react'
import { format } from 'date-fns'
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import type { Appointment, AppointmentStatus } from '@/types/database'
import { updateAppointmentStatus } from '@/app/admin/actions/appointments'
import { useLanguage } from '@/components/LanguageProvider'

interface Props { initialAppointments: Appointment[] }

const STATUS_OPTIONS: { value: AppointmentStatus | 'all'; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'pending',   label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_CLASSES: Record<AppointmentStatus, string> = {
  pending:   'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  confirmed: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  completed: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  cancelled: 'bg-red-900/40 text-red-300 border-red-700/40',
}

export default function AppointmentsClient({ initialAppointments }: Props) {
  const { t } = useLanguage()
  void STATUS_OPTIONS
  const statusOptions = [
    { value: 'all' as const, label: t.common.all },
    { value: 'pending' as const, label: t.common.pending },
    { value: 'confirmed' as const, label: t.common.confirmed },
    { value: 'completed' as const, label: t.common.completed },
    { value: 'cancelled' as const, label: t.common.cancelled },
  ]
  const [appointments, setAppointments] = useState(initialAppointments)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all')
  const [feedback, setFeedback]         = useState<{ id: string; type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition]    = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return appointments.filter(a => {
      const matchSearch = !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || a.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [appointments, search, statusFilter])

  function handleStatusChange(id: string, status: AppointmentStatus) {
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status)
      if (result.success) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
        setFeedback({ id, type: 'ok', msg: `${t.common.status} updated.` })
      } else {
        setFeedback({ id, type: 'err', msg: result.error ?? `${t.common.status} update failed.` })
      }
      setTimeout(() => setFeedback(null), 3000)
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="search"
            placeholder={`${t.common.search} ${t.common.name.toLowerCase()}, ${t.common.email.toLowerCase()}, ${t.common.service.toLowerCase()}…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-cosmic pl-9"
            aria-label={t.common.search}
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.common.status}>
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatusFilter(opt.value)}
              aria-pressed={statusFilter === opt.value}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-gold-bright
                ${statusFilter === opt.value
                  ? 'bg-gold text-cosmic-black border-gold'
                  : 'text-silver border-cosmic-border hover:border-violet/40 hover:text-cream'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted">{filtered.length} {t.common.appointments}</p>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="card-cosmic px-5 py-16 text-center text-muted text-sm">
          {t.common.noAppointments}
        </div>
      )}

      {/* Desktop table */}
      {filtered.length > 0 && (
        <div className="hidden md:block card-cosmic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label={t.common.appointments}>
              <thead>
                <tr className="border-b border-cosmic-border">
                  {[t.common.name, t.common.contact, t.common.service, `${t.common.date} & ${t.common.time}`, t.common.status, t.common.updateStatus].map(h => (
                    <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(appt => (
                  <tr key={appt.id} className="border-b border-cosmic-border/50 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-cream font-medium">{appt.name}</td>
                    <td className="px-4 py-3">
                      <p className="text-silver text-xs">{appt.email}</p>
                      <p className="text-muted text-xs">{appt.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-silver max-w-[160px] truncate">{appt.service}</td>
                    <td className="px-4 py-3 text-silver whitespace-nowrap">
                      <p>{format(new Date(appt.appointment_date + 'T00:00:00'), 'd MMM yyyy')}</p>
                      <p className="text-muted text-xs">{appt.appointment_time.slice(0, 5)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge border text-[10px] ${STATUS_CLASSES[appt.status]}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={appt.status}
                          onChange={e => handleStatusChange(appt.id, e.target.value as AppointmentStatus)}
                          disabled={isPending}
                          aria-label={`Change status for ${appt.name}`}
                          className="input-cosmic py-1.5 text-xs w-32"
                        >
                          {(['pending', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {isPending && feedback?.id === appt.id && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted" />}
                        {!isPending && feedback?.id === appt.id && (
                          feedback.type === 'ok'
                            ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            : <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile cards */}
      {filtered.length > 0 && (
        <div className="md:hidden flex flex-col gap-4">
          {filtered.map(appt => (
            <div key={appt.id} className="card-cosmic p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-cream font-semibold text-sm">{appt.name}</p>
                  <p className="text-muted text-xs">{appt.email}</p>
                </div>
                <span className={`badge border text-[10px] shrink-0 ${STATUS_CLASSES[appt.status]}`}>
                  {appt.status}
                </span>
              </div>
              <p className="text-silver text-xs">{appt.service}</p>
              <p className="text-silver text-xs">
                {format(new Date(appt.appointment_date + 'T00:00:00'), 'd MMM yyyy')} at {appt.appointment_time.slice(0, 5)}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-cosmic-border">
                <label className="text-xs text-muted shrink-0">{t.common.status}:</label>
                <select
                  value={appt.status}
                  onChange={e => handleStatusChange(appt.id, e.target.value as AppointmentStatus)}
                  disabled={isPending}
                  className="input-cosmic py-1.5 text-xs flex-1"
                >
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {feedback?.id === appt.id && !isPending && (
                <p className={`text-xs ${feedback.type === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {feedback.msg}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
