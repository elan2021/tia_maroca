import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  })

  if (!product) {
    redirect("/admin/products")
  }

  async function updateProduct(formData: FormData) {
    "use server"
    
    await db.product.update({
      where: { id: params.id },
      data: {
        title: formData.get("title") as string,
        price: formData.get("price") as string,
        image: formData.get("image") as string,
        checkoutUrl: formData.get("checkoutUrl") as string,
        badgeLabel: (formData.get("badgeLabel") as string) || null,
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
        <h1 className="text-3xl font-bold font-title text-on-background">Editar Produto</h1>
      </div>

      <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant">
        <form action={updateProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Título do Produto</label>
              <input type="text" name="title" defaultValue={product.title} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Preço (Texto)</label>
              <input type="text" name="price" defaultValue={product.price} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Badge (Ex: BEST SELLER)</label>
              <input type="text" name="badgeLabel" defaultValue={product.badgeLabel || ""} className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">URL da Imagem</label>
              <input type="url" name="image" defaultValue={product.image} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-on-surface">Link de Compra (Hotmart/Kiwify)</label>
              <input type="url" name="checkoutUrl" defaultValue={product.checkoutUrl || ""} required className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant flex justify-end gap-4">
            <Link href="/admin/products" className="px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
