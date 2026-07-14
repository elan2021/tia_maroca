import Link from "next/link";
import Icon from "./Icon";
import { db } from "@/lib/db";

export default async function Header() {
  const settings = await db.siteSetting.findMany();
  const logoUrl = settings.find((s) => s.key === "logoUrl")?.value;

  return (
    <header className="bg-surface-container-lowest sticky top-0 z-50 border-b border-primary-container shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link href="/" className="flex-shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt="Tia Maroka Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-sm" />
          ) : (
            <div className="font-headline-lg text-headline-lg font-black text-primary">
              Tia Maroka
            </div>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-primary hover:border-b-2 hover:border-primary pb-1 font-label-lg text-label-lg transition-colors duration-200">
            Início
          </Link>
          <Link href="/sobre" className="text-on-surface-variant hover:text-primary font-label-lg text-label-lg transition-colors duration-200">
            Sobre
          </Link>
          <Link href="/atividades" className="text-on-surface-variant hover:text-primary font-label-lg text-label-lg transition-colors duration-200">
            Atividades
          </Link>
          <Link href="/contato" className="text-on-surface-variant hover:text-primary font-label-lg text-label-lg transition-colors duration-200">
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative group search-focus-scale transition-transform">
            <input
              className="bg-surface-container rounded-full px-6 py-2 border-2 border-secondary-container focus:outline-none focus:border-primary transition-all w-48 md:w-64 font-body-md"
              placeholder="Procurar atividades..."
              type="text"
            />
            <Icon name="search" className="absolute right-4 top-2.5 text-primary" />
          </div>

          <Link
            href="/membros"
            className="flex-1 md:flex-none text-center bg-primary text-white font-label-lg text-xs md:text-sm px-3 md:px-6 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
          >
            Área de Membro
          </Link>

          <div className="relative">
            <Icon name="shopping_cart" className="text-primary cursor-pointer text-[28px]" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              2
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
