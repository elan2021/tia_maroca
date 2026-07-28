"use client"

import { deleteCategoryAction } from "@/app/admin/(dashboard)/categorias/actions"

export default function DeleteCategoryButton({ id }: { id: string }) {
  return (
    <button 
      onClick={async () => {
        if (confirm("Tem certeza que deseja excluir esta categoria?")) {
          await deleteCategoryAction(id)
        }
      }}
      className="p-2 text-error hover:bg-error-container rounded-full transition-colors"
      title="Excluir"
    >
      <span className="material-symbols-outlined text-[20px]">delete</span>
    </button>
  )
}
