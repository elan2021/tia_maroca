import { auth } from "@/auth"

export default async function AdminDashboard() {
  const session = await auth()

  return (
    <div>
      <h1 className="text-3xl font-bold font-title text-on-background mb-4">Bem-vindo, {session?.user?.name || "Administrador"}!</h1>
      <p className="text-on-surface-variant mb-8">
        Aqui você pode gerenciar os produtos da sua loja e alterar os textos principais do site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">inventory_2</span>
            Gerenciar Produtos
          </h2>
          <p className="text-on-surface-variant mb-4">Adicione, edite ou remova produtos e links da Hotmart/Kiwify.</p>
          <a href="/admin/products" className="inline-block px-6 py-2 bg-primary text-on-primary rounded-full font-medium hover:bg-primary/90 transition-colors">
            Acessar Produtos
          </a>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">folder_special</span>
            Packs (Área de Membros)
          </h2>
          <p className="text-on-surface-variant mb-4">Adicione e gerencie os packs de atividades e planos de ensino.</p>
          <a href="/admin/packs" className="inline-block px-6 py-2 bg-tertiary text-on-tertiary rounded-full font-medium hover:bg-tertiary/90 transition-colors">
            Acessar Packs
          </a>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">settings</span>
            Configurações do Site
          </h2>
          <p className="text-on-surface-variant mb-4">Altere textos da página inicial, logo e outras configurações globais.</p>
          <a href="/admin/settings" className="inline-block px-6 py-2 bg-secondary text-on-secondary rounded-full font-medium hover:bg-secondary/90 transition-colors">
            Acessar Configurações
          </a>
        </div>
      </div>
    </div>
  )
}
