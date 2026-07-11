import Image from "next/image";
import Icon from "./Icon";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-[24px] p-4 border border-outline-variant cloud-shadow card-hover transition-all flex flex-col group">
      <div className="relative rounded-xl overflow-hidden aspect-square mb-4">
        <Image
          src={product.image}
          alt={product.alt || "Imagem do produto"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />

        {product.badgeVariant === "pinterest" && (
          <div className="absolute top-3 left-3 bg-error text-white text-[12px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Icon name="save" className="text-[14px]" filled />
            {product.badgeLabel}
          </div>
        )}

        {product.badgeVariant === "bestseller" && (
          <span className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container text-[12px] font-bold px-3 py-1 rounded-full">
            {product.badgeLabel || "DESTAQUE"}
          </span>
        )}
      </div>

      <div className="text-center flex-grow space-y-2">
        <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <p className="font-headline-md text-headline-md text-primary">
          {product.price}
        </p>
      </div>

      <a 
        href={product.checkoutUrl || "#"} 
        target="_blank" 
        rel="noreferrer"
        className="mt-4 bg-primary-container hover:bg-primary text-on-primary-container hover:text-white py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
      >
        COMPRAR <Icon name="shopping_basket" className="text-[20px]" />
      </a>
    </div>
  );
}
