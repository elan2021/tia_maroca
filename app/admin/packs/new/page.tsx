import Link from "next/link"
import PackForm from "@/components/admin/PackForm"

export default function NewPackPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packs" className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold font-title text-on-background">Novo Pack</h1>
      </div>

      <PackForm />
    </div>
  )
}
