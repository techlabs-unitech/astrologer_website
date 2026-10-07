'use client'

import { useState, useTransition, useMemo } from 'react'
import { format } from 'date-fns'
import { Search, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { ContactMessage, ContactMessageStatus } from '@/types/database'
import { updateMessageStatus, deleteMessage } from '@/app/admin/actions/messages'
import { useLanguage } from '@/components/LanguageProvider'

interface Props { initialMessages: ContactMessage[] }

const STATUS_OPTIONS: { value: ContactMessageStatus | 'all'; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'unread',   label: 'Unread' },
  { value: 'read',     label: 'Read' },
  { value: 'resolved', label: 'Resolved' },
]

const STATUS_CLASSES: Record<ContactMessageStatus, string> = {
  unread:   'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  read:     'bg-blue-900/40 text-blue-300 border-blue-700/40',
  resolved: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
}

export default function MessagesClient({ initialMessages }: Props) {
  const { t } = useLanguage()
  void STATUS_OPTIONS
  const statusOptions = [
    { value: 'all' as const, label: t.common.all },
    { value: 'unread' as const, label: t.common.unread },
    { value: 'read' as const, label: t.common.read },
    { value: 'resolved' as const, label: t.common.resolved },
  ]
  const [messages, setMessages]          = useState(initialMessages)
  const [search, setSearch]              = useState('')
  const [statusFilter, setStatusFilter]  = useState<ContactMessageStatus | 'all'>('all')
  const [expanded, setExpanded]          = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm]= useState<string | null>(null)
  const [feedback, setFeedback]          = useState<{ id: string; msg: string; type: 'ok' | 'err' } | null>(null)
  const [isPending, startTransition]     = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return messages.filter(m => {
      const matchSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || m.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [messages, search, statusFilter])

  function flash(id: string, type: 'ok' | 'err', msg: string) {
    setFeedback({ id, type, msg })
    setTimeout(() => setFeedback(null), 3000)
  }

  function handleStatusChange(id: string, status: ContactMessageStatus) {
    startTransition(async () => {
      const result = await updateMessageStatus(id, status)
      if (result.success) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m))
        flash(id, 'ok', `${t.common.status} updated.`)
      } else {
        flash(id, 'err', result.error ?? `${t.common.status} update failed.`)
      }
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteMessage(id)
      if (result.success) {
        setMessages(prev => prev.filter(m => m.id !== id))
        setDeleteConfirm(null)
        flash(id, 'ok', `${t.common.message} deleted.`)
      } else {
        flash(id, 'err', result.error ?? `${t.common.message} delete failed.`)
      }
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
            placeholder={`${t.common.search} ${t.common.name.toLowerCase()}, ${t.common.email.toLowerCase()}, ${t.common.message.toLowerCase()}…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-cosmic pl-9"
            aria-label={t.common.search}
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.common.status}>
          {statusOptions.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => setStatusFilter(opt.value)}
              aria-pressed={statusFilter === opt.value}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                focus-visible:outline-2 focus-visible:outline-gold-bright
                ${statusFilter === opt.value
                  ? 'bg-gold text-cosmic-black border-gold'
                  : 'text-silver border-cosmic-border hover:border-violet/40 hover:text-cream'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted">{filtered.length} {t.common.messages}</p>

      {filtered.length === 0 && (
        <div className="card-cosmic px-5 py-16 text-center text-muted text-sm">
          {t.common.noMessages}
        </div>
      )}

      {/* Message list */}
      <div className="flex flex-col gap-4">
        {filtered.map(msg => {
          const isExpanded = expanded === msg.id
          return (
            <div key={msg.id} className="card-cosmic overflow-hidden">
              {/* Header row */}
              <div className="px-5 py-4 flex items-start gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet/30 to-gold/20 border border-violet/20 flex items-center justify-center text-xs font-bold text-cream shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-cream font-semibold text-sm">{msg.name}</span>
                    <span className={`badge border text-[10px] ${STATUS_CLASSES[msg.status]}`}>{msg.status}</span>
                  </div>
                  <p className="text-muted text-xs">{msg.email}{msg.phone ? ` · ${msg.phone}` : ''}</p>
                  <p className="text-silver text-xs mt-1">{format(new Date(msg.created_at), 'd MMM yyyy, h:mm a')}</p>
                </div>

                <button type="button"
                  onClick={() => setExpanded(isExpanded ? null : msg.id)}
                  aria-label={isExpanded ? t.common.close : t.common.messages}
                  aria-expanded={isExpanded}
                  className="text-muted hover:text-cream transition-colors shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Body — expandable */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-cosmic-border">
                  <p className="text-silver text-sm leading-relaxed mt-4 whitespace-pre-wrap">{msg.message}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-cosmic-border">
                    <label className="text-xs text-muted shrink-0">{t.common.status}:</label>
                    <select
                      value={msg.status}
                      onChange={e => handleStatusChange(msg.id, e.target.value as ContactMessageStatus)}
                      disabled={isPending}
                      className="input-cosmic py-1.5 text-xs w-36"
                      aria-label={`Change status for message from ${msg.name}`}
                    >
                      {(['unread', 'read', 'resolved'] as ContactMessageStatus[]).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {feedback?.id === msg.id && !isPending && (
                      <span className={`text-xs ${feedback.type === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {feedback.msg}
                      </span>
                    )}

                    <button type="button"
                      onClick={() => setDeleteConfirm(msg.id)}
                      aria-label={`Delete message from ${msg.name}`}
                      className="ml-auto flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />{t.common.delete}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={t.common.deleteMessage}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative z-10 w-full max-w-sm card-cosmic p-6 flex flex-col gap-4">
            <h2 className="font-serif text-cream font-semibold">{t.common.deleteMessage}?</h2>
            <p className="text-silver text-sm">{t.home.finalDescription}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 text-sm">{t.common.cancel}</button>
              <button type="button" onClick={() => handleDelete(deleteConfirm)}
                disabled={isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-60">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global feedback for delete */}
      {feedback && feedback.type === 'ok' && feedback.msg.includes('deleted') && (
        <div role="status" className="fixed bottom-4 right-4 z-50 rounded-xl border border-emerald-700/40 bg-emerald-900/80 backdrop-blur px-4 py-3 text-sm text-emerald-300">
          {feedback.msg}
        </div>
      )}
    </div>
  )
}
