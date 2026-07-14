export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-260px)] h-16 bg-[#131313]/95 backdrop-blur-xl z-50 flex justify-between items-center px-8 border-b border-white/5">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center">
          <span className="font-membros-display text-headline-md font-black text-primary-container tracking-tighter uppercase">
            TIA MAROKA
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hidden sm:block">
          <input
            className="bg-surface-container-high border-none rounded-full px-6 py-2 text-label-md w-72 focus:ring-1 focus:ring-primary-container transition-all placeholder:text-on-surface-variant/40"
            placeholder="Buscar packs..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-sm">
            search
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 active:opacity-80 cursor-pointer">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuJcOEQbPA2Dot_aHiMGaCXzxHWd2zCmbW-4ET5xnUE7h5UJN3D3HL2vjdbdwDf7-ZZmzpx7LTiLcxhR9l3wcsziJlOrcpZVh5QQS8AX_dKtwy8iEUyo4uwLrxZ0A1Qfe_GNkg3MuRvRdWx5CdTPVcpqRw8FeKUakddUzlVV95Qm0DRsz1SY6mzPYIlxPFAi11CTmMdomH1NLg5neBymIVahdDRegZR10ybwTfKhDeByugCh3luNBTJAw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
