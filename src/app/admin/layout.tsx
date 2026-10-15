import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AutoRefresh from '@/components/admin/AutoRefresh'

// Admin data must ALWAYS be fresh — never statically cached.
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | SaiBabaAstro Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-cosmic-deep">
      <AdminSidebar />
      <AutoRefresh seconds={20} />
      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-60">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
