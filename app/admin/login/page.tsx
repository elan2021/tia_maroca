import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-4">
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-[32px] shadow-sm border border-outline-variant">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-title font-bold text-on-surface mb-2">Acesso Restrito</h1>
          <p className="text-on-surface-variant">Faça login para gerenciar a loja.</p>
        </div>

        <form
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@tiamaroca.com.br"
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface">Senha</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
