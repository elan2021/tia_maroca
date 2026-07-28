"use client"

import { useState } from "react"
import Link from "next/link"
import { createCategoryAction, updateCategoryAction } from "@/app/admin/(dashboard)/categorias/actions"

export default function CategoryForm({ category }: { category?: any }) {
  const isEditing = !!category
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const formData = new FormData(e.currentTarget)
      if (isEditing) {
        await updateCategoryAction(category.id, formData)
      } else {
        await createCategoryAction(formData)
      }
    } catch (err: any) {
      if (err?.message?.includes("NEXT_REDIRECT")) return
      setError(err?.message || "Erro ao salvar categoria.")
      setSaving(false)
    }
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant max-w-2xl">
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-2xl text-red-800">
          <p className="font-bold text-sm">❌ Erro ao salvar:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-on-surface">Nome da Categoria</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={category?.name} 
            required 
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" 
            placeholder="Ex: Alfabetização" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-on-surface">
            Nome do Ícone (Material Symbols)
          </label>
          <p className="text-xs text-on-surface-variant mb-2">
            Procure o nome do ícone desejado no site do <a href="https://fonts.google.com/icons?icon.set=Material+Symbols" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Fonts</a> e digite aqui. Ex: brush, calculate, star.
          </p>
          <div className="flex gap-4 items-center">
            <input 
              type="text" 
              name="icon" 
              defaultValue={category?.icon} 
              required 
              className="flex-1 px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" 
              placeholder="Ex: brush" 
            />
            {category?.icon && (
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                {category.icon}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-on-surface">Cor da Categoria</label>
          <select 
            name="color" 
            defaultValue={category?.color || "primary"} 
            required 
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary"
          >
            <option value="primary">Primária (Rosa/Vermelho Claro)</option>
            <option value="secondary">Secundária (Azul)</option>
            <option value="tertiary">Terciária (Amarelo)</option>
            <option value="neutral">Neutra (Cinza)</option>
            <option value="transparent">Transparente (Fundo branco/leve)</option>
          </select>
        </div>

        <div className="pt-8 border-t border-outline-variant flex justify-end gap-4">
          <Link href="/admin/categorias" className="px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors">
            Cancelar
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-3 bg-tertiary text-on-tertiary rounded-full font-bold hover:bg-tertiary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar Categoria'}
          </button>
        </div>
      </form>
    </div>
  )
}
