import Icon from "./Icon";
import ProductCard from "./ProductCard";
import { db } from "@/lib/db";

export default async function ProductShowcase() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8
  });

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
            Novidades
            <Icon name="new_releases" className="text-primary" filled />
          </h2>
          <div className="h-1.5 w-24 bg-primary-container rounded-full" />
        </div>
        <a
          href="#"
          className="text-primary font-bold hover:underline flex items-center gap-1"
        >
          Ver tudo <Icon name="chevron_right" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}
