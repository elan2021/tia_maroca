import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export default async function PackPage({ params }: { params: { id: string } }) {
  const pack = await db.pack.findUnique({
    where: { id: params.id }
  });

  if (!pack) {
    return notFound();
  }

  const session = await auth();
  const userId = session?.user?.id;

  let hasAccess = false;
  if (userId === "admin") {
    hasAccess = true;
  } else if (userId) {
    const userWithPack = await db.user.findFirst({
      where: {
        id: userId,
        packs: {
          some: { id: params.id }
        }
      }
    });
    hasAccess = !!userWithPack;
  }

  let modules: Array<{title: string, description: string, image: string}> = [];
  try {
    if (pack.modulesJson) {
      modules = JSON.parse(pack.modulesJson);
    }
  } catch (e) {
    console.error("Failed to parse modules JSON", e);
  }

  const updatedAt = new Date(pack.updatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="pb-12">
      {/* Hero Content Section */}
      <section className="relative pt-16 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
            src={pack.image}
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
                src={pack.image}
                alt={pack.title}
              />
            </div>
          </div>
          {/* Info Column */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-primary-container text-white text-[10px] font-black tracking-widest uppercase rounded">
                {pack.type === 'plan' ? 'PLANO DE ENSINO' : 'ORIGINAL PACK'}
              </span>
              <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">
                • {pack.category}
              </span>
            </div>
            <h2 className="font-membros-display font-black text-4xl md:text-[56px] text-on-surface mb-4 leading-tight">
              {pack.title}
            </h2>
            <p className="font-membros-body text-lg text-on-surface-variant mb-8 max-w-2xl whitespace-pre-wrap">
              {pack.description}
            </p>
            <div className="flex flex-wrap gap-12 mb-10">
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  {pack.pages > 0 ? `${pack.pages}+` : '--'}
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Páginas
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  {pack.ageRange}
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Idade Alvo
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-membros-display font-bold text-3xl">
                  {pack.format.split(' ')[0]}
                </span>
                <span className="text-on-surface-variant text-sm font-label-md uppercase">
                  Formato
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
              {!hasAccess ? (
                <button disabled className="flex-1 justify-center whitespace-nowrap bg-surface-variant text-on-surface-variant opacity-70 cursor-not-allowed font-bold rounded-lg flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 text-sm md:text-base border border-outline-variant">
                  <span className="material-symbols-outlined text-lg md:text-2xl">lock</span>
                  Adquira este Pack para Liberar o Download
                </button>
              ) : pack.downloadUrl ? (
                <a href={pack.downloadUrl} download target="_blank" rel="noreferrer" className="flex-1 justify-center whitespace-nowrap bg-primary-container text-white font-bold rounded-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(229,9,20,0.25)] flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 text-sm md:text-base">
                  <span className="material-symbols-outlined text-lg md:text-2xl">download</span>
                  Download Pack (PDF)
                </a>
              ) : (
                <button disabled className="flex-1 justify-center whitespace-nowrap bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed font-bold rounded-lg flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 text-sm md:text-base">
                  <span className="material-symbols-outlined text-lg md:text-2xl">lock</span>
                  Indisponível
                </button>
              )}
              <button className="flex-1 justify-center whitespace-nowrap bg-surface-variant/40 border border-white/10 backdrop-blur-md text-on-surface font-bold rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 text-sm md:text-base">
                <span className="material-symbols-outlined text-lg md:text-2xl">favorite</span>
                Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview Grid */}
      {modules && modules.length > 0 && (
        <section className="px-8 md:px-12 py-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="font-membros-display text-3xl font-bold text-on-surface mb-2">
                O que você vai encontrar
              </h3>
              <div className="h-1 w-24 bg-primary-container rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod, index) => (
              <div key={index} className="bg-surface-variant/30 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={mod.title}
                    src={mod.image}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
                    <div className="h-full bg-primary-container" style={{ width: `${Math.max(10, Math.random() * 80)}%` }}></div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-membros-display font-bold text-xl text-on-surface mb-1">
                    {mod.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm line-clamp-2">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Technical Grid */}
      <section className="px-8 md:px-12 pb-24 max-w-7xl mx-auto pt-8">
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
                  {pack.format}
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
                  {pack.fileSize}
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
                  {updatedAt}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-xs font-label-md uppercase tracking-wider mb-1">
                  Tags
                </span>
                <span className="text-on-surface font-body-lg flex items-center gap-2 text-sm">
                  {pack.tags}
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
