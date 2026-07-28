import CategoryForm from "@/components/admin/CategoryForm"
import Link from "next/link"

export default function NovaCategoriaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categorias" 
          className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Nova Categoria</h2>
        </div>
      </div>

      <CategoryForm />
    </div>
  )
}
