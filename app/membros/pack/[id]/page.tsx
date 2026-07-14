import Link from "next/link";

export default function PackPage({ params }: { params: { id: string } }) {
  return (
    <div className="pb-12">
      {/* Hero Content Section */}
      <section className="relative pt-16 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtc6M1lCiyizsrBKAdlx-WqqcxU5ruzvjTXPT3rtAdSsgRdh6pBZIhJi2ewb5MSSpz0hgcbTXxvEFZHuWD6rtI19jnSWMA1r2olIts-RvMIeh-Ezgzvj6zFP-G3TlsyrRr1PP8Ix_9JgZQglJwbUFTYN1MqBl9b6ENZMkr55NK0puHkJAUEE5MOOlroiHWiZUmluDKox8xawzQfNuODxOiWzPE8hQOt3S1OU2RcHa-JxsMt_Y5G5U2E7A"
            alt="Fundo"
          />
        </div>
        <div className="px-8 md:px-12 relative z-20 flex flex-col md:flex-row items-center gap-16 w-full max-w-7xl mx-auto">
          {/* Product Mockup */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-primary-container/20 blur-3xl rounded-full"></div>
              <img
                className="relative z-10 w-full max-w-[320px] rounded-xl shadow-2xl shadow-black/80 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida/AP1WRLsTgTJppOwLDXQFe_a_wmPVdDgaGMnnGmXaPTnxnEsE7ml437rUvpRhtnRcLXB7h6EZL6nJ3K8F-RWkN3OHNs52ouT0cR7LfbjQcRoLDX1A3gTRAK6LDUrfvUQGlWXo0q6GWDf1Tf03aYLC6NVX5LOw-O1kFO8WiDn3Zm4Oq_vlVbKa78GlNnBJdbIPrMOTWvSD-8KXan769ylXwGeB30EXfuCgZPP9d-ckfBbeEEH5t478e295x-UTmQ"
                alt="Mockup do Pack"
              />
            </div>
          </div>
          {/* Info Column */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-container text-white text-[10px] font-black tracking-widest uppercase rounded">
                ORIGINAL PACK
              </span>
              <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">
                • Alfabetização Inicial
              </span>
            </div>
            <h2 className="font-membros-display font-black text-4xl md:text-[56px] text-on-surface mb-4 leading-tight">
              Alfabetização Divertida
            </h2>
            <p className="font-membros-body text-lg text-on-surface-variant mb-8 max-w-2xl">
              Transforme o aprendizado em uma jornada épica. Um material
              completo com mais de 60 páginas de atividades lúdicas, vogais,
              consoantes, formação de palavras e caligrafia. Desenhado para
              engajar crianças de 4 a 7 anos com o máximo de diversão.
            </p>
            <div className="flex flex-wrap gap-12 mb-10">
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  60+
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Páginas
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  4-7
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Idade Alvo
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  PDF
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Formato
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 px-8 py-4 bg-primary-container text-white font-bold rounded-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(229,9,20,0.25)]">
                <span className="material-symbols-outlined">download</span>
                Download Pack (PDF)
              </button>
              <button className="flex items-center gap-3 px-8 py-4 bg-surface-variant/40 border border-white/10 backdrop-blur-md text-on-surface font-bold rounded-lg hover:bg-white/10 transition-all">
                <span className="material-symbols-outlined">favorite</span>
                Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview Grid */}
      <section className="px-8 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="font-membros-display text-3xl font-bold text-on-surface mb-2">
              O que você vai encontrar
            </h3>
            <div className="h-1 w-24 bg-primary-container rounded-full"></div>
          </div>
          <Link
            className="text-primary font-label-md text-sm hover:underline uppercase font-bold"
            href="#"
          >
            VER TUDO
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-variant/30 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Módulo Vogais"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_FS-sihGUeXQ38nXXEIqG6_IsZ_JfjRB8w4T1uNTs2YPjaqAbVqhtTysE5cDIgziaszGmtTgEC5rgDObYvb6IvVEi-PPZ7pP7CRrzZ_mF_qDci8apuyD_RjXtxZYBaScdvTyfd3Clm39jCs7KAy_Qd9xGaSSZI23GZhlycWJfSNFNBaXKU3xLzDY2A8dn2ieYEpUE6ErX7bh7c_HEWJHzBdALILFng2-zu7QjcdsTVEX0uTt8GBhY8ani8aTwSBmcE7L59NC6mA"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
                <div className="h-full bg-primary-container w-[40%]"></div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-membros-display font-bold text-xl text-on-surface mb-1">
                Módulo: Vogais
              </h4>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                Introdução divertida aos sons primários com fichas ilustradas e
                tracejados.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-variant/30 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Módulo Consoantes"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1jHP9WTx94j-PyGwARIYPP-9dI2WUKgS0ucavMAxI7RIImdWm93EIvcJL02cz_4KMgTRTzy5NMqjRl5VIi40dbEsErpoSSSDex4hCIYA2-T61iBuo9PVngWXR4BgsxnHdIJCWSSSB2bB3-j7fNU2huzYIvMwr0v-NoY4xB0wf1c5m-vyKfPlEgkJOTEQZU1bYzB_iFJWGt7FYN5wRN-Ig4NcDona3rr6cwV43Vr9DUwZT79bBKB5S5HaeDE8aluuNjdiOj-4Qg"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
                <div className="h-full bg-primary-container w-[75%]"></div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-membros-display font-bold text-xl text-on-surface mb-1">
                Módulo: Consoantes
              </h4>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                Explorando o alfabeto através de jogos de associação e escrita
                criativa.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-variant/30 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Caligrafia Premium"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE8wCpeDssNRwoX6muojjPr8FStSsr8cih8FDkndKkSWFKPCP7kuy0Lv3e1y3-AQl6NJ56BRoM-iLMe4kfGUifMXgeIHcbdNvDc-aA2mPTbgc_ZsJ8R7fPKcQDLM37JuxscB-1NDJv16-l0gytGszOiVPbG_vXMVJ4wpPbIxaW7njCrWkqMrvMRe7iI4Jgo6FQH-ldhSscOAGmoeLq5v7TXyh6JJTl_MneywAfhRhIbMyHSP9r0amsfXaZohmGnad3VYdu-P4mBQ"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
                <div className="h-full bg-primary-container w-[10%]"></div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-membros-display font-bold text-xl text-on-surface mb-1">
                Caligrafia Premium
              </h4>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                Técnicas de escrita que respeitam o desenvolvimento motor da
                criança.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-variant/30 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Jogos Lúdicos"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5LPmQynQNY7dbdqGTid5DhnBi54ftUABlMGFiGT3faZzO8Lu9FTV34pSsbLoaucxYJEOubHPOqTmPejykcpLMhQ7T_czUnINWnjAU8aBE79raEYeQhKChGTqZ0qPdYKK-P3dPwf26jE0EQttr1QybBFaVFjRytmxOwoSiRWRpcgoS8VbmvIcv5bELl3ZFKhj1WuKy__URtCK97_UUwtwt9dbyYd6JExoRyBl7U6A2Q5O_OJPyussiU1AnHfvK8aMeWHMuoYA-A"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
                <div className="h-full bg-primary-container w-[0%]"></div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-membros-display font-bold text-xl text-on-surface mb-1">
                Jogos Lúdicos
              </h4>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                Atividades de recortar e colar que ensinam brincando.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Grid */}
      <section className="px-8 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-variant/30 backdrop-blur-md border border-white/5 p-8 rounded-xl">
            <h3 className="font-membros-display text-3xl font-bold text-on-surface mb-6">
              Ficha Técnica do Material
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-xs font-label-md uppercase tracking-wider mb-1">
                  Formato do Arquivo
                </span>
                <span className="text-on-surface font-body-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    picture_as_pdf
                  </span>
                  PDF Digital (Pronto para Imprimir)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-xs font-label-md uppercase tracking-wider mb-1">
                  Tamanho do Download
                </span>
                <span className="text-on-surface font-body-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    analytics
                  </span>
                  25 MB
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-xs font-label-md uppercase tracking-wider mb-1">
                  Última Atualização
                </span>
                <span className="text-on-surface font-body-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    update
                  </span>
                  14 de Outubro, 2023
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-xs font-label-md uppercase tracking-wider mb-1">
                  Licença
                </span>
                <span className="text-on-surface font-body-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    verified_user
                  </span>
                  Uso Individual Permanente
                </span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10">
              <p className="text-on-surface-variant italic text-sm">
                Este material foi desenvolvido pela pedagoga Tia Maroka e é
                protegido por direitos autorais. A reprodução comercial sem
                autorização é proibida.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-container/20 to-transparent border border-white/5 backdrop-blur-md p-8 rounded-xl flex flex-col justify-center items-center text-center">
            <span
              className="material-symbols-outlined text-6xl text-primary mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <h4 className="font-membros-display text-2xl font-bold text-on-surface mb-2">
              Acesso Vitalício
            </h4>
            <p className="text-on-surface-variant text-sm mb-6">
              Compre uma vez e receba todas as atualizações futuras deste pack
              gratuitamente.
            </p>
            <button className="w-full py-4 bg-white text-background font-black rounded-lg hover:bg-on-surface transition-all">
              ADQUIRIR AGORA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
