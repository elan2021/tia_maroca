import { signOut } from "@/auth"
import Link from "next/link"
import "@/app/globals.css"

export const dynamic = "force-dynamic"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold font-title text-on-surface">Painel Admin</h2>
          <p className="text-sm text-on-surface-variant">Tia Maroka</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-colors font-medium">Dashboard</Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-colors font-medium">Produtos</Link>
          <Link href="/admin/packs" className="block px-4 py-3 rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-colors font-medium">Packs (Membros)</Link>
          <Link href="/admin/settings" className="block px-4 py-3 rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-colors font-medium">Configurações</Link>
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button type="submit" className="w-full px-4 py-3 text-left rounded-full hover:bg-error-container hover:text-on-error-container transition-colors font-medium flex items-center gap-2">
              <span className="material-symbols-outlined">logout</span>
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-background overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
