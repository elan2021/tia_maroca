import { db } from "@/lib/db";

export default async function Sidebar() {
  const settings = await db.siteSetting.findMany();

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container border-r border-outline-variant/10 shadow-xl flex flex-col py-8 z-[60] hidden md:flex">
      <nav className="flex-1 space-y-1">
        <a
          className="flex items-center gap-4 px-6 py-3 text-primary border-l-4 border-primary bg-primary-container/10 transition-all duration-300"
          href="/membros"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            home
          </span>
          <span className="font-label-md text-label-md">Home</span>
        </a>
        <a
          className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">folder_special</span>
          <span className="font-label-md text-label-md">Meus Packs</span>
        </a>
        <a
          className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="font-label-md text-label-md">Comunidade</span>
        </a>
        <a
          className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-label-md text-label-md">Minha Conta</span>
        </a>
      </nav>
      <div className="px-6 pt-6">
        <button className="w-full bg-primary-container text-white font-bold py-3 px-4 rounded-lg hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary-container/20">
          Upgrade to Pro
        </button>
        <div className="mt-6 flex flex-col gap-2">
          <a
            className="flex items-center gap-3 text-xs text-on-surface-variant/60 hover:text-on-surface transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[14px]">help</span>{" "}
            Suporte
          </a>
          <a
            className="flex items-center gap-3 text-xs text-on-surface-variant/60 hover:text-on-surface transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[14px]">
              policy
            </span>{" "}
            Privacidade
          </a>
        </div>
      </div>
    </aside>
  );
}
