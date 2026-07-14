import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import Link from "next/link"

async function deleteProduct(formData: FormData) {
  "use server"
  const id = formData.get("id") as string
  if (id) {
    await db.product.delete({ where: { id } })
    revalidatePath("/admin/products")
    revalidatePath("/") // Atualiza a home também
  }
}

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-title text-on-background">Produtos</h1>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Produto
        </Link>
      </div>

      <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            Nenhum produto cadastrado ainda.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container">
                <th className="p-4 font-medium text-on-surface">Imagem</th>
                <th className="p-4 font-medium text-on-surface">Título</th>
                <th className="p-4 font-medium text-on-surface">Preço</th>
                <th className="p-4 font-medium text-on-surface">Link</th>
                <th className="p-4 font-medium text-on-surface text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4 text-on-surface-variant">{product.price}</td>
                  <td className="p-4">
                    <a href={product.checkoutUrl || "#"} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      Acessar
                    </a>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button 
                          type="submit"
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
                          title="Excluir"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
