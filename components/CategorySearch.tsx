import Icon from "./Icon";

export const categories = [
  { label: "Alfabetização", icon: "apparel", bg: "bg-primary-fixed", text: "text-on-primary-fixed", hover: "hover:bg-primary-container" },
  { label: "Matemática", icon: "calculate", bg: "bg-secondary-fixed", text: "text-on-secondary-fixed", hover: "hover:bg-secondary-container" },
  { label: "Artes", icon: "brush", bg: "bg-tertiary-fixed", text: "text-on-tertiary-fixed", hover: "hover:bg-tertiary-container" },
  { label: "Datas Comemorativas", icon: "celebration", bg: "bg-surface-container-highest", text: "text-on-surface-variant", hover: "hover:bg-outline-variant" },
  { label: "Atividades Gratuitas", icon: "auto_awesome", bg: "bg-primary-container/20", text: "text-primary", hover: "hover:bg-primary-container/40" },
];

export default function CategorySearch() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12">
      <div className="bg-white rounded-[32px] p-8 md:p-12 cloud-shadow border border-outline-variant">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            O que você está procurando hoje?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Explore nossas centenas de atividades organizadas por categorias
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`flex items-center gap-2 ${cat.bg} px-6 py-3 rounded-full font-label-lg text-label-lg ${cat.text} ${cat.hover} transition-colors`}
            >
              <Icon name={cat.icon} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
