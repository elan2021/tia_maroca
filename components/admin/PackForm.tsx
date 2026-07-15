"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { upload } from "@vercel/blob/client"
import { createPackAction, updatePackAction } from "@/app/admin/(dashboard)/packs/actions"

type ModuleData = {
  id: string;
  title: string;
  description: string;
  image: string;
}

async function uploadFileToBlobClient(file: File | null): Promise<string> {
  if (!file || file.size === 0) return ""
  
  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
  })
  return blob.url
}

export default function PackForm({ pack }: { pack?: any }) {
  const isEditing = !!pack
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  
  let initialModules: ModuleData[] = []
  if (pack?.modulesJson) {
    try {
      const parsed = JSON.parse(pack.modulesJson)
      if (Array.isArray(parsed)) {
        initialModules = parsed.map(m => ({
          id: Math.random().toString(36).substring(7),
          title: m.title || "",
          description: m.description || "",
          image: m.image || ""
        }))
      }
    } catch (e) {}
  }

  const [modules, setModules] = useState<ModuleData[]>(initialModules)

  const addModule = () => {
    setModules([...modules, { id: Math.random().toString(36).substring(7), title: "", description: "", image: "" }])
  }

  const removeModule = (idToRemove: string) => {
    setModules(modules.filter(m => m.id !== idToRemove))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      // ========== UPLOAD FILES DIRECTLY FROM BROWSER ==========
      
      // 1. Upload cover image
      const imageFile = formData.get("imageFile") as File
      setStatus("Enviando imagem de capa...")
      const imageUrl = await uploadFileToBlobClient(imageFile)
      
      // 2. Upload PDF
      const pdfFile = formData.get("pdfFile") as File
      setStatus("Enviando PDF...")
      const pdfUrl = await uploadFileToBlobClient(pdfFile)

      // 3. Upload module images
      const modulesCount = parseInt(formData.get("modulesCount") as string) || 0
      const moduleImageUrls: string[] = []
      
      for (let i = 0; i < modulesCount; i++) {
        const modImageFile = formData.get(`moduleImage_${i}`) as File
        if (modImageFile && modImageFile.size > 0) {
          setStatus(`Enviando imagem do módulo ${i + 1}...`)
          const modUrl = await uploadFileToBlobClient(modImageFile)
          moduleImageUrls.push(modUrl)
        } else {
          const existingUrl = formData.get(`moduleExistingImage_${i}`) as string || ""
          moduleImageUrls.push(existingUrl)
        }
      }

      // ========== BUILD CLEAN FORM DATA (text only, no files) ==========
      setStatus("Salvando no banco de dados...")
      
      const cleanFormData = new FormData()
      cleanFormData.set("title", formData.get("title") as string)
      cleanFormData.set("description", formData.get("description") as string)
      cleanFormData.set("category", formData.get("category") as string)
      cleanFormData.set("tags", formData.get("tags") as string)
      cleanFormData.set("ageRange", formData.get("ageRange") as string)
      cleanFormData.set("pages", formData.get("pages") as string)
      cleanFormData.set("format", formData.get("format") as string)
      cleanFormData.set("fileSize", formData.get("fileSize") as string)
      cleanFormData.set("type", formData.get("type") as string || "pack")
      cleanFormData.set("kiwifyId", formData.get("kiwifyId") as string || "")
      if (formData.get("isNew")) cleanFormData.set("isNew", "on")
      
      // Pass uploaded URLs instead of files
      cleanFormData.set("imageUrl", imageUrl)
      cleanFormData.set("downloadUrl", pdfUrl)
      
      // Pass module data
      cleanFormData.set("modulesCount", String(modulesCount))
      for (let i = 0; i < modulesCount; i++) {
        cleanFormData.set(`moduleTitle_${i}`, formData.get(`moduleTitle_${i}`) as string || "")
        cleanFormData.set(`moduleDesc_${i}`, formData.get(`moduleDesc_${i}`) as string || "")
        cleanFormData.set(`moduleImageUrl_${i}`, moduleImageUrls[i] || "")
      }

      if (isEditing) {
        await updatePackAction(pack.id, cleanFormData)
      } else {
        await createPackAction(cleanFormData)
      }
      
      // If redirect didn't fire, do it manually
      window.location.href = "/admin/packs"
    } catch (err: any) {
      if (err?.digest?.startsWith?.("NEXT_REDIRECT")) {
        window.location.href = "/admin/packs"
        return
      }
      console.error("Pack save error:", err)
      setError(err?.message || "Erro ao salvar. Verifique o console (F12) para mais detalhes.")
      setSaving(false)
      setStatus("")
    }
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-2xl text-red-800">
          <p className="font-bold text-sm">❌ Erro ao salvar:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
      <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* INFORMAÇÕES BÁSICAS */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Informações Básicas</h3>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-on-surface">Título do Pack</label>
            <input type="text" name="title" defaultValue={pack?.title} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Alfabetização Divertida" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-on-surface">Descrição (pode ser longa)</label>
            <textarea name="description" defaultValue={pack?.description} required rows={4} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Descreva o material..."></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-on-surface">Imagem de Capa</label>
            {pack?.image && (
              <div className="mb-4">
                <p className="text-xs font-bold mb-1">Imagem Atual:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pack.image} alt="Capa atual" className="w-32 h-auto rounded-lg border border-outline-variant" />
              </div>
            )}
            <input type="file" name="imageFile" accept="image/*" className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90" />
            {isEditing && <p className="text-xs text-on-surface-variant mt-2">Envie uma nova imagem apenas se quiser substituir a atual.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Tipo</label>
            <select name="type" defaultValue={pack?.type || "pack"} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary">
              <option value="pack">Pack Padrão (Meus Packs)</option>
              <option value="plan">Plano de Ensino</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">ID do Produto na Kiwify</label>
            <input type="text" name="kiwifyId" defaultValue={pack?.kiwifyId || ""} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: e61d6bc2-1234-..." />
            <p className="text-[10px] text-on-surface-variant mt-1">Deixe em branco se não vender este pack isoladamente na Kiwify.</p>
          </div>

          {/* DETALHES TÉCNICOS */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Detalhes Técnicos</h3>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Categoria</label>
            <input type="text" name="category" defaultValue={pack?.category} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Alfabetização Inicial" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Tags (separadas por marcador)</label>
            <input type="text" name="tags" defaultValue={pack?.tags} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Atividades de Escrita • Alfabeto" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Faixa Etária</label>
            <input type="text" name="ageRange" defaultValue={pack?.ageRange} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 4-7" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Número de Páginas</label>
            <input type="number" name="pages" defaultValue={pack?.pages} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 60" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Formato do Arquivo</label>
            <input type="text" name="format" defaultValue={pack?.format || "PDF Alta Qualidade"} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Tamanho (Aproximado)</label>
            <input type="text" name="fileSize" defaultValue={pack?.fileSize} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 25 MB" />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input type="checkbox" name="isNew" id="isNew" defaultChecked={pack?.isNew} className="w-5 h-5 accent-primary" />
            <label htmlFor="isNew" className="text-sm font-medium text-on-surface">Destacar como "Novo" (Aparece na seção Novidades)</label>
          </div>

          {/* ARQUIVO */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Arquivo para Download (PDF)</h3>
          </div>

          <div className="md:col-span-2">
            {pack?.downloadUrl && (
              <div className="mb-4 p-4 bg-surface rounded-xl border border-outline-variant flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Arquivo Atual:</p>
                  <p className="text-xs text-on-surface-variant font-mono">{pack.downloadUrl}</p>
                </div>
                <a href={pack.downloadUrl} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold hover:underline">Ver</a>
              </div>
            )}
            <label className="block text-sm font-medium mb-2 text-on-surface">Arquivo PDF do Pack</label>
            <input type="file" name="pdfFile" accept=".pdf" className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90" />
            {isEditing && <p className="text-xs text-on-surface-variant mt-2">Envie um novo PDF apenas se quiser substituir o atual.</p>}
          </div>

          {/* MÓDULOS */}
          <div className="md:col-span-2 mt-4">
            <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-2">
              <h3 className="text-lg font-bold text-on-surface">O que você vai encontrar (Módulos)</h3>
              <button 
                type="button" 
                onClick={addModule}
                className="flex items-center gap-1 px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-sm font-bold hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Adicionar Bloco
              </button>
            </div>
            
            <input type="hidden" name="modulesCount" value={modules.length} />

            <div className="space-y-4">
              {modules.length === 0 && (
                <p className="text-sm text-on-surface-variant text-center py-6 bg-surface rounded-xl border border-dashed border-outline-variant">
                  Nenhum módulo adicionado. Clique no botão acima para adicionar.
                </p>
              )}
              {modules.map((mod, index) => (
                <div key={mod.id} className="relative p-6 bg-surface rounded-2xl border border-outline-variant">
                  <button 
                    type="button" 
                    onClick={() => removeModule(mod.id)}
                    className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
                    title="Remover módulo"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                  
                  <h4 className="font-bold mb-4">Bloco {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-on-surface">Título do Módulo</label>
                      <input type="text" name={`moduleTitle_${index}`} defaultValue={mod.title} className="w-full px-4 py-2 rounded-xl bg-background border border-outline-variant focus:ring-2 focus:ring-primary text-sm" placeholder="Ex: Módulo: Vogais" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-on-surface">Descrição Curta</label>
                      <input type="text" name={`moduleDesc_${index}`} defaultValue={mod.description} className="w-full px-4 py-2 rounded-xl bg-background border border-outline-variant focus:ring-2 focus:ring-primary text-sm" placeholder="Ex: Introdução divertida aos sons..." />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-on-surface">Imagem do Módulo</label>
                      {mod.image && (
                        <div className="mb-2 flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={mod.image} alt="Atual" className="w-16 h-auto rounded border border-outline-variant" />
                          <span className="text-xs text-on-surface-variant">Imagem enviada.</span>
                        </div>
                      )}
                      <input type="hidden" name={`moduleExistingImage_${index}`} value={mod.image} />
                      <input type="file" name={`moduleImage_${index}`} accept="image/*" className="w-full px-4 py-2 rounded-xl bg-background border border-outline-variant focus:ring-2 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-outline-variant flex justify-end gap-4">
          <Link href="/admin/packs" className="px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors">
            Cancelar
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-3 bg-tertiary text-on-tertiary rounded-full font-bold hover:bg-tertiary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-wait"
          >
            {saving ? `⏳ ${status || 'Salvando...'}` : (isEditing ? 'Salvar Alterações' : 'Salvar Pack')}
          </button>
        </div>
      </form>
    </div>
  )
}
