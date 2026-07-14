export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container border-r border-outline-variant/10 shadow-xl flex flex-col py-8 z-[60] hidden md:flex">
      <div className="px-6 mb-8">
        <img
          alt="Logo Tia Maroka"
          className="w-full object-contain mb-2"
          src="https://lh3.googleusercontent.com/aida/AP1WRLuJcOEQbPA2Dot_aHiMGaCXzxHWd2zCmbW-4ET5xnUE7h5UJN3D3HL2vjdbdwDf7-ZZmzpx7LTiLcxhR9l3wcsziJlOrcpZVh5QQS8AX_dKtwy8iEUyo4uwLrxZ0A1Qfe_GNkg3MuRvRdWx5CdTPVcpqRw8FeKUakddUzlVV95Qm0DRsz1SY6mzPYIlxPFAi11CTmMdomH1NLg5neBymIVahdDRegZR10ybwTfKhDeByugCh3luNBTJAw"
        />
        <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-semibold">
          Pedagogical Activities
        </p>
      </div>
      <div className="px-6 mb-10 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-surface-container-highest"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
            ></circle>
            <circle
              className="text-primary-container transition-all duration-300 transform -rotate-90 origin-center"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeDasharray="263.89"
              strokeDashoffset="65.97"
              strokeLinecap="round"
              strokeWidth="6"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              alt="Profile"
              className="w-14 h-14 rounded-md object-cover border border-outline-variant/30"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuJcOEQbPA2Dot_aHiMGaCXzxHWd2zCmbW-4ET5xnUE7h5UJN3D3HL2vjdbdwDf7-ZZmzpx7LTiLcxhR9l3wcsziJlOrcpZVh5QQS8AX_dKtwy8iEUyo4uwLrxZ0A1Qfe_GNkg3MuRvRdWx5CdTPVcpqRw8FeKUakddUzlVV95Qm0DRsz1SY6mzPYIlxPFAi11CTmMdomH1NLg5neBymIVahdDRegZR10ybwTfKhDeByugCh3luNBTJAw"
            />
          </div>
        </div>
        <p className="font-bold text-on-surface text-sm">Seu progresso</p>
        <div className="h-0.5 w-12 bg-primary-container mx-auto my-2"></div>
        <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">
          Acesso restante: 245 dias
        </p>
      </div>
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
