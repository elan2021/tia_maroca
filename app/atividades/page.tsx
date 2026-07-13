import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { db } from "@/lib/db";

export default async function Atividades() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-background font-body-md text-on-background scribble-bg min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">
            Todas as <span className="text-primary italic">Atividades</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Explore nossa coleção completa de materiais pedagógicos criativos. Tudo feito com muito carinho para facilitar o seu dia a dia na sala de aula ou em casa.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] cloud-shadow border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-primary mb-4">
              inventory_2
            </span>
            <p className="font-headline-md text-headline-md text-on-surface-variant">
              Nenhuma atividade cadastrada ainda.
            </p>
          </div>
        )}

      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
