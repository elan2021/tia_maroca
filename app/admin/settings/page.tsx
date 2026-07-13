import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export default async function SettingsPage() {
  const settings = await db.siteSetting.findMany()
  
  // Transformar array em objeto para facilitar
  const config = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  async function saveSettings(formData: FormData) {
    "use server"
    
    const keys = ["heroTitle", "heroSubtitle", "heroBadge"]
    
    for (const key of keys) {
      const value = formData.get(key) as string
      if (value !== null) {
        await db.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        })
      }
    }

    const logoFile = formData.get("logoFile") as File
    if (logoFile && logoFile.size > 0) {
      const buffer = Buffer.from(await logoFile.arrayBuffer())
      const base64 = buffer.toString('base64')
      const mimeType = logoFile.type
      const logoUrl = `data:${mimeType};base64,${base64}`
      
      await db.siteSetting.upsert({
        where: { key: "logoUrl" },
        update: { value: logoUrl },
        create: { key: "logoUrl", value: logoUrl }
      })
    }
    
    revalidatePath("/admin/settings")
    revalidatePath("/") // Atualiza a Home com os novos textos
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-title text-on-background">Configurações do Site</h1>
        <p className="text-on-surface-variant mt-2">Altere os textos da área principal (Hero) e a logotipo.</p>
      </div>

      <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
        <form action={saveSettings} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Logomarca (Upload)</label>
            <div className="flex flex-col gap-2">
              {config["logoUrl"] && (
                <div className="mb-2">
                  <p className="text-xs text-on-surface-variant mb-1">Logomarca atual:</p>
                  <img src={config["logoUrl"]} alt="Logo atual" className="h-12 object-contain" />
                </div>
              )}
              <input 
                type="file" 
                name="logoFile" 
                accept="image/*"
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary/90 transition-all" 
              />
              <p className="text-xs text-on-surface-variant">Envie uma imagem pequena (máx 1MB). Deixe vazio para manter a atual.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Badge da Home (Texto Acima do Título)</label>
            <input 
              type="text" 
              name="heroBadge" 
              defaultValue={config["heroBadge"] || "NOVIDADE"} 
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Título Principal (Hero)</label>
            <textarea 
              name="heroTitle" 
              rows={2}
              defaultValue={config["heroTitle"] || "Atividades Pedagógicas com Amor."} 
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Subtítulo (Hero)</label>
            <textarea 
              name="heroSubtitle" 
              rows={3}
              defaultValue={config["heroSubtitle"] || "Recursos criados com carinho para transformar a educação infantil..."} 
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" 
            />
          </div>

          <div className="pt-6 border-t border-outline-variant flex justify-end">
            <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
