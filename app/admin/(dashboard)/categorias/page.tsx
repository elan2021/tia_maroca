import { db } from "@/lib/db"
import Link from "next/link"
import Icon from "@/components/Icon"
import { deleteCategoryAction } from "./actions"

export const dynamic = "force-dynamic"

export default async function CategoriasPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Categorias</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Gerencie as categorias exibidas na página inicial.
          </p>
        </div>
        <Link 
          href="/admin/categorias/novo" 
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Nova Categoria
        </Link>
      </div>

      <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container">
              <th className="px-6 py-4 font-bold text-sm text-on-surface-variant">Ícone</th>
              <th className="px-6 py-4 font-bold text-sm text-on-surface-variant">Nome</th>
              <th className="px-6 py-4 font-bold text-sm text-on-surface-variant">Cor</th>
              <th className="px-6 py-4 font-bold text-sm text-on-surface-variant text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">
                  Nenhuma categoria cadastrada.
                </td>
              </tr>
            ) : (
              categories.map(cat => (
                <tr key={cat.id} className="hover:bg-surface-container-highest/50 transition-colors">
                  <td className="px-6 py-4">
                    <Icon name={cat.icon} />
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface">{cat.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{cat.color}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/categorias/${cat.id}/editar`}
                        className="p-2 text-primary hover:bg-primary-container rounded-full transition-colors"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                      
                      <form action={async () => {
                        "use server"
                        await deleteCategoryAction(cat.id)
                      }}>
                        <button 
                          type="submit"
                          className="p-2 text-error hover:bg-error-container rounded-full transition-colors"
                          title="Excluir"
                          onClick={(e) => {
                            if (!confirm("Tem certeza que deseja excluir esta categoria?")) e.preventDefault()
                          }}
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
