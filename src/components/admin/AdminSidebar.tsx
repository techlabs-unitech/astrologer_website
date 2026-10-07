'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  MessageSquare,
  LogOut,
  Star,
  Menu,
  X,
} from 'lucide-react'
import { signOut } from '@/app/admin/actions/auth'
import { useLanguage } from '@/components/LanguageProvider'

const NAV_ITEMS = [
  { href: '/admin/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/admin/products',     label: 'Products',     icon: Package },
  { href: '/admin/messages',     label: 'Messages',     icon: MessageSquare },
]

function NavLink({ href, label, icon: Icon, active, onClick }: {
  href: string; label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean; onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        focus-visible:outline-2 focus-visible:outline-gold-bright
        ${active
          ? 'bg-violet/20 text-gold-bright border border-violet/30'
          : 'text-silver hover:text-cream hover:bg-white/5'
        }`}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-gold-bright' : 'text-muted'}`} />
      {label}
    </Link>
  )
}

export default function AdminSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = NAV_ITEMS.map((item, index) => ({ ...item, label: [t.common.dashboard, t.common.appointments, t.common.products, t.common.messages][index] }))

  return (
    <>
      {/* ── Mobile top bar ──────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-14 bg-cosmic-deep/95 backdrop-blur border-b border-cosmic-border flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-cosmic-black fill-current" />
          </span>
          <span className="font-serif font-bold text-sm text-cream">SaiBabaAstro <span className="text-gold-bright">{t.common.admin}</span></span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="w-8 h-8 rounded-lg border border-cosmic-border flex items-center justify-center text-silver hover:text-cream transition-colors"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer / Desktop sidebar ──────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-60 flex flex-col
          bg-cosmic-deep border-r border-cosmic-border
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
          aria-label={t.common.admin}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-cosmic-border shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-sm">
              <Star className="w-4 h-4 text-cosmic-black fill-current" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm font-bold text-cream">SaiBabaAstro</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-bright">{t.common.admin}</span>
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1" aria-label={t.common.admin}>
          {navItems.map(item => (
            <NavLink
              key={item.href}
              {...item}
              active={pathname.startsWith(item.href)}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        {/* Bottom: view site + logout */}
        <div className="px-3 py-4 border-t border-cosmic-border flex flex-col gap-1 shrink-0">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-muted hover:text-cream hover:bg-white/5 transition-colors"
          >
            <Star className="w-4 h-4 shrink-0" />
            {t.nav.home}
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold-bright"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {t.common.back}
            </button>
          </form>
        </div>
      </aside>

      {/* Spacer so mobile top bar doesn't cover content */}
      <div className="md:hidden h-14" aria-hidden="true" />
    </>
  )
}
