import Link from "next/link";

export default function MembrosPage() {
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
          <h2 className="font-membros-display font-black text-[56px] leading-tight mb-4 max-w-3xl text-white">
            PACKS DE ATIVIDADES PEDAGÓGICAS
          </h2>
          <p className="font-membros-body text-lg text-white/80 mb-8 max-w-2xl">
            Materiais lúdicos, prontos para imprimir e aplicar, pensados para o
            desenvolvimento infantil.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-10 py-3.5 rounded-lg font-bold flex items-center gap-2 hover:bg-white/90 transition-all active:scale-95">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                view_module
              </span>
              Ver Packs
            </button>
            <button className="bg-black/40 backdrop-blur-md border border-white/20 px-10 py-3.5 rounded-lg font-bold flex items-center gap-2 text-white hover:bg-white/10 transition-all active:scale-95">
              <span className="material-symbols-outlined">info</span>
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
            {/* Card 1 */}
            <Link href="/membros/pack/1" className="min-w-[320px] group cursor-pointer transition-all duration-300 block">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-surface-container-highest shadow-lg mb-3">
                <img
                  alt="Alfabetização Divertida"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsTgTJppOwLDXQFe_a_wmPVdDgaGMnnGmXaPTnxnEsE7ml437rUvpRhtnRcLXB7h6EZL6nJ3K8F-RWkN3OHNs52ouT0cR7LfbjQcRoLDX1A3gTRAK6LDUrfvUQGlWXo0q6GWDf1Tf03aYLC6NVX5LOw-O1kFO8WiDn3Zm4Oq_vlVbKa78GlNnBJdbIPrMOTWvSD-8KXan769ylXwGeB30EXfuCgZPP9d-ckfBbeEEH5t478e295x-UTmQ"
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
              <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                Alfabetização Divertida
              </h4>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-semibold">
                Atividades de Escrita • Alfabeto
              </p>
            </Link>
            {/* Card 2 */}
            <Link href="/membros/pack/2" className="min-w-[320px] group cursor-pointer transition-all duration-300 block">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-surface-container-highest shadow-lg mb-3">
                <img
                  alt="Matemática Criativa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLtn1E6D2KT1tKh6krFkq1cYZxl3yySJY8uXQ_D0GgNx3RXuRsVjGJhyiuFZ9gNGUx2HWR1TxvCuZ4ChOgVtfjzShF562R5YTTDo7Kyr3pxM1n2FevRw-RO8o3ot-W2h6tDS21dnHUZ9pZRNVL_SAPzy_fLOriBVRnX2qBFiueulNOCwDLP5MxCO-Ln_K2f0iHJtzXg-amSwjZ_78YU6xhBRbQoOhbOiQhwOC1xSsASeCUy6aajXfRhDfg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-white">
                    visibility
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                Matemática Criativa
              </h4>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-semibold">
                Raciocínio Lógico • Números
              </p>
            </Link>
            {/* Card 3 */}
            <Link href="/membros/pack/3" className="min-w-[320px] group cursor-pointer transition-all duration-300 block">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-surface-container-highest shadow-lg mb-3">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                  <span className="text-on-surface-variant/40 italic">img</span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-white">
                    visibility
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
              <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                Atividades Sensoriais
              </h4>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider font-semibold">
                Coordenação Motora • Cores
              </p>
            </Link>
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
            {/* Vertical Card 1 */}
            <div className="min-w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/20">
                img
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-5">
                <h4 className="font-bold text-lg leading-tight mb-2">
                  Pequenos Yogis
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary-container text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    Novo
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold">
                    Bem-estar
                  </span>
                </div>
              </div>
            </div>
            {/* Vertical Card 2 */}
            <div className="min-w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/20">
                img
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-5">
                <h4 className="font-bold text-lg leading-tight mb-2">
                  Explosão de Cores
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary-container text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    Novo
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold">
                    Artes
                  </span>
                </div>
              </div>
            </div>
            {/* Vertical Card 3 */}
            <div className="min-w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/20">
                img
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-5">
                <h4 className="font-bold text-lg leading-tight mb-2">
                  Hora do Conto
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary-container text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    Novo
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold">
                    Literatura
                  </span>
                </div>
              </div>
            </div>
            {/* Vertical Card 4 (Locked) */}
            <div className="min-w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/20">
                img
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 text-white/80">
                <span className="material-symbols-outlined text-lg text-white">
                  lock
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-5">
                <h4 className="font-bold text-lg leading-tight mb-2">
                  Pequenos Cientistas
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary-container text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    Novo
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold">
                    Ciências
                  </span>
                </div>
              </div>
            </div>
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
            <div className="md:col-span-2 h-56 relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/10">
                img
              </div>
              <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-center">
                <span className="text-primary-container font-black text-xs uppercase mb-3 tracking-widest">
                  Plano 01
                </span>
                <h4 className="text-3xl font-bold mb-2">BNCC na Prática</h4>
                <p className="text-sm text-on-surface-variant/80 max-w-sm">
                  Alinhamento completo para a educação infantil com atividades
                  estruturadas.
                </p>
              </div>
            </div>
            <div className="h-56 relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/10">
                img
              </div>
              <div className="absolute inset-0 bg-black/70 p-6 flex flex-col justify-center">
                <span className="text-primary-container font-black text-[10px] uppercase mb-2 tracking-widest">
                  Plano 02
                </span>
                <h4 className="text-xl font-bold leading-tight">
                  Ciclo de Alfabetização
                </h4>
              </div>
            </div>
            <div className="h-56 relative rounded-xl overflow-hidden group cursor-pointer bg-surface-container-highest shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center italic text-on-surface-variant/10">
                img
              </div>
              <div className="absolute inset-0 bg-black/70 p-6 flex flex-col justify-center">
                <span className="text-primary-container font-black text-[10px] uppercase mb-2 tracking-widest">
                  Plano 03
                </span>
                <h4 className="text-xl font-bold leading-tight">
                  Ensino Inclusivo
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
