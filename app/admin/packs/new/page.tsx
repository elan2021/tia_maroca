import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import fs from "fs/promises"
import path from "path"

export default function NewPackPage() {
  async function createPack(formData: FormData) {
    "use server"
    
    // File upload logic
    let downloadUrl = ""
    const pdfFile = formData.get("pdfFile") as File
    
    if (pdfFile && pdfFile.size > 0) {
      const bytes = await pdfFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const fileName = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const uploadDir = path.join(process.cwd(), "public/uploads")
      
      // Ensure directory exists
      try {
        await fs.access(uploadDir)
      } catch {
        await fs.mkdir(uploadDir, { recursive: true })
      }
      
      const filePath = path.join(uploadDir, fileName)
      await fs.writeFile(filePath, buffer)
      downloadUrl = `/uploads/${fileName}`
    } else {
      downloadUrl = formData.get("downloadUrl") as string // fallback to URL if provided
    }
    
    const isNew = formData.get("isNew") === "on"

    // Process modules JSON from a text area
    const modulesText = formData.get("modulesText") as string
    let modulesJson = "[]"
    try {
      if (modulesText && modulesText.trim() !== "") {
        // Simple attempt to parse if user types JSON directly, or we can format it differently.
        // For a better UX in the future, we could have a dynamic JS form, but for now a simple JSON text area or we leave it empty.
        // Let's assume the user will input a raw JSON array like [{"title":"", "description":"", "image":""}]
        JSON.parse(modulesText) // validate
        modulesJson = modulesText
      }
    } catch (e) {
      console.error("Invalid JSON for modules", e)
      modulesJson = "[]" // fallback
    }

    await db.pack.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        category: formData.get("category") as string,
        tags: formData.get("tags") as string,
        ageRange: formData.get("ageRange") as string,
        pages: parseInt(formData.get("pages") as string) || 0,
        format: formData.get("format") as string,
        fileSize: formData.get("fileSize") as string,
        downloadUrl,
        isNew,
        type: formData.get("type") as string || "pack",
        modulesJson,
      }
    })
    
    revalidatePath("/admin/packs")
    revalidatePath("/membros")
    redirect("/admin/packs")
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packs" className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold font-title text-on-background">Novo Pack</h1>
      </div>

      <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
        <form action={createPack} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* INFORMAÇÕES BÁSICAS */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Informações Básicas</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Título do Pack</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Alfabetização Divertida" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Descrição (pode ser longa)</label>
              <textarea name="description" required rows={4} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Descreva o material..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">URL da Imagem de Capa</label>
              <input type="url" name="image" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Tipo</label>
              <select name="type" className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary">
                <option value="pack">Pack Padrão (Meus Packs)</option>
                <option value="plan">Plano de Ensino</option>
              </select>
            </div>

            {/* DETALHES TÉCNICOS */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Detalhes Técnicos</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Categoria</label>
              <input type="text" name="category" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Alfabetização Inicial" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Tags (separadas por marcador)</label>
              <input type="text" name="tags" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Atividades de Escrita • Alfabeto" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Faixa Etária</label>
              <input type="text" name="ageRange" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 4-7" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Número de Páginas</label>
              <input type="number" name="pages" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 60" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Formato do Arquivo</label>
              <input type="text" name="format" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: PDF Alta Qualidade" defaultValue="PDF Alta Qualidade" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Tamanho (Aproximado)</label>
              <input type="text" name="fileSize" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: 25 MB" />
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" name="isNew" id="isNew" className="w-5 h-5 accent-primary" />
              <label htmlFor="isNew" className="text-sm font-medium text-on-surface">Destacar como "Novo" (Aparece na seção Novidades)</label>
            </div>

            {/* ARQUIVO */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Arquivo para Download (PDF)</h3>
              <p className="text-xs text-on-surface-variant mb-4">Faça o upload do material que o usuário vai baixar.</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Arquivo PDF do Pack</label>
              <input type="file" name="pdfFile" accept=".pdf" className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90" />
            </div>

            {/* MÓDULOS */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">O que você vai encontrar (Módulos)</h3>
              <p className="text-xs text-on-surface-variant mb-4">Cole aqui o array JSON contendo os módulos. Exemplo:<br/><code>[&#123;"title":"Atividades de Escrita", "description":"Treino de caligrafia", "image":"url"&#125;]</code></p>
              <textarea name="modulesText" rows={5} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary font-mono text-sm" placeholder="[ { ... } ]" defaultValue="[]"></textarea>
            </div>

          </div>

          <div className="pt-8 border-t border-outline-variant flex justify-end gap-4">
            <Link href="/admin/packs" className="px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="px-6 py-3 bg-tertiary text-on-tertiary rounded-full font-bold hover:bg-tertiary/90 transition-colors shadow-sm">
              Salvar Pack
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
