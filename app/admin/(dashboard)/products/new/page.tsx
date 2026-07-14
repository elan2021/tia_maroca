import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    "use server"
    
    await db.product.create({
      data: {
        title: formData.get("title") as string,
        price: formData.get("price") as string,
        image: formData.get("image") as string,
        alt: formData.get("alt") as string || "Imagem do produto",
        checkoutUrl: formData.get("checkoutUrl") as string,
        badgeLabel: (formData.get("badgeLabel") as string) || null,
        badgeVariant: (formData.get("badgeVariant") as string) || null,
      }
    })
    
    revalidatePath("/admin/products")
    revalidatePath("/")
    redirect("/admin/products")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold font-title text-on-background">Novo Produto</h1>
      </div>

      <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
        <form action={createProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Título do Produto</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: Flash das Férias" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Preço (Texto)</label>
              <input type="text" name="price" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Ex: R$ 10,00" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Badge (Ex: BEST SELLER)</label>
              <input type="text" name="badgeLabel" className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="Opcional" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">URL da Imagem</label>
              <input type="url" name="image" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="https://..." />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Link de Compra (Hotmart/Kiwify)</label>
              <input type="url" name="checkoutUrl" required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" placeholder="https://pay.hotmart.com/..." />
            </div>
            
            <input type="hidden" name="badgeVariant" value="bestseller" />
          </div>

          <div className="pt-6 border-t border-outline-variant flex justify-end gap-4">
            <Link href="/admin/products" className="px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
