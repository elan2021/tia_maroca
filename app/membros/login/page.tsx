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
    <div className="relative min-h-screen flex flex-col md:items-center md:justify-center font-membros-body selection:bg-primary selection:text-white">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Troque esta URL pela imagem da menina que você salvou no seu computador.
          // Para usar uma imagem do seu PC, coloque ela na pasta 'public' (ex: public/bg-login.jpg)
          // E mude a URL abaixo para: backgroundImage: "url('/bg-login.jpg')"
          backgroundImage: "url('https://img.magnific.com/fotos-gratis/garota-de-alto-angulo-fazendo-quebra-cabeca_23-2149557913.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/60 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full flex-grow md:flex-grow-0 flex items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-[450px] bg-black/70 backdrop-blur-sm p-10 md:p-16 rounded-xl shadow-2xl border border-white/5">
          <h2 className="text-white text-3xl font-bold mb-8">Entrar</h2>

          {searchParams.error === "CredentialsSignin" && (
            <div className="bg-[#e87c03] text-white px-4 py-3 rounded mb-6 text-sm">
              E-mail ou senha incorretos. Tente novamente.
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-[#333333] text-white px-4 py-4 rounded focus:bg-[#454545] border border-transparent focus:border-white/50 outline-none transition-all placeholder:text-[#8c8c8c]"
                placeholder="Email ou número de celular"
              />
            </div>
            <div>
              <input 
                name="password" 
                type="password" 
                required 
                className="w-full bg-[#333333] text-white px-4 py-4 rounded focus:bg-[#454545] border border-transparent focus:border-white/50 outline-none transition-all placeholder:text-[#8c8c8c]"
                placeholder="Senha"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded transition-colors mt-6 text-lg"
            >
              Continuar
            </button>
            
            <div className="flex items-center justify-between mt-4 text-[#b3b3b3] text-sm">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="accent-[#737373] w-4 h-4 cursor-pointer" defaultChecked />
                Lembre-se de mim
              </label>
              <a href="#" className="hover:underline">Precisa de ajuda?</a>
            </div>
          </form>

          <div className="mt-16 text-[#737373] text-sm space-y-4">
            <p>
              Novo por aqui? <a href="#" className="text-white hover:underline font-semibold">Assine agora.</a>
            </p>
            <p className="text-[11px]">
              Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. <a href="#" className="text-[#0071eb] hover:underline">Saiba mais.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
