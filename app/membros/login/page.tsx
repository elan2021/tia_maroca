import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export default function MembrosLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  async function loginAction(formData: FormData) {
    "use server"
    try {
      await signIn("credentials", {
        ...Object.fromEntries(formData),
        redirectTo: "/membros",
      })
    } catch (error: any) {
      if (error.message.includes("CredentialsSignin")) {
        redirect("/membros/login?error=CredentialsSignin")
      }
      throw error
    }
  }

  return (
    <div className="theme-membros min-h-screen bg-background text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-highest p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-membros-display text-4xl font-black text-primary mb-2">Área de Membros</h1>
          <p className="text-on-surface-variant font-membros-body">Acesse seus materiais exclusivos.</p>
        </div>

        {searchParams.error === "CredentialsSignin" && (
          <div className="bg-error/20 text-error px-4 py-3 rounded-lg mb-6 text-sm font-semibold text-center border border-error/30">
            E-mail ou senha incorretos.
          </div>
        )}

        <form action={loginAction} className="space-y-4 font-membros-body">
          <div>
            <label className="block text-sm font-bold mb-2">E-mail</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-surface px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-surface px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] mt-4"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
