import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import CategoryForm from "@/components/admin/CategoryForm"
import Link from "next/link"

export default async function EditarCategoriaPage({ params }: { params: { id: string } }) {
  const category = await db.category.findUnique({
    where: { id: params.id }
  })

  if (!category) {
    notFound()
  }

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
          <h2 className="text-2xl font-bold text-on-surface">Editar Categoria</h2>
        </div>
      </div>

      <CategoryForm category={category} />
    </div>
  )
}
