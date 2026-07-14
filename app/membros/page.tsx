import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic"

export default async function MembrosPage() {
  const packs = await db.pack.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const meusPacks = packs.filter(p => p.type === 'pack')
  const novidades = packs.filter(p => p.isNew)
  const planos = packs.filter(p => p.type === 'plan')

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[650px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida/AP1WRLtc6M1lCiyizsrBKAdlx-WqqcxU5ruzvjTXPT3rtAdSsgRdh6pBZIhJi2ewb5MSSpz0hgcbTXxvEFZHuWD6rtI19jnSWMA1r2olIts-RvMIeh-Ezgzvj6zFP-G3TlsyrRr1PP8Ix_9JgZQglJwbUFTYN1MqBl9b6ENZMkr55NK0puHkJAUEE5MOOlroiHWiZUmluDKox8xawzQfNuODxOiWzPE8hQOt3S1OU2RcHa-JxsMt_Y5G5U2E7A')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative h-full flex flex-col justify-end px-8 md:px-12 pb-20 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary-container text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              Novo Pack
            </span>
            <span className="text-white text-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">stars</span>{" "}
              Especial Tia Maroka
            </span>
          </div>
          <h2 className="font-membros-display font-black text-4xl md:text-[56px] leading-tight mb-4 max-w-3xl text-white">
            PACKS DE ATIVIDADES PEDAGÓGICAS
          </h2>
          <p className="font-membros-body text-lg text-white/80 mb-8 max-w-2xl">
            Materiais lúdicos, prontos para imprimir e aplicar, pensados para o
            desenvolvimento infantil.
          </p>
          <div className="flex flex-row items-center gap-2 md:gap-4 w-full">
            <button className="flex-1 md:flex-none justify-center whitespace-nowrap bg-white text-black px-4 md:px-10 py-3 md:py-3.5 rounded-lg font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 hover:bg-white/90 transition-all active:scale-95">
              <span
                className="material-symbols-outlined text-lg md:text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                view_module
              </span>
              Ver Packs
            </button>
            <button className="flex-1 md:flex-none justify-center whitespace-nowrap bg-black/40 backdrop-blur-md border border-white/20 px-4 md:px-10 py-3 md:py-3.5 rounded-lg font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 text-white hover:bg-white/10 transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg md:text-2xl">info</span>
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <div className="px-8 md:px-12 -mt-10 relative z-10 space-y-section_gap pb-24">
        {/* Row 1: Meus Packs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-membros-display text-2xl font-bold">
              Meus Packs
            </h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-surface-container-high/60 flex items-center justify-center hover:bg-primary-container transition-colors group">
                <span className="material-symbols-outlined text-sm text-on-surface">
                  chevron_left
                </span>
              </button>
              <button className="w-8 h-8 rounded-full bg-surface-container-high/60 flex items-center justify-center hover:bg-primary-container transition-colors group">
                <span className="material-symbols-outlined text-sm text-on-surface">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
          <div className="flex gap-card_gap overflow-x-auto pb-6 no-scrollbar scroll-smooth">
            {meusPacks.length === 0 ? (
              <p className="text-on-surface-variant">Nenhum pack encontrado.</p>
            ) : (
              meusPacks.map(pack => (
                <Link key={pack.id} href={`/membros/pack/${pack.id}`} className="min-w-[320px] max-w-[320px] group cursor-pointer transition-all duration-300 block">
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-surface-container-highest shadow-lg mb-3">
                    <img
                      alt={pack.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={pack.image}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-white">
                        visibility
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                      <div
                        className="h-full bg-primary-container"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {pack.title}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-semibold line-clamp-1">
                    {pack.tags}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Row 2: Novidades da Semana */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-membros-display text-2xl font-bold">
              Novidades da Semana
            </h3>
          </div>
          <div className="flex gap-card_gap overflow-x-auto pb-6 no-scrollbar scroll-smooth">
            {novidades.length === 0 ? (
              <p className="text-on-surface-variant">Nenhuma novidade esta semana.</p>
            ) : (
              novidades.map(pack => (
                <Link key={pack.id} href={`/membros/pack/${pack.id}`} className="min-w-[220px] max-w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest block">
                  <img
                    alt={pack.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={pack.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5">
                    <h4 className="font-bold text-lg text-white leading-tight mb-2 line-clamp-2">
                      {pack.title}
                    </h4>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-primary-container text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                        Novo
                      </span>
                      <span className="text-[10px] text-white/70 font-semibold truncate max-w-[120px]">
                        {pack.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Row 3: Planos de Ensino */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-membros-display text-2xl font-bold">
              Planos de Ensino
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {planos.length === 0 ? (
              <p className="text-on-surface-variant md:col-span-4">Nenhum plano encontrado.</p>
            ) : (
              planos.map((plano, index) => (
                <Link key={plano.id} href={`/membros/pack/${plano.id}`} className={`${index === 0 ? 'md:col-span-2' : ''} h-56 relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest shadow-xl block`}>
                  <img
                    alt={plano.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={plano.image}
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors p-6 flex flex-col justify-center">
                    <span className="text-primary-container font-black text-[10px] uppercase mb-2 tracking-widest">
                      Plano {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className={`${index === 0 ? 'text-3xl' : 'text-xl'} text-white font-bold leading-tight mb-2 line-clamp-2`}>
                      {plano.title}
                    </h4>
                    {index === 0 && (
                      <p className="text-sm text-white/80 max-w-sm line-clamp-2">
                        {plano.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
