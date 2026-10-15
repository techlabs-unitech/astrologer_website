import type { Metadata } from 'next'
import { CalendarDays, Clock, CheckCircle, Package, MessageSquare, AlertCircle, IndianRupee, ShoppingBag } from 'lucide-react'
import { getAppointments } from '@/app/admin/actions/appointments'
import { getProducts } from '@/app/admin/actions/products'
import { getMessages } from '@/app/admin/actions/messages'
import { getOrders } from '@/app/admin/actions/orders'
import { format } from 'date-fns'
import LocalizedCopy from '@/components/LocalizedCopy'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Dashboard' }

// Status badge colours — full static strings
const APPT_STATUS_CLASSES: Record<string, string> = {
  pending:   'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  confirmed: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  completed: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  cancelled: 'bg-red-900/40 text-red-300 border-red-700/40',
}

export default async function DashboardPage() {
  const [apptResult, prodResult, msgResult, orderResult] = await Promise.all([
    getAppointments(),
    getProducts(),
    getMessages(),
    getOrders(),
  ])

  const appointments = apptResult.success ? apptResult.data : []
  const products     = prodResult.success ? prodResult.data : []
  const messages     = msgResult.success  ? msgResult.data  : []
  const orders       = orderResult.success ? orderResult.data : []
  const paidOrders   = orders.filter(o => o.payment_status === 'paid')
  const revenue      = paidOrders.reduce((sum, o) => sum + Number(o.amount), 0)

  const stats = [
    {
      label: 'Total Appointments',
      value: appointments.length,
      icon: CalendarDays,
      color: 'from-violet to-violet-bright',
    },
    {
      label: 'Pending',
      value: appointments.filter(a => a.status === 'pending').length,
      icon: Clock,
      color: 'from-yellow-700 to-yellow-500',
    },
    {
      label: 'Confirmed',
      value: appointments.filter(a => a.status === 'confirmed').length,
      icon: CheckCircle,
      color: 'from-emerald-700 to-emerald-500',
    },
    {
      label: 'Active Products',
      value: products.filter(p => p.active).length,
      icon: Package,
      color: 'from-gold-dim to-gold',
    },
    {
      label: 'Paid Orders',
      value: paidOrders.length,
      icon: ShoppingBag,
      color: 'from-emerald-700 to-teal-500',
    },
    {
      label: 'Revenue (₹)',
      value: revenue.toLocaleString('en-IN'),
      icon: IndianRupee,
      color: 'from-gold to-gold-bright',
    },
    {
      label: 'Unread Messages',
      value: messages.filter(m => m.status === 'unread').length,
      icon: MessageSquare,
      color: 'from-violet-bright to-violet-glow',
    },
  ]

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="heading-serif text-2xl sm:text-3xl font-bold mb-1"><LocalizedCopy id="adminDashboard" /></h1>
        <p className="text-muted text-sm"><LocalizedCopy id="adminDashboardSub" /></p>
      </div>

      {/* Errors */}
      {(!apptResult.success || !prodResult.success || !msgResult.success || !orderResult.success) && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Some data could not be loaded. Please refresh.
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card-cosmic p-5 flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-glow-sm shrink-0`}>
                <Icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-cream">{s.value}</p>
                <p className="text-muted text-xs leading-tight mt-0.5">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent appointments */}
      <div className="card-cosmic overflow-hidden">
        <div className="px-5 py-4 border-b border-cosmic-border">
          <h2 className="font-serif text-cream font-semibold"><LocalizedCopy id="adminRecentAppointments" /></h2>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="px-5 py-12 text-center text-muted text-sm"><LocalizedCopy id="adminNoAppointments" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Appointments">
              <thead>
                <tr className="border-b border-cosmic-border">
                  {['Name', 'Service', 'Date', 'Time', 'Status'].map(h => (
                    <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map(appt => (
                  <tr key={appt.id} className="border-b border-cosmic-border/50 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-cream font-medium">{appt.name}</td>
                    <td className="px-4 py-3 text-silver max-w-[180px] truncate">{appt.service}</td>
                    <td className="px-4 py-3 text-silver whitespace-nowrap">
                      {format(new Date(appt.appointment_date + 'T00:00:00'), 'd MMM yyyy')}
                    </td>
                    <td className="px-4 py-3 text-silver whitespace-nowrap">
                      {appt.appointment_time.slice(0, 5)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge border text-[10px] ${APPT_STATUS_CLASSES[appt.status] ?? ''}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Recent orders */}
      <div className="card-cosmic overflow-hidden">
        <div className="px-5 py-4 border-b border-cosmic-border">
          <h2 className="font-serif text-cream font-semibold"><LocalizedCopy id="adminRecentOrders" /></h2>
        </div>
        {orders.length === 0 ? (
          <div className="px-5 py-12 text-center text-muted text-sm"><LocalizedCopy id="adminNoOrders" /></div>
        ) : (
          <ul className="divide-y divide-cosmic-border/50">
            {orders.slice(0, 6).map(o => (
              <li key={o.id} className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="text-cream font-medium truncate">{o.product_name} × {o.quantity}</p>
                  <p className="text-muted text-xs">{o.customer_name} · {format(new Date(o.created_at), 'd MMM, h:mm a')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gold-bright font-semibold">₹{Number(o.amount).toLocaleString('en-IN')}</span>
                  <span className={`badge border text-[10px] ${o.payment_status === 'paid' ? APPT_STATUS_CLASSES.confirmed : o.payment_status === 'failed' ? APPT_STATUS_CLASSES.cancelled : APPT_STATUS_CLASSES.pending}`}>
                    {o.payment_status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
