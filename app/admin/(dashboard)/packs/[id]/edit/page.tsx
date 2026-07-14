import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import PackForm from "@/components/admin/PackForm"

export default async function EditPackPage({ params }: { params: { id: string } }) {
  const pack = await db.pack.findUnique({
    where: { id: params.id }
  })

  if (!pack) {
    redirect("/admin/packs")
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packs" className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold font-title text-on-background">Editar Pack</h1>
      </div>

      <PackForm pack={pack} />
    </div>
  )
}
