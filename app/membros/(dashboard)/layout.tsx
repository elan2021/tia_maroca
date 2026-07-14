import Sidebar from "@/components/membros/Sidebar";
import TopBar from "@/components/membros/TopBar";

export default function MembrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-membros dark font-membros-body text-body-md selection:bg-primary-container selection:text-white bg-background text-on-surface min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="pt-16 md:ml-[260px] min-h-screen">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#131313]/95 backdrop-blur-xl md:hidden flex justify-around items-center h-16 z-[60] border-t border-white/5">
        <a className="flex flex-col items-center gap-1 text-primary" href="/membros">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">Início</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">folder_special</span>
          <span className="text-[10px]">Packs</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[10px]">Comunidade</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px]">Perfil</span>
        </a>
      </nav>
    </div>
  );
}
