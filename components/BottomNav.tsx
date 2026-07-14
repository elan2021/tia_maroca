import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface shadow-xl border-t border-outline-variant flex justify-around items-center h-16 px-2">
      <Link
        href="/"
        className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-md px-3 py-1 scale-90 active:scale-100 transition-all"
      >
        <span className="material-symbols-outlined">home</span>
        <span className="font-label-lg text-label-lg">Início</span>
      </Link>
      <Link
        href="/sobre"
        className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 scale-90 active:scale-100 transition-all"
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-label-lg text-label-lg">Sobre</span>
      </Link>
      <Link
        href="/atividades"
        className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 scale-90 active:scale-100 transition-all"
      >
        <span className="material-symbols-outlined">school</span>
        <span className="font-label-lg text-label-lg">Atividades</span>
      </Link>
      <Link
        href="/contato"
        className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 scale-90 active:scale-100 transition-all"
      >
        <span className="material-symbols-outlined">mail</span>
        <span className="font-label-lg text-label-lg">Contato</span>
      </Link>
    </nav>
  );
}
